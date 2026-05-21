import { Router, Request, Response } from 'express';

const router = Router();

const SYSTEM_PROMPT = `You are a helpful assistant for Min Doktor, a Swedish digital healthcare provider. Answer ONLY general health know-how, do's and don'ts, and questions about Min Doktor's services. Never diagnose, prescribe, or give emergency advice. If asked: respond with 'I can't give medical advice. Please start a consultation or call 1177.' Keep answers under 80 words. Match user language (SV or EN).`;

const EMERGENCY_KEYWORDS = ['emergency', 'chest pain', "can't breathe", 'unconscious', 'suicide', 'nödfall', 'bröstsmärta', 'medvetslös'];
const EMERGENCY_RESPONSE = 'Please call 112 immediately or go to your nearest emergency room. If you are in Sweden, you can also call 1177 for healthcare advice.';

const MOCK_RESPONSES: Record<string, string> = {
  'what is tbe?': 'TBE (Tick-Borne Encephalitis) is a viral infection spread by tick bites that can cause inflammation of the brain. Vaccination is recommended if you spend time outdoors in endemic areas. Consult your doctor about the TBE vaccine schedule.',
  'how does a digital visit work?': 'A digital visit at Min Doktor works in 3 steps: 1) You fill in a health questionnaire. 2) A licensed doctor reviews your case. 3) You receive a diagnosis, treatment plan, or prescription — usually within a few hours. No appointment needed!',
  "do's and don'ts for a cold": "DO: Rest, drink plenty of fluids, use saline nasal spray, and take paracetamol for fever. DON'T: Take antibiotics (colds are viral), exercise intensely, or go to work/school while symptomatic. See a doctor if symptoms last >10 days.",
  'when should i see a doctor?': 'See a doctor if you have: persistent fever >38.5°C for 3+ days, difficulty breathing, severe pain, symptoms worsening after a week, unexplained weight loss, or any sudden concerning changes. For emergencies, call 112.',
};

// POST /api/v1/chatbot/message
router.post('/message', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    const lastMessage = messages[messages.length - 1];
    const userText = (lastMessage.content || '').toLowerCase().trim();

    // Safety check — emergency keywords
    const isEmergency = EMERGENCY_KEYWORDS.some((kw) => userText.includes(kw));
    if (isEmergency) {
      res.json({ reply: EMERGENCY_RESPONSE, is_emergency: true });
      return;
    }

    // Try OpenAI if key is available
    const apiKey = process.env['OPENAI_API_KEY'];
    if (apiKey && !apiKey.includes('placeholder')) {
      try {
        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...messages.slice(-6),
            ],
            max_tokens: 200,
            temperature: 0.7,
          }),
        });
        const data = await openaiRes.json() as any;
        if (data.choices && data.choices[0]) {
          res.json({ reply: data.choices[0].message.content, is_emergency: false });
          return;
        }
      } catch (aiErr) {
        console.error('OpenAI call failed, falling back to mock:', aiErr);
      }
    }

    // Fallback — mock responses
    const mockKey = Object.keys(MOCK_RESPONSES).find((k) => userText.includes(k));
    const reply = mockKey
      ? MOCK_RESPONSES[mockKey]
      : "I'm here to help with general health questions about Min Doktor's services. Try asking about common conditions, how digital visits work, or when to see a doctor. For medical advice, please start a consultation.";

    res.json({ reply, is_emergency: false });
  } catch (err) {
    console.error('Chatbot error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const chatbotRoutes = router;
