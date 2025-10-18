'use client';

import { usePathname } from 'next/navigation';

export default function TitleBar() {
  const pathname = usePathname();

  const map: Record<string, string> = {
    '/employer/home': 'Anasayfa',
    '/employer/buy-package': 'İlan Paketi Satın Al',
    '/employer/create-job-post': 'İş İlanı Oluştur',
    '/employer/my-job-posts': 'İlanlarım',
    '/employer/account': 'Hesabım',
    '/employer/requests': 'İstek ve Talepler',
  };

  const title =
    Object.entries(map).find(([path]) => pathname.startsWith(path))?.[1] ||
    'Anasayfa';

  return (
    <div className="w-full p-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
      <h1 className="w-full text-lg text-center font-bold">{title}</h1>
    </div>
  );
}
