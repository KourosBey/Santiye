'use client';

import { useState } from "react";
import { User, Users, GraduationCap, Briefcase, CircleStar, CircleCheckBig, Plus } from "lucide-react";

export default function CreateCvPage() {
  const [activeTab, setActiveTab] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    country: "Türkiye",
    city: "İstanbul",
    district: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "Erkek",
    isMarried: false,
    militaryStatus: "Tamamlandı",
    defermentEndDate: "",
    
    workExperiences: [],
    
    highSchool: {
      schoolName: "",
      graduationStatus: "Mezun",
      startDate: "",
      endDate: ""
    },
    universities: [],
    
    languages: [],
    skills: [],
    certificates: [],
    
    references: [],
    
    salaryRequest: "",
    driveLicenses: [],
    isDisabled: false,
    
    links: []
  });

  return (
    <div className="min-h-screen max-w-[1200px] pt-4">
      <div className="w-full flex flex-col py-4 gap-12">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold text-background-dark dark:text-background">CV Oluştur</h1>
          <p className="text-center text-sm font-semibold">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolore fugit nihil quidem voluptas enim, deleniti dolorum corrupti! Sapiente magni aliquam rerum debitis amet iusto excepturi repellat aperiam voluptatem sit!
          </p>
        </div>

        <div className="w-full bg-background dark:bg-background-dark flex flex-col lg:flex-row border border-second/50 rounded-md shadow-md overflow-hidden">
          {/* tabs */}
          <div className="tabs w-full lg:w-1/4 flex lg:flex-col flex-wrap dark:bg-second/5 text-text dark:text-text-dark border-r border-second/20">
            {[
              { id: 1, icon: <User className="w-6 h-6" />, title: "Genel Bilgiler" },
              { id: 2, icon: <Briefcase className="w-6 h-6" />, title: "Deneyimler" },
              { id: 3, icon: <GraduationCap className="w-6 h-6" />, title: "Eğitim Bilgileri" },
              { id: 4, icon: <CircleStar className="w-6 h-6" />, title: "Yetenekler" },
              { id: 5, icon: <Users className="w-6 h-6" />, title: "Referanslar" },
              { id: 6, icon: <CircleCheckBig className="w-6 h-6" />, title: "Tercihler" },
              { id: 7, icon: <Plus className="w-6 h-6" />, title: "Ek Bilgiler" },
            ].map(tab => (
              <div
                key={tab.id}
                className={`cursor-pointer w-1/2 last:w-full sm:w-1/7 sm:last:w-1/7 lg:w-full lg:last:w-full flex sm:flex-col lg:flex-row items-center p-4 lg:p-6 gap-4 border sm:border-0 sm:border-b border-second/20 ${
                  activeTab === tab.id ? "bg-second/80 text-white" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <h3 className="text-xs lg:text-base font-semibold whitespace-nowrap">{tab.title}</h3>
              </div>
            ))}
          </div>

          {/* contents */}
          <div className="w-full md:w-3/4 p-4 bg-white/50 dark:bg-black/25">
            {activeTab === 1 &&  (
              <div className="space-y-4 px-2 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-second dark:text-third mb-1">Ad *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-second dark:text-third mb-1">Soyad *</label>
                    <input
                      type="text"
                      value={formData.surname}
                      onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-second dark:text-third mb-1">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-second dark:text-third mb-1">Telefon *</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+90 (555) 555-5555"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-second dark:text-third mb-1">Ülke</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Türkiye">Türkiye</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-second dark:text-third mb-1">Şehir</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="İstanbul">İstanbul</option>
                      <option value="Ankara">Ankara</option>
                      <option value="İzmir">İzmir</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-second dark:text-third mb-1">İlçe</label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-second dark:text-third mb-1">Doğum Tarihi</label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-second dark:text-third mb-2">Cinsiyet</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Erkek"
                        checked={formData.gender === "Erkek"}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-text dark:text-text-dark">Erkek</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Kadın"
                        checked={formData.gender === "Kadın"}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-text dark:text-text-dark">Kadın</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-second dark:text-third mb-2">Medeni Durum</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="marital"
                        checked={formData.isMarried}
                        onChange={() => setFormData({ ...formData, isMarried: true })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-text dark:text-text-dark">Evli</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="marital"
                        checked={!formData.isMarried}
                        onChange={() => setFormData({ ...formData, isMarried: false })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-text dark:text-text-dark">Bekar</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-second dark:text-third mb-2">Askerlik Durumu</label>
                  <div className="flex flex-wrap gap-4">
                    {["Tecilli", "Tamamlandı", "Muaf"].map((status) => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="military"
                          value={status}
                          checked={formData.militaryStatus === status}
                          onChange={(e) => setFormData({ ...formData, militaryStatus: e.target.value })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-text dark:text-text-dark">{status}</span>
                      </label>
                    ))}
                  </div>
                  
                  {formData.militaryStatus === "Tecilli" && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-second dark:text-third mb-1">Tecil Bitiş Tarihi</label>
                      <input
                        type="date"
                        value={formData.defermentEndDate}
                        onChange={(e) => setFormData({ ...formData, defermentEndDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">İş Deneyimleri</h2>
                  <button
                    // onClick={addWorkExperience}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Deneyim Ekle
                  </button>
                </div>

                {formData.workExperiences.map((exp, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                    <button
                      // onClick={() => removeWorkExperience(index)}
                      className="absolute top-2 right-2 p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      {/* <Trash className="w-4 h-4" /> */}
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-second dark:text-third mb-1">Şirket Adı</label>
                        <input
                          type="text"
                          // value={exp.company}
                          // onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-second dark:text-third mb-1">Pozisyon</label>
                        <input
                          type="text"
                          // value={exp.position}
                          // onChange={(e) => updateWorkExperience(index, 'position', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-second dark:text-third mb-1">Başlangıç Tarihi</label>
                        <input
                          type="date"
                          // value={exp.startDate}
                          // onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-second dark:text-third mb-1">Bitiş Tarihi</label>
                        <input
                          type="date"
                          // value={exp.endDate}
                          // onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.workExperiences.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Henüz deneyim eklenmedi. Yukarıdaki butonu kullanarak deneyim ekleyebilirsiniz.
                  </div>
                )}
              </div>
            )}
            {activeTab === 3 && <div>Eğitim Bilgileri</div>}
            {activeTab === 4 && <div>Yetenekler</div>}
            {activeTab === 5 && <div>Referanslar</div>}
            {activeTab === 6 && <div>Tercihler</div>}
            {activeTab === 7 && <div>Ek Bilgiler</div>}
          </div>
        </div>
      </div>
    </div>
  );
}