"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Users,
  Eye,
  Star,
  Briefcase,
  Calendar,
  Banknote,
  Filter,
} from "lucide-react";
import { JobPosting } from "@/types/jobPosting";
import JobPostLogo from "@/components/jobs/JobPostLogo";
import AccordionItem from "@/components/common/AccordionItem";
import FilterModal from "@/components/common/FilterModal";
import { getJobPosts } from "@/scripts/ajaxScript";

export default function JobListings() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [jobFilters, setJobFilters] = useState({
    city: "",
    category: "",
    type: "",
  });
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    city: true,
    category: false,
    type: false,
  });
  
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"];
  const categories = [
    "Yazılım",
    "Tasarım",
    "Muhasebe",
    "Pazarlama",
    "Yönetim",
    "İçerik",
  ];
  const types = ["Tam Zamanlı", "Yarı Zamanlı", "Staj", "Freelance"];

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Data fetch fonksiyonu
  const fetchJobs = async (currentPage: number = 1, filters = jobFilters) => {
    try {
      setLoading(true);

      const params = {
        page: currentPage.toString(),
        ...(filters.city && { city: filters.city }),
        ...(filters.category && { category: filters.category }),
        ...(filters.type && { type: filters.type }),
      };
      
      let onSuccess = (res: any) => {
        setJobs(res.jobPostings);
        setTotalJobs(res.total);
      }
      let onError = (err: any) => {
        throw new Error("Veriler yüklenemedi");
      }
      getJobPosts({ onSuccess: onSuccess, onError: onError });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setJobFilters({
      city: selectedCity,
      category: selectedCategory,
      type: selectedType,
    });
  }, [selectedCity, selectedCategory, selectedType]);

  useEffect(() => {
    setPage(1);
    fetchJobs(1, jobFilters);
  }, [jobFilters]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR");
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 gün önce";
    if (diffDays < 7) return `${diffDays} gün önce`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} hafta önce`;
    return `${Math.ceil(diffDays / 30)} ay önce`;
  };

  const clearFilters = () => {
    setSelectedCity("");
    setSelectedCategory("");
    setSelectedType("");
    setPage(1);
  };

  const hasActiveFilters = selectedCity || selectedCategory || selectedType;
  const activeFilterCount = [selectedCity, selectedCategory, selectedType].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-1">
      <AccordionItem
        title="Şehir"
        isOpen={openAccordions.city}
        onToggle={() => toggleAccordion('city')}
      >
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          <option value="">Tüm Şehirler</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </AccordionItem>

      <AccordionItem
        title="Kategori"
        isOpen={openAccordions.category}
        onToggle={() => toggleAccordion('category')}
      >
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {category}
              </span>
            </label>
          ))}
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory("")}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Kategori seçimini temizle
            </button>
          )}
        </div>
      </AccordionItem>

      <AccordionItem
        title="Çalışma Tipi"
        isOpen={openAccordions.type}
        onToggle={() => toggleAccordion('type')}
      >
        <div className="space-y-2">
          {types.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedType === type}
                onChange={(e) => {
                  setSelectedType(e.target.checked ? type : "");
                }}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {type}
              </span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <div className="pt-4 space-y-2">
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Filtreleri Temizle ({activeFilterCount})
          </button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-60 bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">İlanlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-60 bg-transparent flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Yeniden Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="w-full flex flex-col lg:flex-row justify-between lg:justify-center items-center pb-8 gap-4">
        <p className="text-gray-700 dark:text-gray-300 font-semibold">
          {totalJobs} ilan bulundu
        </p>
        
        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Filter className="w-4 h-4" />
          Filtreler
          {hasActiveFilters && (
            <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="w-full flex items-start gap-6">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-4 p-6 bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Filtreler
              {hasActiveFilters && (
                <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {activeFilterCount}
                </span>
              )}
            </h3>
            <FilterContent />
          </div>
        </div>

        {/* Job Listings */}
        <div className="flex-1 min-w-0">
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`cursor-pointer bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800
                        ${
                          job.featured
                            ? "border-l-4 border-l-yellow-400"
                            : ""
                        } hover:shadow-md transition-shadow p-4 lg:p-6`}
              >
                <div className="w-full h-full flex flex-col lg:flex-row gap-4 lg:gap-6">
                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 lg:gap-4">
                      {/* Company Logo */}
                      <JobPostLogo job={job} />
                      <div className="flex-1 min-w-0 space-y-2 lg:space-y-3">
                        <div>
                          <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                            {job.title}
                            {job.featured && (
                              <Star className="inline-block w-4 h-4 text-yellow-400 fill-current ml-2" />
                            )}
                          </h3>
                          <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 font-medium">
                            {job.company}
                          </p>
                        </div>

                        {/* Job Details */}
                        <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-sm text-gray-600 dark:text-gray-400">
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
                            <span>{job.category}</span>
                          </div>
                        </div>

                        {job.workModel && (
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-semibold rounded-full">
                            {job.workModel}
                          </span>
                        )}

                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm lg:text-base">
                          {job.description}
                        </p>

                        {job.salary && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-md w-fit">
                            <Banknote className="w-4 h-4" />
                            <span className="font-medium">{job.salary}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats and Apply Button */}
                  <div className="lg:w-36 flex flex-col sm:flex-row lg:flex-col justify-between gap-4">
                    <div className="flex flex-row flex-wrap lg:flex-col items-center lg:items-start gap-2 lg:gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1 lg:gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{getTimeAgo(job.postedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{job.views}</span>
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2">
                        <Users className="w-4 h-4" />
                        <span>{job.applicants}</span>
                      </div>
                      {job.deadline && (
                        <div className="text-red-500 mt-0 ml-1 lg:mt-1 lg:ml-0">
                          <span className="text-xs font-medium block lg:inline">
                            Son: {formatDate(job.deadline)}
                          </span>
                        </div>
                      )}
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap">
                      Başvur
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {jobs.length === 0 && !loading && (
            <div className="text-center py-12 px-4 bg-white dark:bg-gray-900 shadow-sm rounded-lg">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                İlan bulunamadı
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Arama kriterlerinize uygun ilan bulunamadı.
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Filtreleri Temizle
              </button>
            </div>
          )}

          {/* Pagination */}
          {jobs.length > 0 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => {
                  const newPage = Math.max(1, page - 1);
                  setPage(newPage);
                  fetchJobs(newPage, jobFilters);
                }}
                disabled={page <= 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Önceki
              </button>
              <span className="text-gray-600 dark:text-gray-400">Sayfa {page}</span>
              <button
                onClick={() => {
                  const newPage = page + 1;
                  setPage(newPage);
                  fetchJobs(newPage, jobFilters);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Sonraki
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      >
        <FilterContent />
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsFilterModalOpen(false)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Filtreleri Uygula
          </button>
        </div>
      </FilterModal>
    </div>
  );
}