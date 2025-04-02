import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'backend/whatsapp/orcamentos.json');

export async function POST(req: { json: () => PromiseLike<{ timestamp: any; status: any; }> | { timestamp: any; status: any; }; }) {
  try {
    const { timestamp, status } = await req.json();

    if (!timestamp || !status) {
      return new Response(JSON.stringify({ error: 'Dados inválidos' }), { status: 400 });
    }

    const data = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      : [];

    const atualizados = data.map((o: { timestamp: any; }) =>
      o.timestamp === timestamp ? { ...o, status } : o
    );

    fs.writeFileSync(filePath, JSON.stringify(atualizados, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Erro ao atualizar status:', err);
    return new Response(JSON.stringify({ error: 'Erro interno' }), { status: 500 });
  }
}
