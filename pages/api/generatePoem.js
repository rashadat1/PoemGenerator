// pages/api/generatePoem.js
import axios from 'axios';
import OpenAI from 'openai';

export default async function handler(req, res) {
  try {
    const { author, prompt } = req.body;
    const openaiAPIKey = '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';

    const openai = new OpenAI({ apiKey : openaiAPIKey });

    const response = await openai.chat.completions.create(
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: `${author}-style poem: ${prompt}` }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiAPIKey}`,
        },
      }
    );

    const poem = response.choices[0].message.content.trim();
    res.status(200).json({ poem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
