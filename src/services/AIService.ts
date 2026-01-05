// src/services/AIService.ts
export default class AIService {
  constructor(private apiKey?: string) {}

  // Placeholder: analyze data via OpenAI (stub)
  async analyze(prompt: string): Promise<{ prompt: string; result: string }> {
    // TODO: integrate with OpenAI provider wrapper
    return { prompt, result: 'analysis-result-stub' };
  }
}
