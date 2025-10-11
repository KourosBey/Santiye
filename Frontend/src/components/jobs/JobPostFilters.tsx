import React from "react";
import AccordionItem from "@/components/common/AccordionItem";

interface JobPostFiltersProps {
  abroadCheck: boolean;
  selectedCity: string;
  selectedPosition: string;
  selectedCategory: string;
  selectedType: string;
  selectedModel: string;
  openAccordions: Record<string, boolean>;
  onAbroadChange: (value: boolean) => void;
  onCityChange: (value: string) => void;
  onPositionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onToggleAccordion: (key: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"];
const positions = ["Yazılımcı", "Tasarımcı", "Muhasebeci", "Pazarlamacı", "Satış Elamanı", "Müdür"];
const categories = ["Yazılım", "Tasarım", "Muhasebe", "Pazarlama", "Yönetim", "İçerik"];
const types = ["Tam Zamanlı", "Yarı Zamanlı", "Staj", "Freelance"];
const models = ["Ofisten", "Hibrit", "Uzaktan"];

export default function JobPostFilters({
  abroadCheck,
  selectedCity,
  selectedPosition,
  selectedCategory,
  selectedType,
  selectedModel,
  openAccordions,
  onAbroadChange,
  onCityChange,
  onPositionChange,
  onCategoryChange,
  onTypeChange,
  onModelChange,
  onToggleAccordion,
  onApplyFilters,
  onClearFilters,
}: JobPostFiltersProps) {
  const hasActiveFilters = selectedCity || selectedPosition || selectedCategory || selectedType || selectedModel || abroadCheck;
  const activeFilterCount = [abroadCheck, selectedCity, selectedPosition, selectedCategory, selectedType, selectedModel].filter(Boolean).length;

  return (
    <div className="space-y-1">
      <AccordionItem
        title="Ülke"
        isOpen={openAccordions.country}
        onToggle={() => onToggleAccordion('country')}
      >
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="country"
              checked={abroadCheck === false}
              onChange={() => onAbroadChange(false)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Yurtiçi</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="country"
              checked={abroadCheck === true}
              onChange={() => {
                onAbroadChange(true);
                onCityChange("");
              }}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Yurtdışı</span>
          </label>
        </div>
      </AccordionItem>

      {!abroadCheck && (
        <AccordionItem
          title="Şehir"
          isOpen={openAccordions.city}
          onToggle={() => onToggleAccordion('city')}
        >
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
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
      )}

      <AccordionItem
        title="Pozisyon"
        isOpen={openAccordions.position}
        onToggle={() => onToggleAccordion('position')}
      >
        <div className="space-y-2">
          {positions.map((position) => (
            <label key={position} className="flex items-center space-x-2">
              <input
                type="radio"
                name="position"
                value={position}
                checked={selectedPosition === position}
                onChange={(e) => onPositionChange(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {position}
              </span>
            </label>
          ))}
          {selectedPosition && (
            <button
              onClick={() => onPositionChange("")}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Pozisyon seçimini temizle
            </button>
          )}
        </div>
      </AccordionItem>

      <AccordionItem
        title="Kategori"
        isOpen={openAccordions.category}
        onToggle={() => onToggleAccordion('category')}
      >
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {category}
              </span>
            </label>
          ))}
          {selectedCategory && (
            <button
              onClick={() => onCategoryChange("")}
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
        onToggle={() => onToggleAccordion('type')}
      >
        <div className="space-y-2">
          {types.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedType === type}
                onChange={(e) => {
                  onTypeChange(e.target.checked ? type : "");
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

      <AccordionItem
        title="Çalışma Modeli"
        isOpen={openAccordions.model}
        onToggle={() => onToggleAccordion('model')}
      >
        <div className="space-y-2">
          {models.map((model) => (
            <label key={model} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedModel === model}
                onChange={(e) => {
                  onModelChange(e.target.checked ? model : "");
                }}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {model}
              </span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <div className="pt-4 space-y-2">
        <button
          onClick={onApplyFilters}
          className="w-full px-4 py-2 text-base font-semibold text-secondary border border-second rounded-lg hover:bg-blue-100 dark:text-white dark:bg-second dark:hover:bg-second/80"
        >
          Filtrele
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="w-full px-4 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-lg hover:bg-red-50 dark:text-white dark:border-red-600 dark:hover:bg-red-600/20 dark:hover:text-white"
          >
            Filtreleri Temizle ({activeFilterCount})
          </button>
        )}
      </div>
    </div>
  );
}