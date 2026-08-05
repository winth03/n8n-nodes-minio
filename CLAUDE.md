# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

An **n8n community node** (`@lsyer/n8n-nodes-minio`, a fork of `winth03/n8n-nodes-minio`) that wraps the official `minio` JavaScript SDK (v8) for use inside n8n workflows. Runtime dep is `minio`; `n8n-workflow` is a peer dependency provided by the host n8n instance. TypeScript source compiles to CommonJS in `dist/`, which is the only thing published to npm.

## Commands

```bash
npm run build        # rimraf dist && tsc && gulp build:icons (copies *.svg into dist)
npm run dev          # tsc --watch
npm run lint         # eslint nodes credentials package.json
npm run lintfix      # same with --fix (also runs on pre-commit hook)
npm run format       # prettier --write nodes credentials
```

There is **no test suite** — no test runner or test files exist. `npm install` is required before lint/build resolve (`n8n-workflow`, `minio`, and the `eslint-plugin-n8n-nodes-base` ruleset).

## Release flow

- Pushing to `master` triggers `.github/workflows/npm-publish.yml`: lintfix → build → `semantic-release`.
- Versions and the changelog are derived from commit messages. **Commits must be conventional-commit formatted** (`feat:`, `fix:`, `chore:`, …) — enforced by the `commit-msg` husky hook via commitlint, and `semantic-release` consumes them.
- `n8n-workflow` is a peer dep, so the release CI does `npx ci` then reinstalls dev plugins.

## n8n registration

The node and credential are registered to n8n via the `n8n` block in `package.json`, which points at the **compiled** files:
- credential: `dist/credentials/MinIoApi.credentials.js`
- node: `dist/nodes/MinIO/MinIo.node.js`

Keep `package.json#n8n` in sync if you move/rename these entry files. Only `dist/` is shipped (`files` field); source `.ts` files and `minio.svg` get there via `tsc` + `gulp build:icons`.

## Architecture

Single node, single credential, dispatched by a nested `resource` × `operation` switch.

**Entry** — `nodes/MinIO/MinIo.node.ts` (`class MinIo implements INodeType`) assembles three pieces:
- `description` ← `description/node.description.ts` (`nodeDescription`) + the `properties` array
- `execute` ← `actions/execute.operation.ts`
- `methods` ← `{ credentialTest, listSearch }` from `methods/index.ts`

**Credential** — `credentials/MinIoApi.credentials.ts` (`name: 'minIoApi'`). Fields: `endpoint`, `port`, `useSSL`, `accessKey`, `secretKey`, `allowInsecure`.

**Execute dispatcher** — `actions/execute.operation.ts`:
1. Loads credentials and builds a `Minio.Client` via `utils/helper.ts#createMinioClient`.
2. Reads `resource` + `operation` node params.
3. A nested `switch` calls `operations.<resource>.<op>.call(this, minioClient)` and wraps the returned `INodeExecutionData[]` as `[result]` (one output array). Unmatched resource/operation rejects with `NodeOperationError`.

Each resource lives in `actions/<resource>/` with an `index.ts` re-exporting its operation functions, and one `*.operation.ts` per operation:
- `bucket/` → `listBuckets`, `bucketExists`, `removeBucket`, `makeBucket`
- `object/` → `listObjects`, `getObject`, `putObject`, `removeObject`, `objectStat`
- `presigned/` → `presignedGet`, `presignedPut`

**UI parameters (the node `properties`)** are split into two layers, both spread into the array in `description/index.ts`:
- `description/properties/` — required params: the `resource` selector (`base.ts`), plus per-resource `operation` selectors and `resourceLocator` fields (`bucketName`, `objectName`, `fieldName`). Visibility is gated per resource/operation via `displayOptions`.
- `description/options/` — optional `options` collections, one per operation (prefix/recursive, metadata, JSON get/list/stat/remove opts, presigned expiry/headers).
- `properties/index.ts` and `options/index.ts` aggregate these; `description/index.ts` concatenates both into the final `properties`.

**Methods** — `methods/`:
- `listSearch.ts` → `listAllBuckets` and `listAllObjects`, referenced by `resourceLocator` params via `typeOptions.searchListMethod`. `listAllObjects` reads the current `bucketName` param via `getCurrentNodeParameter`.
- `credentialTest.ts` → `minIoApiTest`, referenced from `node.description.ts#credentials[].testedBy`.

## Conventions to follow

- **Resource locators**: `bucketName`/`objectName` are `resourceLocator` params. Read them as `(this.getNodeParameter('name', i) as INodeParameterResourceLocator).value as string`, not as plain strings.
- **JSON option fields** (e.g. `listOpts`, `getOpts`, `metadata`) are surfaced as `type: 'json'` strings; parse with `try/catch` and throw `NodeOperationError(this.getNode(), 'Invalid JSON in "..." field')` on failure.
- **Streaming SDK calls** (`listObjects`, and in `listAllObjects`) are wrapped in `new Promise` over `stream` `data`/`end`/`error` events — match this shape for any new streaming op.
- **Item handling**: `putObject` iterates `this.getInputData()` (multi-item, preserves `pairedItem`); other ops currently operate on item `0` only. Check which behavior a new op needs.
- **SSL**: `createMinioClient` only attaches a `transportAgent` (`https.Agent`) when `useSSL` is true, with `rejectUnauthorized: allowInsecure !== true`. Don't add a transport agent for non-SSL.
- **Lint is strict**: `eslint-plugin-n8n-nodes-base` enforces naming, descriptions (lowercase first char, final period, no duplicates), default values per param type, option sorting, and filename/dirname-vs-class-name conventions. Run `npm run lintfix` before committing — it's the pre-commit hook.
- The casing is deliberately inconsistent: class `MinIo`, file `MinIo.node.ts`, credential name `minIoApi`. Preserve existing casing rather than "fixing" it.
- `description/resources.ts` and `description/{bucket,object,presigned}.properties.ts` are empty/vestigial — the real definitions live under `description/properties/` and `description/options/`. Don't add content to the empty files.
