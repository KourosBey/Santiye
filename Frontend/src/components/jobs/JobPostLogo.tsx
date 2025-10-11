"use client";

import Image from "next/image";
import { useState } from "react";

interface JobLogoProps {
  job: {
    company: string;
    logo?: string;
  };
}

export default function JobPostLogo({ job }: JobLogoProps) {
  const [imgError, setImgError] = useState(false);

  // fallback kutusu
  const Fallback = () => (
    <div className="hidden sm:flex w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gray-200 dark:bg-gray-700 rounded-lg items-center justify-center flex-shrink-0">
      <span className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-700 dark:text-gray-200">
        {job.company.charAt(0)}
      </span>
    </div>
  );

  if (!job.logo || imgError) {
    return <Fallback />;
  }

  return (
    <div className="relative hidden sm:block w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg flex-shrink-0 overflow-hidden shadow-sm">
      <Image
        src={job.logo}
        alt={job.company}
        fill
        className="object-contain p-1"
        onError={() => setImgError(true)}
      />
    </div>
  );
}