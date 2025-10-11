'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoginModalOpen, openLoginModal, closeLoginModal: closeModalStore } = useAuthStore();


  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  useEffect(() => {
    if (searchParams.get('showLoginModal') === 'true') {
      openLoginModal();
    }
  }, [searchParams, openLoginModal]);

  const handleClose = () => {
    closeModalStore();
    const url = new URL(window.location.href);
    url.searchParams.delete('showLoginModal');
    router.replace(url.toString(), { scroll: false });
  };

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Login submitted:', formData);
    handleClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isLoginModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X size={20} className="text-gray-500 dark:text-gray-400" />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Giriş Yap</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Hesabınıza giriş yapın</p>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">E-posta</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-2 bg-white dark:bg-gray-700"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Şifre</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-2 bg-white dark:bg-gray-700"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                  style={{ accentColor: 'var(--color-main)' }}
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600 dark:text-gray-300">Beni hatırla</label>
              </div>
              <a href="/forgot-password" className="text-sm font-medium hover:underline" style={{ color: 'var(--color-main)' }}>Şifremi unuttum</a>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-2.5 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--color-main)' }}
            >
              Giriş Yap
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">veya</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Henüz hesabın yok mu?{' '}
              <a 
                href="/register" 
                className="font-medium hover:underline"
                style={{ color: 'var(--color-main)' }}
                onClick={handleClose}
              >
                Kayıt Ol
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}