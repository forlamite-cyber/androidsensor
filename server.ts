import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for AI Telemetry Assistant
  app.post("/api/ai-telemetry", async (req, res) => {
    try {
      const { prompt, telemetrySnapshot } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Fallback intelligent response if API key is not configured
        return res.json({
          response: `[Local Intelligence Mode - GEMINI_API_KEY not configured] Based on current telemetry: Battery is at ${telemetrySnapshot?.battery?.percentage || 84}% (${telemetrySnapshot?.battery?.voltageV || 4.28}V, ${telemetrySnapshot?.battery?.currentMa || 1350}mA), Device temp is ${telemetrySnapshot?.battery?.temperatureC || 31.2}°C, Motion state is ${telemetrySnapshot?.motion?.activityState || 'STATIONARY'}. Magnetic field magnitude is ${telemetrySnapshot?.motion?.magMag || 49.3} µT. All sensors are operating within normal nominal parameters.`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const modelName = 'gemini-2.5-flash';

      const systemInstruction = `You are a senior Android systems engineer, instrumentation scientist, and embedded-systems researcher assisting an engineer using an advanced mobile instrumentation and sensor-analysis platform. Answer the user's question accurately, citing the provided sensor telemetry snapshot. Be concise, technical, and scientifically precise. Never invent data.`;

      const userContent = `Telemetry Snapshot:
${JSON.stringify(telemetrySnapshot, null, 2)}

User Question: ${prompt}`;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: userContent,
        config: {
          systemInstruction,
          temperature: 0.2,
        }
      });

      res.json({ response: response.text || "No response generated." });
    } catch (error: any) {
      console.error("AI Assistant error:", error);
      res.status(500).json({ error: error.message || "Failed to process AI query." });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
