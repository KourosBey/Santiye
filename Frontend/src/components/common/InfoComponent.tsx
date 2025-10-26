'use client';

import { Info } from "lucide-react";

interface InfoComponentProps {
  text: string;
}

export default function InfoComponent({ text }: InfoComponentProps) {
  return (
    <div
      className="
        flex items-center gap-3 p-4 rounded-lg border-l-4
        border border-second dark:border-third
        border-l-second dark:border-l-third
        bg-second/20 dark:bg-third/20
        text-text dark:text-text-dark
      "
    >
      <Info className="text-second dark:text-third w-6 h-6 flex-shrink-0" />
      <p className="text-sm font-medium leading-relaxed">{text}</p>
    </div>
  );
}
