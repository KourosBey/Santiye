import { X } from "lucide-react";

export default function Modal ({ isOpen, onClose, title, children }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/65 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="cursor-pointer absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <X size={24} />
            </button>
            </div>
            <div className="p-4">{children}</div>
        </div>
        </div>
    );
};