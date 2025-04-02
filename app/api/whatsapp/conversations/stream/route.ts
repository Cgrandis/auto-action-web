import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  let cancelStream: (() => void) | null = null;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const send = () => {
        const filePath = path.resolve(process.cwd(), 'backend/whatsapp/messages.json');
        const file = fs.existsSync(filePath)
          ? fs.readFileSync(filePath, 'utf-8')
          : '[]';

        const today = new Date().toISOString().split('T')[0];
        const allMessages = JSON.parse(file);
        const filtered = allMessages.filter((msg: any) =>
          msg.timestamp.startsWith(today)
        );

        const summary: Record<string, { received: number; sent: number }> = {};

        for (const msg of filtered) {
          const key = msg.from;
          if (!summary[key]) summary[key] = { received: 0, sent: 0 };
          if (msg.direction === 'received') summary[key].received++;
          if (msg.direction === 'sent') summary[key].sent++;
        }

        const conversations = Object.entries(summary).map(([contact, counts]) => ({
          contact,
          ...counts,
        }));

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(conversations)}\n\n`));
      };

      const interval = setInterval(send, 5000);
      send();

      cancelStream = () => {
        clearInterval(interval);
      };
    },

    async cancel() {
      if (cancelStream) cancelStream();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    },
  });
}
