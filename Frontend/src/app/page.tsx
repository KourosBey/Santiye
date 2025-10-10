import Image from "next/image";
import ShowcaseCarousel from "@/components/home/ShowcaseCarousel"
import JobPostList from "@/components/home/JobPostList"

export default function Home() {
  return (
    <div className="px-2 xl:px-0 w-full flex flex-col items-center gap-12">
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row">
          <div className="w-full bg-main/5 md:bg-transparent md:w-1/2 p-8 md:p-4 flex flex-col justify-between items-center gap-6 md:gap-2">
            <h2 className="md:mb-2 text-xl font-bold text-main text-center">Aday Olarak İş Arayın</h2>
            <p className="text-center font-medium text-sm text-text dark:text-text-dark">Binlerce iş ilanı burada sizi bekliyor. Aradığınız sektöre, pozisyone ve şehire göre ilanları listelemeye hemen başlayın.</p>
             <Image
                src="/images/job-application.png"
                alt="Job application"
                width={200}
                height={200}
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
                width={200}
                height={200}
                priority
                className="hidden md:block"
              />
            <button className="w-48 p-2 border border-third rounded-xl shadow-md bg-third text-white font-semibold text-sm">İlan Ver</button>
          </div>
        </div>

        <div className="max-w-[1200px] w-full flex flex-col gap-4 justify-center items-center">
          <h2 className="text-lg font-semibold text-second dark:text-text-dark">Öne Çıkan İş İlanları</h2>
          <div className="w-full">
            <ShowcaseCarousel />
          </div>
        </div>

        <div className="w-full py-8 bg-second/5 flex flex-col gap-6 items-center">
          <h2 className="text-lg font-semibold text-second dark:text-text-dark">Son Eklenen İş İlanları</h2>
          <div className="max-w-[1200px]">
            <JobPostList />
          </div>
          <button className="cursor-pointer px-2 border-b font-semibold ">Tüm İş İlanlarını Göster</button>
        </div>

        <div className="w-full flex flex-col gap-4 items-center">
          <h2 className="text-lg font-semibold text-second dark:text-text-dark">Grafikler</h2>

        </div>

        <div className="w-full flex flex-col gap-4 items-center">
          <h2 className="text-lg font-semibold text-second dark:text-text-dark">Haberler</h2>

        </div>

        {/* Bg */}
        <div className='z-[-1] absolute w-full h-120 top-0 left-0 flex bg-background dark:bg-background-dark'>
          <div className="hidden md:flex w-1/2 bg-main/5"></div>
          <div className="hidden md:flex w-1/2 bg-third/5"></div>
        </div>
    </div>
  );
}