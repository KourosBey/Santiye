'use client';

import JobPostCardMini from "@/components/home/JobPostCardMini";
import { JobPosting } from "@/types/jobPosting";
import { useState, useEffect } from "react";
import { getJobPosts } from "@/scripts/ajaxScript";

export default function JobPostList() {
    const [jobs, setJobs] = useState<JobPosting[]>([]);

    useEffect(() => {
        let onSuccess = (res: any) => {
            setJobs(res.jobPostings);
        }
        let onError = (err: any) => {
            throw new Error("Veriler yüklenemedi");
        }
        getJobPosts({ onSuccess: onSuccess, onError: onError });
    }, []);

    return (
        <div className="flex flex-col lg:flex-row gap-2 flex-wrap">
          {jobs.map((job) => (
            <div className="w-full lg:w-[calc(50%-0.25rem)]">
              <JobPostCardMini 
                key={job.id} 
                job={job} 
              />
            </div>
          ))}
        </div>
    );
}