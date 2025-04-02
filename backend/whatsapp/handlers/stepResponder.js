const {
  getSession,
  createSession,
  updateSession,
  clearSession,
} = require('./sessionManager');
const fs = require('fs');
const path = require('path');

const steps = [
  {
    key: 'service',
    question: '🧾 Qual tipo de serviço você deseja? (ex: cartão de visita, banner, adesivo)',
  },
  {
    key: 'quantity',
    question: '📦 Qual a quantidade/tamanho desejado?',
  },
  {
    key: 'artwork',
    question: '🎨 Você já possui a arte final ou precisa que a gente crie?',
  },
  {
    key: 'deadline',
    question: '⏱ Qual o prazo ideal para entrega?',
  },
];

function saveOrcamento(user, data) {
  const filePath = path.resolve(__dirname, '../whatsapp/orcamentos.json');
  const entry = {
    timestamp: new Date().toISOString(),
    from: user,
    ...data,
  };

  let orcamentos = [];
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    orcamentos = JSON.parse(raw);
  }

  orcamentos.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(orcamentos, null, 2));
}

function processStep(user, message) {
  let session = getSession(user);

  if (!session) {
    createSession(user);
    return steps[0].question;
  }

  const currentStep = steps[session.step];
  if (currentStep) {
    session.data[currentStep.key] = message;
    session.step += 1;
    updateSession(user, session);
  }

  const nextStep = steps[session.step];
  if (nextStep) {
    return nextStep.question;
  }

  const summary = `✅ Aqui está o resumo do seu pedido:\n
🧾 Serviço: ${session.data.service}
📦 Quantidade/Tamanho: ${session.data.quantity}
🎨 Arte final: ${session.data.artwork}
⏱ Prazo: ${session.data.deadline}

Um atendente entrará em contato em breve para confirmar os detalhes.`;

  saveOrcamento(user, session.data);
  clearSession(user);
  return summary;
}

module.exports = {
  processStep,
  steps,
};
