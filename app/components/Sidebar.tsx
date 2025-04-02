'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Início', path: '/' },
  { name: 'Conectar WhatsApp', path: '/whatsapppages/connection' },
  { name: 'Conversas', path: '/whatsapppages/conversations' },
  { name: 'Orçamentos', path: '/whatsapppages/orcamentos' },
  // Adicione mais páginas conforme necessário
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 h-screen bg-[#344459] text-white shadow-md flex flex-col">

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[#0583F2] hover:text-white font-medium text-sm ${
              pathname === item.path ? 'bg-[#05AFF2] text-white' : 'text-[#05DBF2]'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 