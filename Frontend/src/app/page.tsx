import Image from "next/image";
import AnnouncementBanner from "@/components/home/AnnouncementBanner"
import ShowcaseCarousel from "@/components/home/ShowcaseCarousel"
import JobPostList from "@/components/home/JobPostList"
import DashboardCharts from "@/components/home/DashboardCharts";
import BlogList from "@/components/home/BlogList";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        <AnnouncementBanner />
      </div>

      <div className="w-full flex flex-col items-center gap-10">
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full bg-main/10 md:w-1/2 p-8 md:p-4 md:py-8 flex flex-col justify-between items-center md:items-end">
            <div className="w-full max-w-[600px] flex flex-col justify-between items-center gap-6 md:gap-2">
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
              <button className="cursor-pointer w-50 p-2 border border-main rounded-xl shadow-md bg-main text-white font-bold">İş Ara</button>
            </div>
          </div>
          <div className="w-full bg-third/10 md:w-1/2 p-8 md:p-4 md:py-8 flex flex-col justify-between items-center md:items-start">
            <div className="w-full max-w-[600px] flex flex-col justify-between items-center gap-6 md:gap-2">
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
              <button className="cursor-pointer w-50 p-2 border border-third rounded-xl shadow-md bg-third text-white font-bold">İlan Ver</button>
            </div>  
          </div>
        </div>

        <div className="max-w-[1200px] w-full flex flex-col gap-4 justify-center items-center">
          <h2 className="text-lg font-bold text-second dark:text-text-dark">Öne Çıkan İş İlanları</h2>
          <div className="w-full">
            <ShowcaseCarousel />
          </div>
        </div>

        <div className="w-full py-8 bg-second/5 flex flex-col gap-6 items-center">
          <h2 className="text-lg font-bold text-second dark:text-text-dark">Son Dakika İş İlanları</h2>
          <div className="max-w-[1200px]">
            <JobPostList />
          </div>
          <button className="cursor-pointer px-2 border-b font-semibold dark:text-third">Tüm İş İlanlarını Göster</button>
        </div>

        <div className="w-full max-w-[1200px] flex flex-col gap-4 items-center">
          <h2 className="text-lg font-bold text-second dark:text-text-dark">Grafikler</h2>
          <DashboardCharts />
        </div>

        <div className="w-full py-8 bg-second/5 flex flex-col gap-6 items-center">
          <div className="w-full max-w-[1200px] flex flex-col gap-4 items-center">
            <h2 className="text-lg font-bold text-second dark:text-text-dark">Haberler</h2>
            <BlogList />
          </div>
        </div>
      </div>
    </div>
  );
}