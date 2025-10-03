'use client';
import { useState, useEffect} from 'react';
import { useAuthStore } from "@/stores/authStore";
import { cityDistrictUtils } from "@/scripts/getCityDistrict"; 

interface AdayFormData {
  ad: string;
  soyad: string;
  email: string;
  telefon: string;
  sifre: string;
  sifreTekrar: string;
}

interface IsverenFormData {
  sirketAdi: string;
  ad: string;
  soyad: string;
  email: string;
  telefon: string;
  il: string;
  ilce: string;
  adres: string;
  vergiDairesiIl: string;
  vergiDairesi: string;
  vergiNo: string;
  sifre: string;
  sifreTekrar: string;
}

type TabType = 'aday' | 'isveren';

interface FormDataType {
  aday: AdayFormData;
  isveren: IsverenFormData;
}

export default function RegisterForm() {
  const { openLoginModal } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('aday');
  const [formData, setFormData] = useState<FormDataType>({
    aday: {
      ad: '',
      soyad: '',
      email: '',
      telefon: '',
      sifre: '',
      sifreTekrar: ''
    },
    isveren: {
      sirketAdi: '',
      ad: '',
      soyad: '',
      email: '',
      telefon: '',
      il: '',
      ilce: '',
      adres: '',
      vergiDairesiIl: '',
      vergiDairesi: '',
      vergiNo: '',
      sifre: '',
      sifreTekrar: ''
    }
  });
  const [ilceler, setIlceler] = useState<string[]>([]);

  const handleInputChange = (tab: TabType, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value
      }
    }));
  };

  useEffect(() => {
    if (formData.isveren.il) {
      const newIlceler = cityDistrictUtils.getIlceler(formData.isveren.il);
      setIlceler(newIlceler);
    } else {
      setIlceler([]);
    }
  }, [formData.isveren.il]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData[activeTab]);
    // Form gönderme işlemi burada yapılacak
  };

  const iller = cityDistrictUtils.getIller();

  return (
    <div className="w-full lg:max-w-lg rounded-lg flex flex-col gap-4">
      {/* Tabs */}
      <div className="w-full flex mb-2 rounded-lg bg-gray-100 dark:bg-white/10">
        <button
          type="button"
          onClick={() => setActiveTab('aday')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'aday'
              ? 'text-white shadow-sm bg-main'
              : 'text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white bg-transparent'
          }`}
        >
          Aday
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('isveren')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'isveren'
              ? 'text-white shadow-sm bg-main'
              : 'text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white bg-transparent'
          }`}
        >
          İşveren
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Aday Form */}
        {activeTab === 'aday' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Ad
                </label>
                <input
                  type="text"
                  value={formData.aday.ad}
                  onChange={(e) => handleInputChange('aday', 'ad', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                  autoComplete="given-name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Soyad
                </label>
                <input
                  type="text"
                  value={formData.aday.soyad}
                  onChange={(e) => handleInputChange('aday', 'soyad', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                E-posta
              </label>
              <input
                type="email"
                value={formData.aday.email}
                onChange={(e) => handleInputChange('aday', 'email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Telefon
              </label>
              <input
                type="tel"
                value={formData.aday.telefon}
                onChange={(e) => handleInputChange('aday', 'telefon', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                autoComplete="tel"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Şifre
              </label>
              <input
                type="password"
                value={formData.aday.sifre}
                onChange={(e) => handleInputChange('aday', 'sifre', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                autoComplete="new-password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Şifre Tekrar
              </label>
              <input
                type="password"
                value={formData.aday.sifreTekrar}
                onChange={(e) => handleInputChange('aday', 'sifreTekrar', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                autoComplete="new-password-reply"
                required
              />
            </div>

            <div className='flex items-center gap-4'>
              <input
                type="checkbox"
                required
                className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm">
                <a href="/privacy" className="underline text-main">
                  Gizlilik Politikası
                </a> ve{' '}
                <a href="/terms" className="underline text-main">
                  Kullanım Şartlarını
                </a> okudum, kabul ediyorum.
              </span>
            </div>
          </>
        )}

        {/* İşveren Form */}
        {activeTab === 'isveren' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">
                Şirket Adı
              </label>
              <input
                type="text"
                value={formData.isveren.sirketAdi}
                onChange={(e) => handleInputChange('isveren', 'sirketAdi', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Yetkili Ad
                </label>
                <input
                  type="text"
                  value={formData.aday.ad}
                  onChange={(e) => handleInputChange('aday', 'ad', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Yetkili Soyad
                </label>
                <input
                  type="text"
                  value={formData.aday.soyad}
                  onChange={(e) => handleInputChange('aday', 'soyad', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                E-posta
              </label>
              <input
                type="email"
                value={formData.isveren.email}
                onChange={(e) => handleInputChange('isveren', 'email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Telefon
              </label>
              <input
                type="tel"
                value={formData.isveren.telefon}
                onChange={(e) => handleInputChange('isveren', 'telefon', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  İl
                </label>
                <select
                  value={formData.isveren.il}
                  onChange={(e) => handleInputChange('isveren', 'il', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                  required
                >
                  <option value="">İl Seçin</option>
                  {iller.map(il => (
                    <option key={il} value={il}>{il}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  İlçe
                </label>
                <select
                  value={formData.isveren.ilce}
                  onChange={(e) => handleInputChange('isveren', 'ilce', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                  disabled={!formData.isveren.il}
                  required
                >
                  <option value="">İlçe Seçin</option>
                  {ilceler.map(ilce => (
                    <option key={ilce} value={ilce}>{ilce}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Adres
              </label>
              <input
                type="text"
                value={formData.isveren.adres}
                onChange={(e) => handleInputChange('isveren', 'adres', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Vergi Dairesi İl
                </label>
                <select
                  value={formData.isveren.vergiDairesiIl}
                  onChange={(e) => handleInputChange('isveren', 'vergiDairesiIl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                  required
                >
                  <option value="">İl Seçin</option>
                  {iller.map(il => (
                    <option key={il} value={il}>{il}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Vergi Dairesi
                </label>
                <input
                  type="text"
                  value={formData.isveren.vergiDairesi}
                  onChange={(e) => handleInputChange('isveren', 'vergiDairesi', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                  placeholder="Vergi Dairesi"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Vergi Numarası
              </label>
              <input
                type="text"
                value={formData.isveren.vergiNo}
                onChange={(e) => handleInputChange('isveren', 'vergiNo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                maxLength={10}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Şifre
              </label>
              <input
                type="password"
                value={formData.isveren.sifre}
                onChange={(e) => handleInputChange('isveren', 'sifre', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                autoComplete="new-password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Şifre Tekrar
              </label>
              <input
                type="password"
                value={formData.isveren.sifreTekrar}
                onChange={(e) => handleInputChange('isveren', 'sifreTekrar', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2"
                autoComplete="new-password-reply"
                required
              />
            </div>

            <div className='flex items-center gap-4'>
              <input
                type="checkbox"
                required
                className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm">
                <a href="/privacy" className="underline text-main">
                  Gizlilik Politikası
                </a> ve{' '}
                <a href="/terms" className="underline text-main">
                  Kullanım Şartlarını
                </a> okudum, kabul ediyorum.
              </span>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 text-white font-medium rounded-md hover:opacity-90 transition-opacity mt-4 bg-main"
        >
          Kayıt Ol
        </button>
      </form>

      {/* Login Link */}
      <div className="text-center mt-2">
        <p className="text-sm">
          Zaten hesabın var mı?{' '}
          <button onClick={openLoginModal} className="font-medium hover:underline text-main">
            Giriş Yap
          </button>
        </p>
      </div>
    </div>
  );
}