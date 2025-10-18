'use client';

import BlogCard from "./BlogCard";
import { ikBlog } from "@/types/ikBlog";
import { useState, useEffect } from "react";
import { getIkBlogData } from "@/scripts/ajaxScript";

export default function BlogList() {
    const [ikBlogData, setIkBlogData] = useState<ikBlog[]>([]);

    useEffect(() => {
        const onSuccess = (res: { data: unknown }) => {
          setIkBlogData(res.data as ikBlog[]);
        }
        const onError = () => {
          throw new Error("Veriler yüklenemedi");
        }
        getIkBlogData({ onSuccess: onSuccess, onError: onError });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {ikBlogData.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
        ))}
        </div>
    );
}
