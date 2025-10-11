'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNavbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Anasayfa" },
    { href: "/job-posts", label: "İş İlanları" },
    // { href: "/create-cv", label: "CV Oluştur" },
  ];

  return (
    <nav>
      <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-text dark:text-text-dark">
        {links.map(link => {
          const isActive = pathname === link.href;
          return (
            <li
              key={link.href}
              className={`transition user-select-none ${
                isActive ? "text-main dark:text-third font-semibold" : "hover:text-main dark:hover:text-third"
              }`}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}