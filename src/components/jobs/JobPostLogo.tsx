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
    <div className="hidden sm:flex w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-lg items-center justify-center flex-shrink-0">
      <span className="text-lg lg:text-xl font-bold text-gray-600">
        {job.company.charAt(0)}
      </span>
    </div>
  );

  if (!job.logo || imgError) {
    return <Fallback />;
  }

  return (
    <div className="relative hidden sm:block w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex-shrink-0 overflow-hidden shadow-sm">
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