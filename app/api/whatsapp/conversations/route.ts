import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.resolve(process.cwd(), 'backend/whatsapp/messages.json');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ conversations: [] });
    }

    const file = fs.readFileSync(filePath, 'utf-8');
    const allMessages = JSON.parse(file);

    const today = new Date().toISOString().split('T')[0];

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

    return NextResponse.json({ conversations });
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao ler mensagens' }, { status: 500 });
  }
}
