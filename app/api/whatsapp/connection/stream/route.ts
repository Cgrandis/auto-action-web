import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  let intervalId: NodeJS.Timeout;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const send = () => {
        const basePath = path.resolve(process.cwd(), 'backend/whatsapp');

        const statusPath = path.join(basePath, 'status.json');
        const accountPath = path.join(basePath, 'account.json');
        const qrPath = path.join(basePath, 'qr.json');

        const connected = fs.existsSync(statusPath)
          ? JSON.parse(fs.readFileSync(statusPath, 'utf-8')).connected
          : false;

        const payload: any = { connected };

        if (connected && fs.existsSync(accountPath)) {
          payload.account = JSON.parse(fs.readFileSync(accountPath, 'utf-8'));
        } else if (fs.existsSync(qrPath)) {
          payload.qrCode = JSON.parse(fs.readFileSync(qrPath, 'utf-8')).qr;
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };

      intervalId = setInterval(send, 3000); // atualiza a cada 3s
      send(); // envia imediatamente
    },

    async cancel() {
      clearInterval(intervalId);
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
