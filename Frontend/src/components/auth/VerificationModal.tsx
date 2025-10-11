'use client';
import { useState, useRef, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  email: string;
}

export function VerificationModal({ isOpen, onClose, onVerify, email }: VerificationModalProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (!isOpen) return null;

  const handleChange = (index: number, value: string) => {
    // Sadece rakam girişine izin ver
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Otomatik olarak sonraki input'a geç
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Backspace ile önceki input'a geç
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    // Son dolu input'a focus yap
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = () => {
    const verificationCode = code.join('');
    if (verificationCode.length === 6) {
      onVerify(verificationCode);
    }
  };

  const handleResend = () => {
    console.log('Kod tekrar gönderildi');
    // Burada API çağrısı yapılacak
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">E-posta Doğrulama</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            <span className="font-medium">{email}</span> adresine gönderilen 6 haneli kodu giriniz
          </p>
        </div>

        {/* Code Input */}
        <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-main"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          disabled={code.join('').length !== 6}
          className="w-full py-3 bg-main text-white font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          Doğrula
        </button>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Kod gelmedi mi?{' '}
            <button
              onClick={handleResend}
              className="font-medium text-main hover:underline"
            >
              Tekrar Gönder
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}