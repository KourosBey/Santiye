import Image from "next/image";
import ShowcaseCarousel from "@/components/home/ShowcaseCarousel"

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-12">
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full bg-main/5 md:bg-transparent md:w-1/2 p-8 md:p-4 flex flex-col justify-between items-center gap-6 md:gap-2">
            <h2 className="md:mb-2 text-xl font-bold text-main text-center">Aday Olarak İş Arayın</h2>
            <p className="text-center font-medium text-sm text-text dark:text-text-dark">Binlerce iş ilanı burada sizi bekliyor. Aradığınız sektöre, pozisyone ve şehire göre ilanları listelemeye hemen başlayın.</p>
             <Image
                src="/images/job-application.png"
                alt="Job application"
                width={240}
                height={240}
                priority
                className="hidden md:block"
              />
            <button className="w-48 p-2 border border-main rounded-xl shadow-md bg-main text-white font-semibold text-sm">İş Ara</button>
          </div>
          <div className="w-full bg-th'rd/5 md:bg-transparent md:w-1/2 p-8 md:p-4 flex flex-col justify-between items-center gap-6 md:gap-2">
            <h2 className="md:mb-2 text-xl font-bold text-third text-center">İşveren Olarak İlan Oluşturun</h2>
            <p className="text-center font-medium text-sm text-text dark:text-text-dark">Kaliteli iş gücü burada sizi bekliyor. Pozisyon hakkında detaylar vererek iş ilanlarınızı oluşturun ve başvuruları inceleyin.</p>
             <Image
                src="/images/hiring.png"
                alt="Hiring"
                width={240}
                height={240}
                priority
                className="hidden md:block"
              />
            <button className="w-48 p-2 border border-third rounded-xl shadow-md bg-third text-white font-semibold text-sm">İlan Ver</button>
          </div>
        </div>
        <ShowcaseCarousel />


        {/* Bg */}
        <div className='z-[-1] absolute w-full h-128 top-0 left-0 flex bg-background dark:bg-background-dark'>
          <div className="hidden md:flex w-1/2 bg-main/5"></div>
          <div className="hidden md:flex w-1/2 bg-third/5"></div>
        </div>
    </div>
  );
}