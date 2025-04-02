const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { autoResponder } = require('./handlers/autoResponder');
const { processStep, steps } = require('./handlers/stepResponder');
const { getSession, createSession } = require('./handlers/sessionManager');

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: './backend/whatsapp/session' }),
  puppeteer: {
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
    ],
  },
});

const qrPath = path.resolve(__dirname, 'qr.json');
const statusPath = path.resolve(__dirname, 'status.json');

client.on('ready', async () => {
  console.log('✅ WhatsApp Client is ready!');

  const info = client.info;
  const account = {
    number: info.wid.user,
    pushname: info.pushname,
    platform: info.platform,
  };

  fs.writeFileSync(statusPath, JSON.stringify({ connected: true }));

  const accountPath = path.resolve(__dirname, 'account.json');
  fs.writeFileSync(accountPath, JSON.stringify(account, null, 2));

  if (fs.existsSync(qrPath)) fs.unlinkSync(qrPath);
});

client.on('disconnected', (reason) => {
  console.log('🚫 Cliente desconectado:', reason);
});

client.on('qr', async (qr) => {
  const qrImage = await qrcode.toDataURL(qr);
  fs.writeFileSync(qrPath, JSON.stringify({ qr: qrImage }));
  fs.writeFileSync(statusPath, JSON.stringify({ connected: false }));
  console.log('📲 Novo QR code gerado.');
});

client.on('message_create', (msg) => {
  if (msg.fromMe) {
    logMessage({
      timestamp: new Date().toISOString(),
      from: msg.to,
      direction: 'sent',
      body: msg.body,
    });
  }
});

client.on('message', async (msg) => {
  const text = msg.body.trim();
  const user = msg.from;

  logMessage({
    timestamp: new Date().toISOString(),
    from: msg.from,
    direction: 'received',
    body: text,
  });

  const { intent, response } = autoResponder(text, user);

  // 🟦 Caso: orçamento → inicia fluxo na primeira pergunta
  if (intent === 'orcamento') {
    createSession(user); // sempre inicia uma nova
    const firstQuestion = steps[0].question;
    await client.sendMessage(user, firstQuestion);
    return;
  }

  // 🟨 Caso: resposta simples (ex: saudação, serviços, prazo etc.)
  if (response && response !== '__start_orcamento__') {
    await client.sendMessage(user, response);
    logMessage({
      timestamp: new Date().toISOString(),
      from: msg.to,
      direction: 'sent',
      body: response,
    });
    return;
  }

  // 🟩 Caso: fluxo de etapas (serviços iniciados manualmente ou continuidade)
  const session = getSession(user);
  if (session && session.step < steps.length) {
    const reply = processStep(user, text);
    await client.sendMessage(user, reply);

    logMessage({
      timestamp: new Date().toISOString(),
      from: msg.to,
      direction: 'sent',
      body: reply,
    });
    return;
  }
});

// 📁 Salvar mensagens
function logMessage(message) {
  const filePath = path.resolve(__dirname, 'messages.json');
  let messages = [];

  if (fs.existsSync(filePath)) {
    messages = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  messages.push(message);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
}

client.initialize();