'use client';

import JobPostCard from "@/components/jobs/JobPostCard";
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
        <div className="space-y-4">
            {jobs.map((job) => (
              <JobPostCard 
                key={job.id} 
                job={job} 
              />
            ))}
          </div>
    );
}