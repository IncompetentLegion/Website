import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 7000;

// __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, "dist");

// Add JSON body parser
app.use(express.json());

// API Proxy Endpoint - Add BEFORE static files
app.post('/api/mss', async (req, res) => {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const INTERNAL_KEY = process.env.INTERNAL_KEY;

    if (!SUPABASE_URL || !INTERNAL_KEY) {
      console.error('Missing environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const response = await fetch(`${SUPABASE_URL}/functions/v1/mssproxy`, {
      method: 'POST',
      headers: {
        'x-internal-key': INTERNAL_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Edge function error: ${response.status} - ${errorText}`);
      return res.status(response.status).json({ 
        error: 'Edge function request failed',
        status: response.status 
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message || 'Proxy request failed' });
  }
});

// Static files
app.use(express.static(distPath));

// SPA fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
