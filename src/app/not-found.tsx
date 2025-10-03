"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <section className="bg-background dark:bg-background-dark">
      <div className="container flex items-center px-6 pt-6 pb-24 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <Image
            src="/images/404.gif"
            alt="404 Not Found"
            width={400}
            height={300}
            className="mb-4"
            priority
          />

          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Sayfa Bulunamadı
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Aradığınız sayfa mevcut değil. İşte bazı yararlı bağlantılar:
          </p>

          <div className="flex items-center w-full mt-6 gap-x-6 shrink-0 sm:w-auto">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-1 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 shadow-sm"
            >
              <ArrowLeft className="h-4 w-4"/>
              <span className="font-semibold">Geri Dön</span>
            </button>

            <button
              onClick={handleGoHome}
              className="w-1/2 px-5 py-2 text-sm font-semibold tracking-wide text-white transition-colors duration-200 bg-main rounded-lg shrink-0 sm:w-auto shadow-sm shadow-main-shadow hover:shadow-lg hover:bg-third hover:shadow-third-shadow"
            >
              Anasayfaya Dön
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
