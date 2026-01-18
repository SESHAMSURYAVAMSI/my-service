import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  dangerouslyAllowBrowser: true, // Only for client-side in development
});

export async function generateContent(prompt: string, options: {
  model?: string;
  maxTokens?: number;
  temperature?: number;
} = {}) {
  try {
    const response = await openai.chat.completions.create({
      model: options.model || 'gpt-4',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature || 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

export async function generateImage(prompt: string, options: {
  size?: '256x256' | '512x512' | '1024x1024';
  n?: number;
} = {}) {
  try {
    const response = await openai.images.generate({
      prompt,
      n: options.n || 1,
      size: options.size || '512x512',
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

export async function analyzeSentiment(text: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a sentiment analysis AI. Analyze the sentiment of the following text and return a JSON object with fields: sentiment (positive/negative/neutral), confidence (0-1), and key_phrases (array of strings).',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
}