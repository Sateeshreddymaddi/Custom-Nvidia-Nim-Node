import {
	INodeType,
	INodeTypeDescription,
	ISupplyDataFunctions,
	SupplyData,
	NodeOperationError,
} from 'n8n-workflow';
import { ChatOpenAI } from '@langchain/openai';
import nodeDescription from './NvidiaNim.node.json';

export class NvidiaNim implements INodeType {
	description: INodeTypeDescription = nodeDescription as INodeTypeDescription;

	async supplyData(this: ISupplyDataFunctions): Promise<SupplyData> {
		try {
			const credentials = await this.getCredentials('nvidiaNimApi');
			const model = this.getNodeParameter('model', 0) as string;
			const temperature = this.getNodeParameter('temperature', 0) as number;
			const maxTokens = this.getNodeParameter('maxTokens', 0) as number;
			const apiKey = credentials.apiKey as string;

			const chatModel = new ChatOpenAI({
				apiKey,
				modelName: model,
				temperature,
				maxTokens,
				configuration: {
					baseURL: 'https://integrate.api.nvidia.com/v1',
				},
			});

			return {
				response: chatModel,
				// Required: tells n8n the node has finished supplying data,
				// which triggers the routing light animation to complete correctly.
				closeFunction: async () => {},
			};
		} catch (error) {
			// Re-throwing as NodeOperationError lets n8n properly
			// update the node's visual status to "error" in the UI.
			throw new NodeOperationError(this.getNode(), error as Error);
		}
	}
}