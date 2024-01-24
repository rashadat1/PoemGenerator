// pages/api/generatePoem.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { author, prompt } = req.body;
    const apiKey = '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';
    
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        prompt: `${author}-style poem: ${prompt}`,
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const poem = response.data.choices[0].text.trim();
    res.status(200).json({ poem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
