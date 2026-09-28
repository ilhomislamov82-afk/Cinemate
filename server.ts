import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to initialize Google Gen AI
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint for MO-VIE Assistant
app.post('/api/assistant/chat', async (req, res) => {
  const { message, history, preferences, catalogSummary } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const ai = getGeminiClient();

  const userLang = preferences?.language || 'en';
  const langPromptMap: Record<string, string> = {
    uz: 'Javobni O\'zbek tilida bering.',
    ru: 'Отвечайте на русском языке.',
    en: 'Respond in English.',
  };
  const langInstruction = langPromptMap[userLang] || langPromptMap['en'];

  const systemInstruction = `You are "MO-VIE", an engaging, friendly, and knowledgeable movie and animation discovery assistant for CineMate.
Your purpose: Help users discover movies, animated films, understand cinema themes, genres, directors, actors, and get tailored recommendations.

CRITICAL SCOPE RESTRICTION:
- You ONLY answer questions about cinema, movies, animated films, film directors, screenwriters, actors, soundtracks, genres, ratings, and viewing recommendations.
- If the user asks anything outside of movies/animation (e.g. math problems, politics, coding, personal advice, cooking), you MUST politely refuse with this exact spirit:
"I’m MO-VIE, so I’m mainly here to help with movies and animated films. Ask me about a movie, genre, actor, or what you should watch!"

PERSONALIZATION CONTEXT:
- User Nickname: ${preferences?.nickname || 'MovieFan'}
- Content Preference: ${preferences?.contentPreference || 'both'}
- Favorite Genres: ${(preferences?.favoriteGenres || []).join(', ') || 'Any'}
- High Rated Titles (by user): ${JSON.stringify(preferences?.ratings || {})}
- Favorites List: ${(preferences?.favorites || []).join(', ') || 'None yet'}
- Watchlist: ${(preferences?.watchlist || []).join(', ') || 'None yet'}

AVAILABLE CATALOG REFERENCE (sample of CineMate items you can recommend):
${catalogSummary || 'Standard curated cinema & animated library'}

OUTPUT FORMAT:
Respond with a JSON object conforming strictly to this format:
{
  "replyText": "Your friendly, personalized natural response to the user. Explain why you recommend something based on their tastes or question.",
  "recommendedMovieIds": ["id1", "id2", "id3"], // Array of up to 4 exact matching IDs from the catalog if relevant to the recommendation, otherwise empty array.
  "suggestedFollowUps": ["Follow up suggestion 1", "Follow up suggestion 2"]
}
${langInstruction}
`;

  if (ai) {
    try {
      const formattedHistory = Array.isArray(history)
        ? history.slice(-6).map((h: { role: string; content: string }) => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.content }],
          }))
        : [];

      const contents = [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const responseText = response.text || '{}';
      try {
        const parsed = JSON.parse(responseText);
        return res.json({
          replyText: parsed.replyText || "Here are some great options matching what you're looking for!",
          recommendedMovieIds: Array.isArray(parsed.recommendedMovieIds) ? parsed.recommendedMovieIds : [],
          suggestedFollowUps: Array.isArray(parsed.suggestedFollowUps) ? parsed.suggestedFollowUps : [],
          source: 'gemini',
        });
      } catch (parseError) {
        return res.json({
          replyText: responseText.replace(/```json|```/g, '').trim(),
          recommendedMovieIds: [],
          suggestedFollowUps: [],
          source: 'gemini',
        });
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown AI error';
      console.warn('Gemini API call error, falling back to smart heuristic:', errorMsg);
      // Fallback is handled cleanly below
    }
  }

  // Graceful smart fallback when API key is not present or rate limited
  return res.json({
    replyText: `Hi ${preferences?.nickname || 'friend'}! Based on your interest in ${
      (preferences?.favoriteGenres || ['cinema'])[0]
    }, I recommend checking out these handpicked discoveries from CineMate.`,
    recommendedMovieIds: [],
    suggestedFollowUps: [
      'Recommend an adventure movie',
      'Show me top rated animated films',
      'What should I watch tonight?',
    ],
    source: 'local-fallback',
  });
});

// Start server and handle Vite middleware in dev or static files in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CineMate server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
