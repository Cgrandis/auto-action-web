'use client';

import Layout from '@/app/components/Layout';

export default function Home() {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold text-[#344459] mb-4">Dashboard</h2>
      <p className="text-[#344459]">Bem-vindo ao AutoAction. Selecione uma opção no menu lateral para começar.</p>
    </Layout>
  );
}