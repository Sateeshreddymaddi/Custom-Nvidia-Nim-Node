<div align="center">

<img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg" height="48" alt="NVIDIA Logo" />

# n8n-nodes-nvidia-nim

**Connect NVIDIA NIM language models and embedding models to your n8n workflows — in one package.**

[![npm version](https://img.shields.io/npm/v/@sateeshreddy/n8n-nodes-nvidia-nim?color=76b900&label=npm&style=flat-square)](https://www.npmjs.com/package/@sateeshreddy/n8n-nodes-nvidia-nim)
[![n8n community node](https://img.shields.io/badge/n8n-community%20node-EA4B71?style=flat-square&logo=n8n)](https://n8n.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

</div>

---

## Overview

`@sateeshreddy/n8n-nodes-nvidia-nim` is an n8n community node package that gives you access to **NVIDIA NIM's free hosted models** directly inside your workflows.

This package includes **two nodes**:

| Node | Purpose |
|---|---|
| **NVIDIA NIM** | Language model — connects to AI Agent, LLM Chain, etc. |
| **NVIDIA NIM Embeddings** | Embeddings model — connects to Qdrant, Pinecone, PGVector, Supabase, Weaviate, etc. |

### Why use this?

- ✅ Free tier models via [build.nvidia.com](https://build.nvidia.com)
- ✅ **Language model node** — plugs into AI Agent, Basic LLM Chain, Summarization Chain
- ✅ **Embeddings node** — plugs into any n8n vector store (Qdrant, Pinecone, PGVector, Supabase, Weaviate, Chroma)
- ✅ Supports 17 latest chat models including DeepSeek v4, Nemotron-3, Mistral, and Gemma 4
- ✅ **Smart Defaults:** Automatically updates optimal temperature and max tokens when a chat model is selected
- ✅ Supports 5 embedding models including free hosted endpoints
- ✅ Drop-in OpenAI-compatible API — no extra setup

---

## Supported Models

### Chat / Language Models

When you select a model, the node will automatically configure the recommended `max_tokens` and `temperature` to provide the best results out of the box. You can still override these manually.

| Model ID | Default Max Tokens | Default Temperature |
|---|---|---|
| `minimaxai/minimax-m3` | 8192 | 1 |
| `nvidia/nemotron-3-ultra-550b-a55b` | 16384 | 1 |
| `stepfun-ai/step-3.7-flash` | 16384 | 1 |
| `moonshotai/kimi-k2.6` | 16384 | 1 |
| `mistralai/mistral-medium-3.5-128b` | 16384 | 0.7 |
| `mistralai/mistral-nemotron` | 4096 | 0.6 |
| `sarvamai/sarvam-m` | 16384 | 0.5 |
| `nvidia/nemotron-3-nano-30b-a3b` | 16384 | 1 |
| `stepfun-ai/step-3.5-flash` | 16384 | 1 |
| `qwen/qwen3.5-122b-a10b` | 16384 | 0.6 |
| `nvidia/nemotron-3-super-120b-a12b` | 16384 | 1 |
| `mistralai/mistral-small-4-119b-2603` | 16384 | 0.1 |
| `google/gemma-4-31b-it` | 16384 | 1 |
| `minimaxai/minimax-m2.7` | 8192 | 1 |
| `z-ai/glm-5.1` | 16384 | 1 |
| `deepseek-ai/deepseek-v4-pro` | 16384 | 1 |
| `deepseek-ai/deepseek-v4-flash` | 16384 | 1 |

### Embedding Models

| Model | Value | Note |
|---|---|---|
| NV Embed v1 *(default)* | `nvidia/nv-embed-v1` | Free hosted endpoint |
| NV EmbedQA E5 v5 | `nvidia/nv-embedqa-e5-v5` | Best for RAG / QA pipelines |
| Llama Nemotron Embed 1B v2 | `nvidia/llama-nemotron-embed-1b-v2` | Multilingual, 26 languages |
| Llama Nemotron Embed VL 1B v2 | `nvidia/llama-nemotron-embed-vl-1b-v2` | Multimodal (text + image docs) |
| BGE-M3 | `BAAI/bge-m3` | Dense + multi-vector + sparse retrieval |

---

## Installation

### Via n8n Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings → Community Nodes**
3. Click **Install**
4. Enter `@sateeshreddy/n8n-nodes-nvidia-nim` and confirm

### Manual Installation

Navigate to your n8n custom nodes directory and install:

    cd ~/.n8n/custom/
    npm install @sateeshreddy/n8n-nodes-nvidia-nim

Then restart n8n.

---

## Getting Your API Key

1. Visit [build.nvidia.com](https://build.nvidia.com)
2. Sign in or create a free account
3. Navigate to **API Keys** in your dashboard
4. Generate a new key and copy it

> **Note:** The free tier gives you a generous number of inference credits — no credit card required.

---

## Usage

### Setting Up Credentials

In n8n, go to **Credentials → New → NVIDIA NIM API** and paste your API key. Both the chat node and the embeddings node share the same credential.

---

### NVIDIA NIM (Chat / Language Model)

Use this node anywhere n8n expects a **language model**.

1. Add an **AI Agent** (or Basic LLM Chain) node to your workflow
2. In the **Model** slot, click `+`
3. Search for **NVIDIA NIM** and select it
4. Choose your model — the optimal temperature and max tokens will be populated automatically!
5. Run your workflow

**Configuration Options:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| Model | Dropdown | `deepseek-ai/deepseek-v4-flash` | The NIM chat model to use |
| Temperature | Number | *Dynamic* | Controls output randomness. Automatically updates based on the model chosen. |
| Max Tokens | Number | *Dynamic* | Maximum tokens in the response. Automatically updates based on the model chosen. |

---

### NVIDIA NIM Embeddings

Use this node anywhere n8n expects an **embeddings model** — vector stores like Qdrant, Pinecone, PGVector, Supabase, Weaviate, and Chroma.

1. Add a **Qdrant Vector Store** (or any other vector store) node
2. In the **Embeddings** slot, click `+`
3. Search for **NVIDIA NIM Embeddings** and select it
4. Choose your embedding model
5. Run your workflow

**Configuration Options:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| Model | Dropdown | `nvidia/nv-embed-v1` | The NIM embedding model to use |

**Compatible vector stores:** Qdrant · Pinecone · PGVector · Supabase · Weaviate · Chroma

---

## Contributing

Pull requests are welcome! To add a new model, fix a bug, or improve documentation:

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Push and open a PR

---

## License

[MIT](LICENSE)

---

<div align="center">

Made with ☕ for the n8n community · Powered by [NVIDIA NIM](https://build.nvidia.com)

</div>