'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/candidate/home', label: 'Anasayfa' },
    { href: '/candidate/create-cv', label: 'CV Oluştur/Güncelle' },
    { href: '/candidate/applications', label: 'İş Başvurularım' },
    { href: '/candidate/account', label: 'Hesabım' },
    { href: '/candidate/requests', label: 'İstek Ve Talepler' },
  ];

  const active = links.find((l) => pathname.startsWith(l.href)) ?? links[0];

  return (
    <aside className="w-full md:w-64 md:min-h-128 p-2 md:p-6 bg-gray-200 dark:bg-black/20 rounded-lg shadow-lg">
      <nav className="w-full flex flex-col gap-2 md:gap-6">
        {links.map((link) => {
          const isActive = link.href === active.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`w-full p-2 rounded-md text-white text-center font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-second scale-[1.02]'
                  : 'bg-gray-500 dark:bg-gray-900 hover:bg-second/50'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}