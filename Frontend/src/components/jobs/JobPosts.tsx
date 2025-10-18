"use client";

import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { JobPost } from "@/types/jobPost";
import FilterModal from "@/components/common/FilterModal";
import Splash from "@/components/common/Splash";
import { getJobPosts } from "@/scripts/ajaxScript";
import JobPostCard from "@/components/jobs/JobPostCard";
import JobPostFilters from "@/components/jobs/JobPostFilters";

export default function JobListings() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [jobFilters, setJobFilters] = useState({
    abroad: false,
    city: "",
    position: "",
    category: "",
    type: "",
    model: "",
  });
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [abroadCheck, setAbroadCheck] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    country: false,
    city: false,
    position: false,
    category: false,
    type: false,
    model: false
  });
  
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const fetchJobs = async (currentPage: number = 1, filters = jobFilters) => {
    try {
      setLoading(true);

      // const params = {
      //   page: currentPage.toString(),
      //   ...(filters.abroad && { abroad: filters.abroad }),
      //   ...(filters.position && { position: filters.position }),
      //   ...(filters.city && { city: filters.city }),
      //   ...(filters.category && { category: filters.category }),
      //   ...(filters.type && { type: filters.type }),
      //   ...(filters.model && { model: filters.model })
      // };
      
      const onSuccess = (res: { data: unknown }) => {
        const data = res.data as JobPost[];
        setJobs(data);
        setTotalJobs(data.length);
      }
      const onError = () => {
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
      abroad: abroadCheck,
      city: selectedCity,
      position: selectedPosition,
      category: selectedCategory,
      type: selectedType,
      model: selectedModel
    });
  }, [selectedCity, selectedCategory, selectedType, selectedModel, abroadCheck, selectedPosition]);

  useEffect(() => {
    if (abroadCheck) setSelectedCity("");
  }, [abroadCheck]);

  useEffect(() => {
    setPage(1);
    fetchJobs(1, jobFilters);
  }, [jobFilters]);

  const applyFilters = () => {
    setPage(1);
    fetchJobs(1, jobFilters);
  };

  const clearFilters = () => {
    setAbroadCheck(false);
    setSelectedCity("");
    setSelectedPosition("");
    setSelectedCategory("");
    setSelectedType("");
    setSelectedModel("");
    setPage(1);
  };

  const handleApplyJob = (jobId: string) => {
    console.log("Başvuru yapıldı:", jobId);
    // Başvuru mantığınızı buraya ekleyin
  };

  const hasActiveFilters = selectedCity || selectedPosition || selectedCategory || selectedType || selectedModel || abroadCheck;
  const activeFilterCount = [abroadCheck, selectedCity, selectedPosition, selectedCategory, selectedType, selectedModel].filter(Boolean).length;

  if (loading) {
    return <Splash fullScreen message="CV verileri yükleniyor..." />;
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
            <JobPostFilters
              abroadCheck={abroadCheck}
              selectedCity={selectedCity}
              selectedPosition={selectedPosition}
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              selectedModel={selectedModel}
              openAccordions={openAccordions}
              onAbroadChange={setAbroadCheck}
              onCityChange={setSelectedCity}
              onPositionChange={setSelectedPosition}
              onCategoryChange={setSelectedCategory}
              onTypeChange={setSelectedType}
              onModelChange={setSelectedModel}
              onToggleAccordion={toggleAccordion}
              onApplyFilters={applyFilters}
              onClearFilters={clearFilters}
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="flex-1 min-w-0">
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobPostCard 
                key={job.id} 
                job={job} 
                onApply={handleApplyJob}
              />
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
        <JobPostFilters
          abroadCheck={abroadCheck}
          selectedCity={selectedCity}
          selectedPosition={selectedPosition}
          selectedCategory={selectedCategory}
          selectedType={selectedType}
          selectedModel={selectedModel}
          openAccordions={openAccordions}
          onAbroadChange={setAbroadCheck}
          onCityChange={setSelectedCity}
          onPositionChange={setSelectedPosition}
          onCategoryChange={setSelectedCategory}
          onTypeChange={setSelectedType}
          onModelChange={setSelectedModel}
          onToggleAccordion={toggleAccordion}
          onApplyFilters={applyFilters}
          onClearFilters={clearFilters}
        />
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