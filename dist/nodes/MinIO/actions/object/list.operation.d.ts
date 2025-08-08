import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import * as Minio from 'minio';
export declare function listObjects(this: IExecuteFunctions, minioClient: Minio.Client): Promise<INodeExecutionData[]>;
