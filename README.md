# 🤖 AutoAction - Assistente Inteligente de WhatsApp para Atendimento Automatizado

AutoAction é uma plataforma full-stack desenvolvida em **Next.js** com integração ao **WhatsApp Web** para automatizar atendimentos de empresas que recebem muitas mensagens repetitivas no dia a dia. Ideal para gráficas, comércios e prestadores de serviço que desejam:

- Reduzir o tempo com perguntas frequentes
- Qualificar clientes automaticamente
- Focar apenas nos atendimentos que realmente importam

---

## ✨ Funcionalidades

- ✅ Conexão segura com número do WhatsApp via QR Code (whatsapp-web.js + LocalAuth)
- ✅ Atendimentos guiados com fluxos inteligentes (orçamento, serviços, formatos, prazos etc.)
- ✅ Armazenamento de mensagens e orçamentos em arquivos `.json`
- ✅ Dashboard para monitorar conversas em tempo real (via SSE)
- ✅ Listagem e filtro de orçamentos por cliente, data, serviço
- ✅ Alteração de status de orçamentos: `pendente`, `confirmado`, `cancelado`
- ✅ Layout moderno com Sidebar + Header fixos (UI clean e responsiva)
- 🛠️ Em breve: Exportação para PDF/CSV, login e relatórios

---

## 🧠 Arquitetura do Projeto

```bash
autoaction/
├── app/
│   ├── components/         # Header, Sidebar, WhatsappConnect, Layout
│   ├── hooks/              # useWhatsappSession, useOrcamentos, useConversationStream
│   ├── types/              # Interfaces compartilhadas (Orcamento, Conta etc.)
│   └── whatsapppages/
│       ├── connection/     # Página de conexão com QR Code
│       ├── conversations/  # Lista de conversas em tempo real
│       └── orcamentos/     # Painel de orçamentos com filtros
│
├── backend/
│   └── whatsapp/
│       ├── index.js              # Inicializa o cliente WhatsApp Web
│       ├── messages.json         # Armazena todas as mensagens
│       ├── orcamentos.json       # Armazena todos os orçamentos
│       ├── qr.json               # Último QR code gerado
│       ├── status.json           # Status atual da sessão
│       ├── account.json          # Dados da conta conectada
│       └── handlers/
│           ├── autoResponder.js  # Responde intenções simples (ex: "prazo")
│           ├── stepResponder.js  # Fluxo guiado de orçamento
│           └── sessionManager.js # Controle de sessões por usuário
│
├── public/
├── package.json
└── README.md
```
🧪 Como rodar localmente
Pré-requisitos
Node.js 18+

Chrome/Chromium instalado

WhatsApp ativo em um dispositivo com internet

1. Instale as dependências

```bash
        npm install
```

2. Inicie o cliente WhatsApp Web

```bash

    npm run wa
```

Isso abrirá uma janela do navegador com o WhatsApp. Escaneie o QR Code com seu celular.

3. Inicie o frontend
```bash

    npm run dev
```

Acesse em http://localhost:3000

📦 Scripts úteis

    Comando	Ação
        npm run dev	Inicia frontend Next.js
        npm run wa	Inicia backend WhatsApp (Node.js)
        npm run build	Build de produção
        npm start	Inicia o projeto em modo produção

🧰 Tecnologias

    Next.js 15

    React 19

    Tailwind CSS

    whatsapp-web.js

    Node.js

    LocalAuth (Chromium Puppeteer)

    qrcode

🛡️ Segurança

Nenhuma mensagem é enviada a servidores externos. Todos os dados são armazenados localmente em arquivos .json.

🧩 Melhorias futuras

🔐 Autenticação de usuários

📤 Exportação de orçamentos em PDF ou CSV

📈 Gráficos de métricas e relatórios

📞 Escalonamento para atendente humano

☁️ Deploy com banco de dados (PostgreSQL ou Firebase)

👨‍💻 Desenvolvedor

    Carlos Grandis
    Desenvolvedor Full Stack • Especialista em automação de processos
    📍 Brasil

📄 Licença

Este projeto é de uso interno para testes e aprendizado. Consulte a equipe responsável antes de uso comercial.