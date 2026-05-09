# n8n-nodes-minio

[![npm version](https://img.shields.io/npm/v/@winth03/n8n-nodes-minio)](https://www.npmjs.com/package/@winth03/n8n-nodes-minio)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/winth03/n8n-nodes-minio/blob/master/LICENSE.md)
[![Release](https://github.com/winth03/n8n-nodes-minio/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/winth03/n8n-nodes-minio/actions/workflows/npm-publish.yml)
[![n8n community node](https://img.shields.io/badge/n8n-community--node-blue.svg)](https://n8n.io/integrations/community/)

## Description

`n8n-nodes-minio` is a custom n8n node that provides a comprehensive wrapper for the official MinIO JavaScript SDK. This integration allows n8n users to seamlessly connect and interact with MinIO object storage within their automated workflows. From managing buckets and objects to generating presigned URLs, this node empowers you to build powerful data pipelines leveraging MinIO's S3-compatible storage.

## Features

This n8n node provides a wide range of operations for interacting with your MinIO instance:

*   **MinIO API Credentials**: Securely store and manage MinIO access and secret keys with endpoint configuration.
*   **Bucket Operations**:
    *   `List Buckets`: Retrieve a list of all buckets.
    *   `Bucket Exists`: Check if a specific bucket exists.
    *   `Make Bucket`: Create a new bucket.
    *   `Remove Bucket`: Delete an existing bucket.
*   **Object Operations**:
    *   `List Objects`: Enumerate objects within a specified bucket.
    *   `Get Object`: Download an object from a bucket.
    *   `Put Object`: Upload an object to a bucket.
    *   `Remove Object`: Delete an object from a bucket.
    *   `Object Stat`: Get metadata about an object.
*   **Presigned URL Operations**:
    *   `Presigned Get`: Generate a presigned URL for downloading an object.
    *   `Presigned Put`: Generate a presigned URL for uploading an object.
*   **Intuitive Interface**: Designed for ease of use within the n8n workflow editor, with clear resource and operation selections.

## Tech Stack

*   **Primary Language**: TypeScript
*   **Runtime**: Node.js (>=20.15)
*   **Framework**: n8n
*   **MinIO SDK**: `minio` (official MinIO JavaScript SDK)
*   **Development Tools**:
    *   `eslint`: Code linting
    *   `prettier`: Code formatting
    *   `gulp`: Task runner for build processes (e.g., icon handling)
    *   `husky`: Git hooks for enforcing code quality
    *   `semantic-release`: Automated versioning and package publishing

## Prerequisites

Before you can use this node, ensure you have:

*   **n8n Instance**: A running n8n instance (self-hosted or cloud).
*   **MinIO Server**: Access to a MinIO server, along with its endpoint, access key, and secret key.
*   **Node.js**: For development or manual installation, Node.js version `20.15` or higher is required.
*   **npm**: Node Package Manager for dependency management.

## Installation

### For n8n Users (Recommended)

The easiest way to install this node is directly through your n8n instance:

1.  Open your n8n instance.
2.  Navigate to **Settings** (usually in the bottom left sidebar).
3.  Go to the **Community Nodes** section.
4.  Click **Install**.
5.  In the "npm package name" field, type `@winth03/n8n-nodes-minio`.
6.  Click **Install**.
7.  After installation, click **Activate**.
8.  Restart your n8n instance to ensure the node is loaded correctly.

### For Developers (Manual Installation)

If you wish to contribute or test the node during development, you can install it manually:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/winth03/n8n-nodes-minio.git
    cd n8n-nodes-minio
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Build the node**:
    ```bash
    npm run build
    ```
    This command compiles the TypeScript code and prepares the node for n8n. The output will be in the `dist` directory.
4.  **Link to your n8n instance**:
    You need to make the `dist` folder accessible to your n8n instance. The recommended way for local development is to link it:
    ```bash
    npm link
    cd ~/.n8n/
    npm link @winth03/n8n-nodes-minio
    ```
    Alternatively, you can manually copy the contents of the `dist` folder into a custom nodes directory (e.g., `~/.n8n/custom/n8n-nodes-minio/`).
5.  **Restart n8n**: Restart your n8n process for the changes to take effect.

## Usage

### 1. Configure MinIO Credentials

Before using the MinIO node in a workflow, you need to set up your MinIO API credentials:

1.  In your n8n instance, click on **Credentials** in the left sidebar.
2.  Click **New Credential**.
3.  Search for "MinIO API" and select it.
4.  Fill in the following details:
    *   **Endpoint**: Your MinIO server's endpoint (e.g., `play.min.io` or `192.168.1.100:9000`).
    *   **Access Key**: Your MinIO access key.
    *   **Secret Key**: Your MinIO secret key.
5.  Click **Save**.

### 2. Add the MinIO Node to a Workflow

1.  In your n8n workflow editor, add a new node.
2.  Search for "MinIO" and select the **MinIO** node.
3.  Connect it to your workflow.

### 3. Configure the MinIO Node

1.  **Select Credential**: In the node's settings, choose the "MinIO API" credential you configured earlier.
2.  **Select Resource**: Choose the MinIO resource you want to interact with: `Bucket`, `Object`, or `Presigned`.
3.  **Select Operation**: Based on your chosen resource, select the desired operation (e.g., `Make` for Bucket, `Put` for Object, `Get` for Presigned).
4.  **Fill in Parameters**: Provide the necessary parameters for the selected operation, such as `Bucket Name`, `Object Name`, `File Data` (for `Put Object`), `Expiry Time` (for Presigned URLs), etc.

#### Example: Uploading an Object

To upload a file to MinIO:

1.  Add a node that provides binary data (e.g., a `Read Binary File` node or an `HTTP Request` node downloading a file).
2.  Connect it to the **MinIO** node.
3.  Configure the MinIO node:
    *   **Resource**: `Object`
    *   **Operation**: `Put`
    *   **Bucket Name**: Enter the name of your target MinIO bucket.
    *   **Object Name**: Specify the desired name for the object in MinIO.
    *   **Data**: Map this field to the binary data output from the previous node (e.g., `{{ $node["Read Binary File"].json["data"] }}`).
4.  Execute the workflow to upload the file.

## Project Structure

*   `credentials/MinIoApi.credentials.ts`: Defines the structure and properties for the MinIO API credentials within n8n.
*   `nodes/MinIO/MinIo.node.ts`: The main TypeScript file that defines the MinIO n8n node, including its display name, icon, and overall structure.
*   `nodes/MinIO/actions/`: Contains the core logic for different MinIO operations, separated by resource (`bucket`, `object`, `presigned`). Each operation maps to a specific MinIO SDK method.
*   `nodes/MinIO/description/`: Defines the user interface properties and options for the MinIO node in the n8n workflow editor, including input fields, dropdowns, and their default values.
*   `nodes/MinIO/methods/`: Utility methods used by the node, such as credential testing and list search functionalities.
*   `nodes/MinIO/minio.svg`: The SVG icon displayed for the MinIO node in the n8n interface.
*   `package.json`: Contains project metadata, script commands (e.g., `build`, `lint`), dependencies, and n8n-specific configuration for custom nodes.
*   `tsconfig.json`: TypeScript compiler configuration.
*   `.github/workflows/npm-publish.yml`: GitHub Actions workflow for continuous integration and automated publishing of the package to npm.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.