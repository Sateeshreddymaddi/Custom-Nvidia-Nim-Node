import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class NvidiaNimApi implements ICredentialType {
	name = 'nvidiaNimApi';
	displayName = 'NVIDIA NIM API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your NVIDIA NIM API key from build.nvidia.com',
		},
	];
}