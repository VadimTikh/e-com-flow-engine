// src/providers/OpenAI.ts
export default class OpenAIProvider {
  constructor(private apiKey: string) {}

  // Placeholder: simple completion stub
  async complete(prompt: string): Promise<string> {
    // TODO: integrate with OpenAI SDK
    return `stubbed-response for: ${prompt}`;
  }
}
