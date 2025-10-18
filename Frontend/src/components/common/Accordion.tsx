import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Accordion ({ title, children, isOpen, onToggle }: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-2 border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left bg-gray-100 dark:bg-gray-800/50 text-text dark:text-text-dark font-medium hover:text-blue-500 dark:hover:text-third transition-colors"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6" />
        ) : (
          <ChevronDown className="w-6 h-6" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {children}
        </div>
      )}
    </div>
  );
};