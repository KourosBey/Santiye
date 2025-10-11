'use client';
import { useState, useEffect} from 'react';
import { useAuthStore } from "@/stores/authStore";
import { cityDistrictUtils } from "@/scripts/getCityDistrict"; 
import { VerificationModal } from './VerificationModal';

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
  sahisFirmasi: boolean;
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
      sahisFirmasi: false,
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
  const [errors, setErrors] = useState({
    aday: { sifre: '', sifreTekrar: '', telefon: '' },
    isveren: { sifre: '', sifreTekrar: '', telefon: '', vergiNo: '' }
  });

  const iller = cityDistrictUtils.getIller();
  const [ilceler, setIlceler] = useState<string[]>([]);

  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  //ready
  useEffect(() => {
    if (formData.isveren.il) {
      const newIlceler = cityDistrictUtils.getIlceler(formData.isveren.il);
      setIlceler(newIlceler);
    } else {
      setIlceler([]);
    }
  }, [formData.isveren.il]);

  //handles
  const handleInputChange = (tab: TabType, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Telefon validasyonu
    const phoneError = validatePhone(formData[activeTab].telefon);
    if (phoneError) {
      setErrors(prev => ({
        ...prev,
        [activeTab]: { ...prev[activeTab], telefon: phoneError }
      }));
      return;
    }

    // Vergi No validasyonu
    if (activeTab === 'isveren') {
      const vergiNoError = validateVergiNo(formData.isveren.vergiNo);
      if (vergiNoError) {
        setErrors(prev => ({
          ...prev,
          isveren: { ...prev.isveren, vergiNo: vergiNoError }
        }));
        return;
      }
    }
    
    // Şifre validasyonu
    const passwordError = validatePassword(formData[activeTab].sifre);
    if (passwordError) {
      setErrors(prev => ({
        ...prev,
        [activeTab]: { ...prev[activeTab], sifre: passwordError }
      }));
      return;
    }
    
    // Şifre eşleşme kontrolü
    if (!checkPasswordMatch(activeTab)) {
      return;
    }
    
    // Hataları temizle
    setErrors({
      aday: { sifre: '', sifreTekrar: '', telefon: '' },
      isveren: { sifre: '', sifreTekrar: '', telefon: '', vergiNo: '' }
    });
    
    console.log('Form submitted:', formData[activeTab]);
    // istek gönderilecek mail onay modali açılacak. onay sonrası işlem tamamlanacak.
    const currentEmail = activeTab === 'aday' ? formData.aday.email : formData.isveren.email;
    setRegisteredEmail(currentEmail);
    setShowVerificationModal(true);
  };

  const handleVerification = (code: string) => {
    console.log('Verification code:', code);
    // Burada doğrulama API çağrısı yapılacak
    setShowVerificationModal(false);
  };

  //utils
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const limited = numbers.slice(0, 10);
    // Format: (5XX) XXX XX XX
    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 6) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    } else if (limited.length <= 8) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)} ${limited.slice(6)}`;
    } else {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)} ${limited.slice(6, 8)} ${limited.slice(8)}`;
    }
  };

  const formatVergiNo = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const limited = numbers.slice(0, 11);
    return limited;
  };

  const validatePassword = (password: string): string => {
    if (password.length < 8) {
      return 'Şifre en az 8 karakter olmalıdır';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Şifre en az bir büyük harf içermelidir';
    }
    if (!/[a-z]/.test(password)) {
      return 'Şifre en az bir küçük harf içermelidir';
    }
    if (!/[0-9]/.test(password)) {
      return 'Şifre en az bir rakam içermelidir';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Şifre en az bir özel karakter içermelidir';
    }
    return '';
  };

  const checkPasswordMatch = (tab: TabType): boolean => {
    const { sifre, sifreTekrar } = formData[tab];
    if (sifre !== sifreTekrar) {
      setErrors(prev => ({
        ...prev,
        [tab]: { ...prev[tab], sifreTekrar: 'Şifreler eşleşmiyor' }
      }));
      return false;
    }
    return true;
  };

  const validatePhone = (phone: string): string => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length !== 10) {
      return 'Telefon numarası 10 haneli olmalıdır';
    }
    if (!numbers.startsWith('5')) {
      return 'Telefon numarası 5 ile başlamalıdır';
    }
    return '';
  };

  const validateVergiNo = (vergiNo: string): string => {
    const numbers = vergiNo.replace(/\D/g, '');
    if (numbers.length !== 10 && numbers.length !== 11) {
      return 'Vergi numarası 10 veya 11 haneli olmalıdır';
    }
    return '';
  };

  return (
    <div className="w-full lg:max-w-lg rounded-lg flex flex-col gap-4">
      {/* Tabs */}
      <div className="w-full flex mb-2 rounded-lg bg-gray-100 dark:bg-white/10">
        <button
          type="button"
          onClick={() => setActiveTab('aday')}
          className={`cursor-pointer flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
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
          className={`cursor-pointer flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
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
                  placeholder='Adınız'
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
                  placeholder='Soyadınız'
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
                placeholder="ornek@email.com"
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
                onChange={(e) => {
                  handleInputChange('aday', 'telefon', formatPhoneNumber(e.target.value));
                  setErrors(prev => ({ ...prev, aday: { ...prev.aday, telefon: '' } }));
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-2 ${
                  errors.aday.telefon ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="(5XX) XXX XX XX"
                autoComplete="tel"
                required
              />
              {errors.aday.telefon && (
                <p className="text-red-500 text-xs mt-1">{errors.aday.telefon}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Şifre
              </label>
              <input
                type="password"
                value={formData.aday.sifre}
                onChange={(e) => {
                  handleInputChange('aday', 'sifre', e.target.value);
                  setErrors(prev => ({ ...prev, aday: { ...prev.aday, sifre: '' } }));
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-2 ${
                  errors.aday.sifre ? 'border-red-500' : 'border-gray-300'
                }`}
                autoComplete="new-password"
                placeholder="••••••••••"
                required
              />
              {errors.aday.sifre && (
                <p className="text-red-500 text-xs mt-1">{errors.aday.sifre}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                En az 8 karakter, büyük-küçük harf, rakam ve özel karakter içermelidir
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Şifre Tekrar
              </label>
              <input
                type="password"
                value={formData.aday.sifreTekrar}
                onChange={(e) => {
                  handleInputChange('aday', 'sifreTekrar', e.target.value);
                  setErrors(prev => ({ ...prev, aday: { ...prev.aday, sifreTekrar: '' } }));
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-2 ${
                  errors.aday.sifreTekrar ? 'border-red-500' : 'border-gray-300'
                }`}
                autoComplete="new-password-reply"
                placeholder="••••••••••"
                required
              />
              {errors.aday.sifreTekrar && (
                <p className="text-red-500 text-xs mt-1">{errors.aday.sifreTekrar}</p>
              )}
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
                placeholder='Şirket Adı'
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Şirket Türü
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('isveren', 'sahisFirmasi', false)}
                  className={`px-3 py-2 rounded-md border-2 transition-all font-semibold ${
                    formData.isveren.sahisFirmasi === false
                      ? 'border-main bg-main/10 text-main'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Tüzel Şirket
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('isveren', 'sahisFirmasi', true)}
                  className={`px-3 py-2 rounded-md border-2 transition-all font-semibold ${
                    formData.isveren.sahisFirmasi === true
                      ? 'border-main bg-main/10 text-main'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Şahıs Şirketi
                </button>
              </div>
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
                  placeholder='Yetkili Adı'
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
                  placeholder='Yetkili Soyadı'
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
                placeholder="ornek@email.com"
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
                onChange={(e) => {
                  handleInputChange('isveren', 'telefon', formatPhoneNumber(e.target.value));
                  setErrors(prev => ({ ...prev, isveren: { ...prev.isveren, telefon: '' } }));
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-2 ${
                  errors.isveren.telefon ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="(5XX) XXX XX XX"
                autoComplete="tel"
                required
              />
              {errors.isveren.telefon && (
                <p className="text-red-500 text-xs mt-1">{errors.isveren.telefon}</p>
              )}
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
                placeholder='Şirket Adresi'
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
                inputMode="numeric"
                value={formData.isveren.vergiNo}
                onChange={(e) => {
                  handleInputChange('isveren', 'vergiNo', formatVergiNo(e.target.value));
                  setErrors(prev => ({ ...prev, isveren: { ...prev.isveren, vergiNo: '' } }));
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-2 ${
                  errors.isveren.vergiNo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="1234567890"
                maxLength={11}
                required
              />
              {errors.isveren.vergiNo && (
                <p className="text-red-500 text-xs mt-1">{errors.isveren.vergiNo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Şifre
              </label>
              <input
                type="password"
                value={formData.isveren.sifre}
                onChange={(e) => {
                  handleInputChange('isveren', 'sifre', e.target.value);
                  setErrors(prev => ({ ...prev, isveren: { ...prev.isveren, sifre: '' } }));
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-2 ${
                  errors.isveren.sifre ? 'border-red-500' : 'border-gray-300'
                }`}
                autoComplete="new-password"
                placeholder="••••••••••"
                required
              />
              {errors.isveren.sifre && (
                <p className="text-red-500 text-xs mt-1">{errors.isveren.sifre}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                En az 8 karakter, büyük-küçük harf, rakam ve özel karakter içermelidir
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Şifre Tekrar
              </label>
              <input
                type="password"
                value={formData.isveren.sifreTekrar}
                onChange={(e) => {
                  handleInputChange('isveren', 'sifreTekrar', e.target.value);
                  setErrors(prev => ({ ...prev, isveren: { ...prev.isveren, sifreTekrar: '' } }));
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-2 ${
                  errors.isveren.sifreTekrar ? 'border-red-500' : 'border-gray-300'
                }`}
                autoComplete="new-password-reply"
                placeholder="••••••••••"
                required
              />
              {errors.isveren.sifreTekrar && (
                <p className="text-red-500 text-xs mt-1">{errors.isveren.sifreTekrar}</p>
              )}
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

      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onVerify={handleVerification}
        email={registeredEmail}
      />
    </div>
  );
}