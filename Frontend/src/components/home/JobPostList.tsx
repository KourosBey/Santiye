'use client';

import JobPostCardMini from "@/components/home/JobPostCardMini";
import { JobPost } from "@/types/jobPost";
import { useState, useEffect } from "react";
import { getLastAddedJobPosts } from "@/scripts/ajaxScript";

export default function JobPostList() {
    const [jobs, setJobs] = useState<JobPost[]>([]);

    useEffect(() => {
        const onSuccess = (res: { data: unknown }) => {
          setJobs(res.data as JobPost[]);
        }
        const onError = () => {
          throw new Error("Veriler yüklenemedi");
        }
        getLastAddedJobPosts({ onSuccess: onSuccess, onError: onError });
    }, []);

    return (
        <div className="flex flex-col lg:flex-row gap-3 flex-wrap">
          {jobs.map((job) => (
            <div key={job.id} className="w-full lg:w-[calc(50%-0.5rem)]">
              <JobPostCardMini 
                job={job} 
              />
            </div>
          ))}
        </div>
    );
}