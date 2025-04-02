import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.resolve(process.cwd(), 'backend/whatsapp/orcamentos.json');

  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }

    const rawData = fs.readFileSync(filePath, 'utf-8');
    const orcamentos = JSON.parse(rawData);
    return NextResponse.json(orcamentos);
  } catch (err) {
    console.error('Erro ao ler orçamentos:', err);
    return NextResponse.json({ error: 'Erro ao buscar orçamentos' }, { status: 500 });
  }
}
