interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  content: string;
  error?: string;
}

class AIService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = 'AIzaSyAJPdA6utGfRsh-ku1ZbFGMentPEqzUg8o';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  private getSystemPrompt(): string {
    return `You are an AI Investment Assistant for PrivéFi, a luxury asset-backed crypto vault platform. You help users understand and invest in premium asset vaults including:

1. JetLease Vault #001 - Aircraft leasing (8-12% APY, A- rating, $10K minimum)
2. YachtLease Vault #001 - Luxury yacht financing (10-15% APY, B+ rating, $25K minimum) 
3. ESG Credit Vault #001 - Sustainable infrastructure (6-9% APY, A+ rating, $5K minimum)

Key features:
- Blockchain transparency and on-chain verification
- Monthly yield distributions via smart contracts
- Institutional-grade security and insurance
- AI-powered risk assessment
- 1st-lien collateral positions

Be helpful, professional, and knowledgeable about luxury investments, DeFi, and blockchain technology. Provide specific details about vaults when asked. Always encourage users to book a demo call for personalized advice.

Keep responses concise but informative. Use a sophisticated tone appropriate for high-net-worth individuals.`;
  }

  async generateResponse(messages: AIMessage[]): Promise<AIResponse> {
    try {
      const systemMessage: AIMessage = {
        role: 'user',
        content: this.getSystemPrompt()
      };

      const allMessages = [systemMessage, ...messages];
      
      const requestBody = {
        contents: allMessages.map(msg => ({
          parts: [{ text: msg.content }],
          role: msg.role === 'assistant' ? 'model' : 'user'
        }))
      };

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        console.warn(`API request failed: ${response.status}, falling back to local responses`);
        const lastMessage = messages[messages.length - 1];
        return {
          content: this.getFallbackResponse(lastMessage?.content || ''),
          error: `API request failed: ${response.status}`
        };
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return {
          content: data.candidates[0].content.parts[0].text
        };
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.warn('AI Service Error, using fallback:', error);
      const lastMessage = messages[messages.length - 1];
      return {
        content: this.getFallbackResponse(lastMessage?.content || ''),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Enhanced fallback responses for common questions
  getFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Welcome to PrivéFi! I'm your AI Investment Assistant. I can help you understand our luxury asset-backed crypto vaults. Would you like to learn about our JetLease, YachtLease, or ESG Credit vaults?";
    }
    
    if (lowerMessage.includes('jetlease') || lowerMessage.includes('aircraft') || lowerMessage.includes('plane')) {
      return "JetLease Vault #001 offers 8-12% APY backed by commercial aircraft leasing. With an A- credit rating and $10,000 minimum investment, it provides stable returns from the aviation industry. Monthly payouts around the 15th via smart contracts.";
    }
    
    if (lowerMessage.includes('yachtlease') || lowerMessage.includes('yacht') || lowerMessage.includes('boat')) {
      return "YachtLease Vault #001 delivers 10-15% APY through luxury yacht financing. B+ rating with $25,000 minimum investment. Higher yields reflect the premium luxury market. Monthly distributions around the 20th.";
    }
    
    if (lowerMessage.includes('esg') || lowerMessage.includes('sustainable') || lowerMessage.includes('green')) {
      return "ESG Credit Vault #001 focuses on sustainable infrastructure with 6-9% APY and our highest A+ rating. $5,000 minimum investment supports environmentally responsible projects. Payouts around the 25th monthly.";
    }
    
    if (lowerMessage.includes('secure') || lowerMessage.includes('safe') || lowerMessage.includes('security')) {
      return "Our vaults use multi-layered security: 1st-lien collateral positions, comprehensive insurance, blockchain transparency, and institutional-grade originators. All assets are fully insured and verified on-chain with real-time monitoring.";
    }
    
    if (lowerMessage.includes('payout') || lowerMessage.includes('payment') || lowerMessage.includes('yield')) {
      return "Payouts are distributed monthly directly to your wallet via smart contracts. JetLease pays around the 15th, YachtLease around the 20th, and ESG Credit around the 25th of each month. All payments are automated and transparent.";
    }
    
    if (lowerMessage.includes('compare') || lowerMessage.includes('vs') || lowerMessage.includes('difference')) {
      return "JetLease (8-12% APY, A- rating) offers stable aircraft-backed returns. YachtLease (10-15% APY, B+ rating) provides higher yields with luxury yacht collateral. ESG Credit (6-9% APY, A+ rating) focuses on sustainable infrastructure with the highest safety rating.";
    }
    
    if (lowerMessage.includes('minimum') || lowerMessage.includes('invest') || lowerMessage.includes('start')) {
      return "Minimum investments: JetLease $10,000, YachtLease $25,000, ESG Credit $5,000. All payments in USDC. Higher minimums ensure institutional-quality pool composition and better risk management.";
    }
    
    if (lowerMessage.includes('blockchain') || lowerMessage.includes('verify') || lowerMessage.includes('transparent')) {
      return "Every asset is tokenized on-chain with real-time verification. Track lease payments, asset performance, and vault metrics transparently via blockchain explorers. Smart contracts automate all distributions and reporting.";
    }
    
    if (lowerMessage.includes('risk') || lowerMessage.includes('rating') || lowerMessage.includes('safe')) {
      return "Our AI analyzes asset quality, borrower creditworthiness, market conditions, and insurance coverage. JetLease: A- (low risk), YachtLease: B+ (moderate risk), ESG Credit: A+ (very low risk). All backed by real assets.";
    }

    if (lowerMessage.includes('demo') || lowerMessage.includes('call') || lowerMessage.includes('meeting')) {
      return "I'd be happy to help you book a demo call! Our investment specialists can provide personalized recommendations based on your portfolio goals and risk tolerance. Would you like to schedule a consultation?";
    }

    return "Great question! I'd be happy to help you understand our luxury asset vaults. Each offers unique benefits - would you like me to compare them or explain a specific vault in detail? For personalized recommendations, I'd suggest booking a demo call with our specialists.";
  }
}

export const aiService = new AIService();