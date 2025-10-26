import Image from "next/image";
import type { IkBlog } from "@/types/ikBlog";

interface NewsCardProps {
  blog: IkBlog;
}

export default function BlogCard({ blog }: NewsCardProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <Image
        src={blog.image || "/default-image.jpg"}
        alt={blog.title}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.src = "/images/no-image.png";
        }}
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-text dark:text-text-dark line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {blog.description}
        </p>

        {blog.date && (
          <span className="text-xs text-gray-500 dark:text-gray-100 mt-1">{blog.date}</span>
        )}
      </div>
    </div>
  );
}
