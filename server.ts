import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health and telemetry check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ONLINE',
      hasApiKey: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString(),
      kernel: 'Núcleo OS v4.10 Táctico',
      pingMs: 14,
    });
  });

  // Clinical Copilot ENARM RAG
  app.post('/api/gemini/clinical', async (req, res) => {
    try {
      const { prompt, extracts = [] } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt es requerido' });
      }

      if (!ai) {
        return res.status(200).json({
          offline: true,
          error: 'GEMINI_API_KEY no configurada. Activando motor clínico heurístico local.',
        });
      }

      let contextDoc = '';
      if (Array.isArray(extracts) && extracts.length > 0) {
        contextDoc =
          '--- INICIO DE CORPUS DOCUMENTAL GPC CENETEC / MANUALES OFICIALES ---\n' +
          extracts.join('\n\n') +
          '\n--- FIN DE CORPUS DOCUMENTAL ---\n\n';
      }

      const systemInstruction = `
Eres el copiloto clínico de alta fidelidad para el ENARM integrado en Núcleo OS v4.10.
REGLAS ESTRICTAS DE RESPUESTA:
1. Basa tu análisis exclusivamente en el contexto documental proporcionado (GPCs CENETEC México, guías clínicas oficiales y normas NOM).
2. Si un fármaco, dosis, contraindicación o conducta no está explícita, responde con rigor técnico o indícalo.
3. Cita siempre la fuente: [GPC CENETEC :: Sección / Guía / Norma Oficial / Recomendación clave].
4. Estructura la respuesta con:
   - 🎯 Diagnóstico / Criterio clave de sospecha y confirmatorio.
   - ⚡ Algoritmo escalonado con fármacos y dosis exactas de primera línea.
   - 💡 Perla de alta rentabilidad ENARM (Pregunta trampa recurrente).
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${contextDoc}Pregunta médica o caso clínico táctico ENARM: ${prompt}`,
        config: {
          systemInstruction,
          temperature: 0.1,
        },
      });

      res.json({
        text: response.text || 'Sin respuesta generada.',
        model: 'gemini-3.8-flash',
      });
    } catch (error: any) {
      console.error('Error en /api/gemini/clinical:', error);
      res.status(500).json({ error: error.message || 'Error procesando solicitud con Gemini' });
    }
  });

  // Vite development middleware
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('.', 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('.', 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Núcleo OS] Kernel activo en http://0.0.0.0:${PORT}`);
  });
}

startServer();
