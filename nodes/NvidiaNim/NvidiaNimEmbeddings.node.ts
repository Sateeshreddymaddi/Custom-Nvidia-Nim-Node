import {
	INodeType,
	INodeTypeDescription,
	ISupplyDataFunctions,
	SupplyData,
	NodeOperationError,
} from 'n8n-workflow';
import { Embeddings } from '@langchain/core/embeddings';

class NvidiaNimEmbeddingsClass extends Embeddings {
	constructor(private apiKey: string, private model: string) {
		super({});
	}

	async embedDocuments(texts: string[]): Promise<number[][]> {
		try {
			const response = await fetch('https://integrate.api.nvidia.com/v1/embeddings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.apiKey}`,
					Accept: 'application/json',
				},
				body: JSON.stringify({
					input: texts,
					model: this.model,
					input_type: 'query',
				}),
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`NVIDIA NIM API Error: ${response.status} ${errorText}`);
			}

			const data = await response.json();
			const sortedData = data.data.sort((a: any, b: any) => a.index - b.index);
			return sortedData.map((item: any) => item.embedding);
		} catch (error) {
			throw new Error(`Failed to generate embeddings: ${(error as Error).message}`);
		}
	}

	async embedQuery(text: string): Promise<number[]> {
		const docs = await this.embedDocuments([text]);
		return docs[0];
	}
}

export class NvidiaNimEmbeddings implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NVIDIA NIM Embeddings',
		name: 'nvidiaNimEmbeddings',
		icon: 'file:nvidia-nim.png',
		group: ['transform'],
		version: 1,
		description: 'Call any embeddings model from NVIDIA NIM',
		defaults: {
			name: 'NVIDIA NIM Embeddings',
		},
		inputs: [],
		outputs: ['ai_embedding'],
		outputNames: ['Embeddings'],
		outputConnectionTypes: {
			ai_embedding: [{ type: 'ai_embedding' }],
		},
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Embeddings'],
			},
			resources: {},
		},
		credentials: [
			{
				name: 'nvidiaNimApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Model',
				name: 'model',
				type: 'options',
				options: [
					{ name: 'NV Embed v1 (Free Endpoint)', value: 'nvidia/nv-embed-v1' },
					{ name: 'NV EmbedQA E5 v5', value: 'nvidia/nv-embedqa-e5-v5' },
					{ name: 'Llama Nemotron Embed 1B v2', value: 'nvidia/llama-nemotron-embed-1b-v2' },
					{ name: 'Llama Nemotron Embed VL 1B v2 (Multimodal)', value: 'nvidia/llama-nemotron-embed-vl-1b-v2' },
					{ name: 'BGE-M3 (Dense + Sparse)', value: 'BAAI/bge-m3' },
				],
				default: 'nvidia/nv-embed-v1',
			},
		],
	} as unknown as INodeTypeDescription;

	async supplyData(this: ISupplyDataFunctions, itemIndex: number): Promise<SupplyData> {
		try {
			const credentials = await this.getCredentials('nvidiaNimApi');
			const apiKey = credentials.apiKey as string;
			const model = this.getNodeParameter('model', itemIndex, '') as string;

			const embeddings = new NvidiaNimEmbeddingsClass(apiKey, model);

			return {
				response: embeddings,
				closeFunction: async () => {},
			};
		} catch (error) {
			throw new NodeOperationError(this.getNode(), error as Error);
		}
	}
}
