'use client';

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Anasayfa", activePath: "/" },
    { href: "/job-posts", label: "İş İlanları", activePath: "/job-posts" },
    { href: "/candidate/home", label: "Aday", activePath: "/candidate" },
    { href: "/employer/home", label: "İşveren", activePath: "/employer" },
  ];

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <div className="md:hidden">
      {/* Menü butonu */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md hover:bg-main/10 dark:hover:bg-white/10 transition"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Tam ekran menü */}
      <div
        className={`fixed inset-0 z-50 transform transition-all duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        bg-white/95 dark:bg-[#1F0E1E]/95 backdrop-blur-md`}
      >
        {/* Üst kısım */}
        <div className="flex justify-between items-center p-4 border-b border-main/10 dark:border-white/10">
          <h2 className="text-lg font-semibold text-main dark:text-third">
            Menü
          </h2>
          <button onClick={closeMenu} className="p-2 hover:opacity-80 transition">
            <X size={24} />
          </button>
        </div>

        {/* Menü içeriği */}
        <nav className="flex flex-col items-center justify-center h-[calc(100%-60px)] gap-8">
          {links.map((link) => {
            const isActive =
              link.activePath === "/"
                ? pathname === "/"
                : pathname.startsWith(link.activePath);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`text-2xl font-medium transition ${
                  isActive
                    ? "text-main dark:text-third font-semibold"
                    : "text-text dark:text-text-dark hover:text-main dark:hover:text-third"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
