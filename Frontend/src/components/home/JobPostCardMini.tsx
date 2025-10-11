import React from "react";
import { MapPin, Clock, Star, Briefcase, Calendar } from "lucide-react";
import { JobPost } from "@/types/jobPost";
import JobPostLogo from "@/components/jobs/JobPostLogo";
import { formatDate } from "@/scripts/common";

interface JobPostCardProps {
  job: JobPost;
  onApply?: (jobId: string) => void;
}

export default function JobPostCard({ job, onApply }: JobPostCardProps) {
  return (
    <div
      className={`cursor-pointer w-full  h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800
        ${job.featured ? "border-l-4 border-l-yellow-400 dark:border-l-yellow-500" : ""} 
        hover:shadow-md transition-shadow p-4 lg:p-6`}
    >
      <div className="w-full h-full flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 lg:gap-4">
            {/* Company Logo */}
            <JobPostLogo job={job} />
            
            <div className="flex-1 min-w-0 space-y-2 lg:space-y-3">
              <div className="w-full flex flex-col gap-2 sm:flex-row items-start justify-between">
                <div className="w-full sm:w-[calc(100%-128px)]">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {job.title}
                    {job.featured && (
                      <Star className="inline-block w-4 h-4 text-yellow-400 fill-current ml-2" />
                    )}
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                    {job.company}
                  </p>
                </div>

                <div className="w-full sm:w-32 flex items-center justify-end gap-1 lg:gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">{formatDate(job.postedAt)}</span>
                </div>
              </div>

              {/* Job Details */}
              <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {job.city}, {job.district}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{job.workModel}</span>
                </div>
              </div>

              <span className="inline-block px-2 py-1 bg-second/20 text-second dark:bg-third/20 dark:text-third text-xs font-semibold rounded-full">
                {job.category}
              </span>

              <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-xs">
                {job.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}