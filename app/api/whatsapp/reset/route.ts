import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    const sessionPath = path.resolve(process.cwd(), 'backend/whatsapp/session');
    const basePath = path.resolve(process.cwd(), 'backend/whatsapp');

    const filesToDelete = ['status.json', 'account.json', 'qr.json'];

    filesToDelete.forEach((file) => {
      const filePath = path.join(basePath, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    if (fs.existsSync(sessionPath)) {
      fs.rmSync(sessionPath, { recursive: true, force: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao resetar sessão' }, { status: 500 });
  }
}
