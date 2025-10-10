import Image from "next/image";
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="max-w-[1200px] w-full flex items-start justify-center lg:justify-between px-4 py-12">
      {/* Form */}
      <div className="w-full lg:w-auto flex flex-col bg-background dark:bg-background-dark p-6 shadow-md rounded-lg">
        <div className="w-full mb-4">
          <h1 className="text-2xl font-semibold mb-2">
            Kayıt Ol
          </h1>
          <p className="text-sm">
            Hesap oluşturmak için bilgilerinizi girin
          </p>
        </div>
        
        {/* Client Component */}
        <RegisterForm />
      </div>

      {/* Image */}
      <div className="relative w-[400px] h-[400px] hidden lg:flex mt-12">
        <Image
          src="/images/register.png"
          alt="Kayıt Ol"
          fill
          sizes="(max-width: 400px) 100vw"
          className="z-[-1] object-contain"
        />
      </div>
    </div>
  );
}