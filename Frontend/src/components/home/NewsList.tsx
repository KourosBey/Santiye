import NewsCard from "./NewsCard";

export default function NewsList() {
    const sampleNews = [
        {
            id: 1,
            title: "Yeni Teknoloji Zirvesi 2025 Başladı",
            description:
            "Dünyanın dört bir yanından gelen geliştiriciler, yapay zeka ve web teknolojilerindeki son gelişmeleri tartışmak üzere toplandı.",
            image: "https://picsum.photos/400/250?random=1",
            date: "10 Ekim 2025",
        },
        {
            id: 2,
            title: "Vue 3.5 Yayınlandı: Performans Artışı Dikkat Çekiyor",
            description:
            "Vue ekibi yeni sürümde derleyici optimizasyonlarını ve geliştirilmiş reactivity sistemini duyurdu.",
            image: "https://picsum.photos/400/250?random=2",
            date: "8 Ekim 2025",
        },
        {
            id: 3,
            title: "Next.js 15 Beta Çıktı!",
            description:
            "Yeni Route Handlers ve Server Actions özellikleriyle Next.js daha güçlü hale geldi.",
            image: "https://picsum.photos/400/250?random=3",
            date: "5 Ekim 2025",
        },
         {
            id: 4,
            title: "Yeni Teknoloji Zirvesi 2025 Başladı",
            description:
            "Dünyanın dört bir yanından gelen geliştiriciler, yapay zeka ve web teknolojilerindeki son gelişmeleri tartışmak üzere toplandı.",
            image: "https://picsum.photos/400/250?random=1",
            date: "10 Ekim 2025",
        },
        {
            id: 5,
            title: "Vue 3.5 Yayınlandı: Performans Artışı Dikkat Çekiyor",
            description:
            "Vue ekibi yeni sürümde derleyici optimizasyonlarını ve geliştirilmiş reactivity sistemini duyurdu.",
            image: "https://picsum.photos/400/250?random=2",
            date: "8 Ekim 2025",
        },
        {
            id: 6,
            title: "Next.js 15 Beta Çıktı!",
            description:
            "Yeni Route Handlers ve Server Actions özellikleriyle Next.js daha güçlü hale geldi.",
            image: "https://picsum.photos/400/250?random=3",
            date: "5 Ekim 2025",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {sampleNews.map((news) => (
            <NewsCard key={news.id} news={news} />
        ))}
        </div>
    );
}
