import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.EXPO_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Required for React Native
});

export interface AIResponse {
  success: boolean;
  answer?: string;
  error?: string;
}

class AIService {
  /**
   * Ask AI a question and get an answer
   */
  async askQuestion(question: string): Promise<AIResponse> {
    try {
      console.log('🤖 Asking Groq AI:', question);

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a helpful study assistant. Your role is to:
- Provide clear, educational answers
- Break down complex topics into simple terms
- Use examples when helpful
- Be encouraging and supportive
- Keep answers concise but thorough (2-4 paragraphs)

Format your responses for easy reading.`
          },
          {
            role: "user",
            content: question,
          },
        ],
        model: "llama-3.3-70b-versatile", // Fast, high-quality model
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
      });

      const answer = chatCompletion.choices[0]?.message?.content || "No answer generated";
      
      console.log('✅ Got AI response');
      
      return {
        success: true,
        answer,
      };
    } catch (error: any) {
      console.error('❌ AI Error:', error);
      
      return {
        success: false,
        error: this.getErrorMessage(error),
      };
    }
  }

  /**
   * Generate a quiz question based on a topic
   */
  async generateQuiz(topic: string): Promise<AIResponse> {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a quiz generator. Create a multiple-choice question with 4 options and indicate the correct answer."
          },
          {
            role: "user",
            content: `Create a quiz question about: ${topic}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.8,
        max_tokens: 512,
      });

      const answer = chatCompletion.choices[0]?.message?.content || "No quiz generated";
      
      return {
        success: true,
        answer,
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.getErrorMessage(error),
      };
    }
  }

  /**
   * Get user-friendly error messages
   */
  private getErrorMessage(error: any): string {
    if (error.message?.includes('API key')) {
      return 'Invalid API key. Please check your Groq API key.';
    }
    if (error.message?.includes('rate limit')) {
      return 'Too many requests. Please wait a moment and try again.';
    }
    if (error.message?.includes('network')) {
      return 'Network error. Please check your internet connection.';
    }
    return error.message || 'An error occurred. Please try again.';
  }

  /**
   * Available models (for future use)
   */
  static readonly MODELS = {
    LLAMA_70B: "llama-3.3-70b-versatile", // Best quality
    LLAMA_8B: "llama-3.1-8b-instant",     // Fastest
    MIXTRAL: "mixtral-8x7b-32768",        // Long context
    GEMMA: "gemma2-9b-it",                // Google's model
  };
}

export const aiService = new AIService();