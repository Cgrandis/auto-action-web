const { updateSession, getSession } = require('./sessionManager');

function detectIntent(text) {
  const message = text.toLowerCase().trim();

  if (message.includes('orçamento')) return 'orcamento';
  if (message.includes('cartão') || message.includes('banner') || message.includes('adesivo') || message.includes('arte')) {
    return 'servico_especifico';
  }
  if (message.includes('serviço') || message.includes('tipos') || message.includes('fazem')) return 'servicos';
  if (message.includes('prazo') || message.includes('entrega')) return 'prazo';
  if (message.includes('formato') || message.includes('arquivo')) return 'formato';
  if (message.includes('atendente') || message.includes('humano')) return 'humano';
  if (['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'].includes(message)) return 'saudacao';
  if (['cancelar', 'sair'].includes(message)) return 'cancelar';
  if (['reiniciar', 'começar de novo', 'resetar'].includes(message)) return 'reiniciar';

  return 'indefinido';
}

function generateResponse(intent, user) {
  switch (intent) {
    case 'orcamento':
      return null;

    case 'servicos':
      updateSession(user, { lastIntent: 'servicos', step: 0, data: {} });
      return `📌 Trabalhamos com os seguintes serviços:
- Impressão de cartões, banners, adesivos, panfletos
- Criação de arte e identidade visual
- Personalização de brindes

Me diga o que você precisa!`;

    case 'servico_especifico':
      const session = getSession(user);
      if (session?.lastIntent === 'servicos') {
        return '__start_orcamento__';
      }
      return null;

    case 'prazo':
      return `⏱ Nossos prazos variam conforme o serviço:
- Impressão simples: 1 a 2 dias úteis
- Serviços personalizados: 3 a 5 dias`;

    case 'formato':
      return `📁 Aceitamos arquivos em PDF, CDR, AI ou PNG de alta qualidade.`;

    case 'humano':
      return `👩‍💼 Um atendente será acionado em breve para continuar o atendimento.`;

    case 'saudacao':
      return `👋 Olá! Sou o assistente virtual da gráfica. Posso te ajudar com:
- "Orçamento"
- "Serviços"
- "Prazo"
- "Formato de arquivo"
Ou digite "Atendente" para falar com uma pessoa.`;

case 'cancelar':
  clearSession(user);
  return '🚫 Atendimento cancelado. Se precisar de algo, é só chamar!';

case 'reiniciar':
  clearSession(user);
  return '🔄 Atendimento reiniciado. Envie "Orçamento" ou "Serviços" para começar de novo.';


    default:
      return null;
  }
}

function autoResponder(text, user) {
  const intent = detectIntent(text);
  const response = generateResponse(intent, user);
  return { intent, response };
}

module.exports = {
  autoResponder,
};
