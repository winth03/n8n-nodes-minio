import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import * as Minio from 'minio';
export declare function presignedGet(this: IExecuteFunctions, minioClient: Minio.Client): Promise<INodeExecutionData[]>;
