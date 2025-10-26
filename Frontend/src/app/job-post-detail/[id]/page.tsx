"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  Briefcase,
  Calendar,
  Building2,
  ArrowLeft,
  Star,
} from "lucide-react";
import type { JobPost } from "@/types/jobPost";
import JobPostLogo from "@/components/jobs/JobPostLogo";
import { formatDate } from "@/scripts/common";
import { getJobPostDetails } from "@/scripts/ajaxScript";

export default function JobPostDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchJobPost = () => {
      setLoading(true);
      setError(false);

      getJobPostDetails({
        jobId: params.id as string,
        onSuccess: (res) => {
          if (res.data) {
            setJob(res.data as JobPost);
          } else {
            setError(true);
          }
          setLoading(false);
        },
        onError: () => {
          setError(true);
          setLoading(false);
        },
      });
    };

    if (params.id) {
      fetchJobPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-second dark:border-third"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            İlan Bulunamadı
          </h2>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-second dark:bg-third text-white rounded-lg hover:bg-second/90 dark:hover:bg-third/90 transition-colors"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 lg:py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Geri Dön Butonu */}
        <button
          onClick={() => router.back()}
          className="cursor-pointer flex items-center gap-2 text-second dark:text-white hover:text-main dark:hover:text-third transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Geri Dön</span>
        </button>

        {/* Ana Kart */}
        <div
          className={`bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800`}
        >
          {/* Başlık Bölümü */}
          <div className="p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <JobPostLogo job={job} />
              </div>

              {/* Başlık ve Bilgiler */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-2 text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                    <Building2 className="w-5 h-5" />
                    <span className="font-semibold">{job.company}</span>
                  </div>
                </div>

                {/* Detaylar */}
                <div className="flex flex-wrap gap-3 lg:gap-4 text-sm lg:text-base text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-second dark:text-third" />
                    <span>
                      {job.city}, {job.district}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-second dark:text-third" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 lg:w-5 lg:h-5 text-second dark:text-third" />
                    <span>{job.workModel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-second dark:text-third" />
                    <span>{formatDate(job.postedAt)}</span>
                  </div>
                </div>

                <span className="inline-block px-3 py-1.5 bg-second/20 text-second dark:bg-third/20 dark:text-third text-sm font-semibold rounded-full">
                  {job.category}
                </span>
              </div>
            </div>
          </div>

          {/* İçerik Bölümü */}
          <div className="px-6 lg:px-8 pb-6 lg:pb-8">
            {/* Açıklama */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                İş Tanımı
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Başvuru Butonu */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <button className="cursor-pointer w-full sm:w-auto px-8 py-3 bg-second hover:bg-second/90 dark:bg-third dark:hover:bg-third/90 text-white rounded-lg font-semibold text-lg transition-colors">
                Bu İlana Başvur
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}