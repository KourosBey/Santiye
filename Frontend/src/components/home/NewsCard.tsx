interface NewsCardProps {
  news: {
    id: number;
    title: string;
    description: string;
    image: string;
    date?: string;
  };
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="w-full bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-text dark:text-text-dark line-clamp-2">
          {news.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {news.description}
        </p>

        {news.date && (
          <span className="text-xs text-gray-500 mt-1">{news.date}</span>
        )}
      </div>
    </div>
  );
}
