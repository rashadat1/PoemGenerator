'use client';
// ./app/page.js
import { useState } from 'react';

export default function Home() {
  const [author, setAuthor] = useState('');
  const [prompt, setPrompt] = useState('');
  const [poem, setPoem] = useState('');

  const generatePoem = async () => {
    try {
      const response = await fetch('/api/generatePoem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, prompt }),
      });

      const data = await response.json();
      setPoem(data.poem);
    } catch (error) {
      console.error(error);
    }
  };

  const styles = {
    poemGenerator: {
      textAlign: 'center',
      margin: '20px',
    },
    inputLabel: {
      display: 'block',
      marginBottom: '10px',
    },
    inputField: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px',
      color: 'black',
    },
    generateButton: {
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    generatedPoem: {
      marginTop: '20px',
      fontStyle: 'italic',
      color: 'white',
    },
  };

  return (
    <div style={styles.poemGenerator}>
      <h1>GPT Poem Generator</h1>
      <label style={styles.inputLabel}>
        Author:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={styles.inputField}
        />
      </label>
      <br />
      <label style={styles.inputLabel}>
        Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={styles.inputField}
        />
      </label>
      <br />
      <button onClick={generatePoem} style={styles.generateButton}>
        Generate Poem
      </button>
      {poem && <div style={styles.generatedPoem}>{poem}</div>}
    </div>
  );
}