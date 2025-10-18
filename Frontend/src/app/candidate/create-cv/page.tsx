'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Upload, Trash2 } from "lucide-react";
import {
  CvData,
  Experience,
  Education,
  Language,
  Certificate,
  Skill,
  Hobby,
  Reference,
} from "@/types/create-cv";

import Accordion from "@/components/common/Accordion";
import Modal from "@/components/common/Modal";
import Splash from "@/components/common/Splash";
import { getCvData } from "@/scripts/ajaxScript";

const CVForm = () => {
  const [activeAccordions, setActiveAccordions] = useState<string[]>(["general"]);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showHobbyModal, setShowHobbyModal] = useState(false);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [generalInfo, setGeneralInfo] = useState({
    fullName: "",
    gender: "",
    age: "",
    city: "",
    district: "",
    email: "",
    phone: "",
    photo: null as File | null,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGeneralInfo({ ...generalInfo, photo: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setGeneralInfo({ ...generalInfo, photo: null });
    setPhotoPreview(null);

    const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordions(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Fetch CV data on component mount
  useEffect(() => {
    const onSuccess = (res: { data: unknown }) => {
      const data = res.data as CvData;
      
      // Populate general info
      setGeneralInfo({
        fullName: data.generalInfo.fullName,
        gender: data.generalInfo.gender,
        age: data.generalInfo.age,
        city: data.generalInfo.city,
        district: data.generalInfo.district,
        email: data.generalInfo.email,
        phone: data.generalInfo.phone,
        photo: null,
      });

      // Populate other sections
      setExperiences(data.experiences || []);
      setEducations(data.educations || []);
      setLanguages(data.languages || []);
      setCertificates(data.certificates || []);
      setSkills(data.skills || []);
      setHobbies(data.hobbies || []);
      setReferences(data.references || []);
      setCvText(data.cvText || "");
      setOtherInfo(data.otherInfo || {
        hasLicense: false,
        licenseClass: "",
        militaryStatus: "completed",
        sgkStatus: "active",
        maritalStatus: "single",
        childrenCount: "0",
        spouseWorking: "not-working",
        hasDisability: false,
        disabilityDescription: "",
        hasTravelRestriction: false,
        travelRestrictionDescription: "",
      });
      
      setLoading(false);
    };
    const onError = () => {
      console.error("CV verileri yüklenemedi");
      setLoading(false);
    };
    getCvData({ onSuccess, onError });
  }, []);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [cvText, setCvText] = useState<string>("");
  const [references, setReferences] = useState<Reference[]>([]);

  const [otherInfo, setOtherInfo] = useState({
    hasLicense: false,
    licenseClass: "",
    militaryStatus: "completed",
    sgkStatus: "active",
    maritalStatus: "single",
    childrenCount: "0",
    spouseWorking: "not-working",
    hasDisability: false,
    disabilityDescription: "",
    hasTravelRestriction: false,
    travelRestrictionDescription: "",
  });

  const [newExperience, setNewExperience] = useState<Omit<Experience, "id">>({
    companyName: "",
    position: "",
    startDate: "",
    endDate: "",
    isCurrentlyWorking: false,
    workType: "office",
    employmentType: "fulltime",
  });

  const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
    institutionName: "",
    type: "undergraduate",
    department: "",
    status: "graduated",
    graduationDate: "",
  });

  const [newLanguage, setNewLanguage] = useState({ name: "", level: "" });
  const [newCertificate, setNewCertificate] = useState({
    name: "",
    institution: "",
    date: "",
  });
  const [newSkill, setNewSkill] = useState({ name: "", level: "" });
  const [newHobby, setNewHobby] = useState({ name: "" });
  const [newReference, setNewReference] = useState({
    name: "",
    company: "",
    position: "",
    phone: "",
    email: "",
  });

  const addExperience = () => {
    if (newExperience.companyName && newExperience.position) {
      const experience: Experience = {
        ...newExperience,
        id: Date.now().toString(),
      };
      const sorted = [...experiences, experience].sort((a, b) => {
        const dateA = a.isCurrentlyWorking ? new Date() : new Date(a.endDate);
        const dateB = b.isCurrentlyWorking ? new Date() : new Date(b.endDate);
        return dateB.getTime() - dateA.getTime();
      });
      setExperiences(sorted);
      setShowExperienceModal(false);
      setNewExperience({
        companyName: "",
        position: "",
        startDate: "",
        endDate: "",
        isCurrentlyWorking: false,
        workType: "office",
        employmentType: "fulltime",
      });
    }
  };

  const addEducation = () => {
    if (newEducation.institutionName) {
      setEducations([
        ...educations,
        { ...newEducation, id: Date.now().toString() },
      ]);
      setShowEducationModal(false);
      setNewEducation({
        institutionName: "",
        type: "undergraduate",
        department: "",
        status: "graduated",
        graduationDate: "",
      });
    }
  };

  const addLanguage = () => {
    if (newLanguage.name && newLanguage.level) {
      setLanguages([
        ...languages,
        { ...newLanguage, id: Date.now().toString() },
      ]);
      setShowLanguageModal(false);
      setNewLanguage({ name: "", level: "" });
    }
  };

  const addCertificate = () => {
    if (newCertificate.name) {
      setCertificates([
        ...certificates,
        { ...newCertificate, id: Date.now().toString() },
      ]);
      setShowCertificateModal(false);
      setNewCertificate({ name: "", institution: "", date: "" });
    }
  };

  const addSkill = () => {
    if (newSkill.name && newSkill.level) {
      setSkills([...skills, { ...newSkill, id: Date.now().toString() }]);
      setShowSkillModal(false);
      setNewSkill({ name: "", level: "" });
    }
  };

  const addHobby = () => {
    if (newHobby.name) {
      setHobbies([...hobbies, { ...newHobby, id: Date.now().toString() }]);
      setShowHobbyModal(false);
      setNewHobby({ name: "" });
    }
  };

  const addReference = () => {
    if (newReference.name && newReference.phone) {
      setReferences([
        ...references,
        { ...newReference, id: Date.now().toString() },
      ]);
      setShowReferenceModal(false);
      setNewReference({
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
      });
    }
  };

  if (loading) {
    return <Splash fullScreen message="CV verileri yükleniyor..." />;
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <Accordion
        title="Genel Bilgiler"
        isOpen={activeAccordions.includes("general")}
        onToggle={() => toggleAccordion("general")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-3">Profil Fotoğrafı</label>
            <div className="flex flex-col items-start gap-2">
              {/* Portrait-oriented preview area */}
              {photoPreview && (
                <div className="w-48 h-60 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 dark:border-second dark:bg-gray-800 flex items-center justify-center">
                  <Image
                    src={photoPreview}
                    alt="Profile preview"
                    width={192}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Upload/Change and Remove buttons */}
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer w-48 flex items-center justify-center gap-2 bg-second/90 text-white p-2 rounded hover:bg-second cursor-pointer"
                >
                  <Upload size={16} />
                  {photoPreview ? "Fotoğrafı Değiştir" : "Fotoğraf Yükle"}
                </label>
                {photoPreview && (
                  <button
                    onClick={handleRemovePhoto}
                    className="cursor-pointer w-48 flex items-center justify-center gap-2 bg-main/90 text-white p-2 rounded hover:bg-main"
                  >
                    <Trash2 size={16} />
                    Fotoğrafı Kaldır
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ad Soyad *</label>
            <input
              type="text"
              value={generalInfo.fullName}
              disabled
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second bg-gray-100 dark:bg-gray-800 dark:border-second disabled:bg-gray-200 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cinsiyet *</label>
            <select
              value={generalInfo.gender}
              disabled
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second disabled:bg-gray-200 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
              <option value="other">Diğer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Yaş *</label>
            <input
              type="number"
              value={generalInfo.age}
              disabled
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second disabled:bg-gray-200 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">E-posta *</label>
            <input
              type="email"
              value={generalInfo.email}
              disabled
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second disabled:bg-gray-200 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Şehir *</label>
            <input
              type="text"
              value={generalInfo.city}
              disabled
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second disabled:bg-gray-200 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">İlçe *</label>
            <input
              type="text"
              value={generalInfo.district}
              disabled
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second disabled:bg-gray-200 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telefon *</label>
            <input
              type="tel"
              value={generalInfo.phone}
              disabled
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second disabled:bg-gray-200 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </Accordion>

      <Accordion
        title="İş Deneyim Bilgileri"
        isOpen={activeAccordions.includes("experience")}
        onToggle={() => toggleAccordion("experience")}
      >
        <button
          onClick={() => setShowExperienceModal(true)}
          className="cursor-pointer w-48 flex items-center gap-2 mb-2 bg-second/90 text-white px-4 py-2 rounded hover:bg-second"
        >
          <Plus size={18} />
          Deneyim Ekle
        </button>
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div key={exp.id} className="border rounded p-3 bg-gray-50 dark:bg-gray-800 dark:border-second">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{exp.position}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{exp.companyName}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} -{" "}
                    {exp.isCurrentlyWorking ? "Devam Ediyor" : exp.endDate}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {exp.workType === "office"
                      ? "Ofisten"
                      : exp.workType === "hybrid"
                      ? "Hibrit"
                      : "Uzaktan"}{" "}
                    |{" "}
                    {exp.employmentType === "fulltime"
                      ? "Tam Zamanlı"
                      : exp.employmentType === "parttime"
                      ? "Part Time"
                      : "Stajyer"}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setExperiences(experiences.filter((e) => e.id !== exp.id))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion
        title="Öğrenim Bilgileri"
        isOpen={activeAccordions.includes("education")}
        onToggle={() => toggleAccordion("education")}
      >
        <button
          onClick={() => setShowEducationModal(true)}
          className="cursor-pointer w-48 flex items-center gap-2 mb-2 bg-second/90 text-white px-4 py-2 rounded hover:bg-second"
        >
          <Plus size={18} />
          Öğrenim Ekle
        </button>
        <div className="space-y-3">
          {educations.map((edu) => (
            <div key={edu.id} className="border rounded p-3 bg-gray-50 dark:bg-gray-800 dark:border-second">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{edu.institutionName}</h4>
                  <p className="text-sm text-gray-600">
                    {edu.type === "highschool"
                      ? "Lise"
                      : edu.type === "associate"
                      ? "Ön Lisans"
                      : edu.type === "undergraduate"
                      ? "Lisans"
                      : edu.type === "master"
                      ? "Yüksek Lisans"
                      : "Doktora"}
                    {edu.department && ` - ${edu.department}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {edu.status === "graduated"
                      ? "Mezun"
                      : edu.status === "continuing"
                      ? "Devam Ediyor"
                      : "Terk"}
                    {edu.graduationDate && ` - ${edu.graduationDate}`}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEducations(educations.filter((e) => e.id !== edu.id))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion
        title="Diğer Bilgiler"
        isOpen={activeAccordions.includes("other")}
        onToggle={() => toggleAccordion("other")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={otherInfo.hasLicense}
                onChange={(e) =>
                  setOtherInfo({ ...otherInfo, hasLicense: e.target.checked })
                }
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Ehliyet Var</span>
            </label>
            {otherInfo.hasLicense && (
              <input
                type="text"
                placeholder="Ehliyet Sınıfı (örn: B)"
                value={otherInfo.licenseClass}
                onChange={(e) =>
                  setOtherInfo({ ...otherInfo, licenseClass: e.target.value })
                }
                className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
              />
            )}
          </div>
          {generalInfo.gender === "male" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Askerlik Durumu
              </label>
              <select
                value={otherInfo.militaryStatus}
                onChange={(e) =>
                  setOtherInfo({ ...otherInfo, militaryStatus: e.target.value })
                }
                className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
              >
                <option value="completed">Yapıldı</option>
                <option value="deferred">Tecilli</option>
                <option value="exempt">Muaf</option>
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">SGK Durumu</label>
            <select
              value={otherInfo.sgkStatus}
              onChange={(e) =>
                setOtherInfo({ ...otherInfo, sgkStatus: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            >
              <option value="active">Aktif Çalışan</option>
              <option value="retired">Emekli Çalışan</option>
              <option value="none">SGK Kaydı Yok</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Medeni Durum
            </label>
            <select
              value={otherInfo.maritalStatus}
              onChange={(e) =>
                setOtherInfo({ ...otherInfo, maritalStatus: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            >
              <option value="single">Bekar</option>
              <option value="married">Evli</option>
            </select>
          </div>
          {otherInfo.maritalStatus === "married" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Çocuk Sayısı
                </label>
                <input
                  type="number"
                  value={otherInfo.childrenCount}
                  onChange={(e) =>
                    setOtherInfo({
                      ...otherInfo,
                      childrenCount: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Eş Çalışma Durumu
                </label>
                <select
                  value={otherInfo.spouseWorking}
                  onChange={(e) =>
                    setOtherInfo({
                      ...otherInfo,
                      spouseWorking: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
                >
                  <option value="working">Çalışıyor</option>
                  <option value="not-working">Çalışmıyor</option>
                </select>
              </div>
            </>
          )}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={otherInfo.hasDisability}
                onChange={(e) =>
                  setOtherInfo({
                    ...otherInfo,
                    hasDisability: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Bedensel Engel Var</span>
            </label>
            {otherInfo.hasDisability && (
              <textarea
                placeholder="Açıklama"
                value={otherInfo.disabilityDescription}
                onChange={(e) =>
                  setOtherInfo({
                    ...otherInfo,
                    disabilityDescription: e.target.value,
                  })
                }
                className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
                rows={2}
              />
            )}
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={otherInfo.hasTravelRestriction}
                onChange={(e) =>
                  setOtherInfo({
                    ...otherInfo,
                    hasTravelRestriction: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Seyahat Engeli Var</span>
            </label>
            {otherInfo.hasTravelRestriction && (
              <textarea
                placeholder="Açıklama"
                value={otherInfo.travelRestrictionDescription}
                onChange={(e) =>
                  setOtherInfo({
                    ...otherInfo,
                    travelRestrictionDescription: e.target.value,
                  })
                }
                className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
                rows={2}
              />
            )}
          </div>
        </div>
      </Accordion>

      <Accordion
        title="Yetkinlikler"
        isOpen={activeAccordions.includes("skills")}
        onToggle={() => toggleAccordion("skills")}
      >
        <div className="space-y-4">
          <div>
            <button
              onClick={() => setShowLanguageModal(true)}
              className="cursor-pointer w-48 flex items-center gap-2 mb-2 bg-second/90 text-white px-4 py-2 rounded hover:bg-second"
            >
              <Plus size={18} />
              Dil Ekle
            </button>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  className="flex justify-between items-center border rounded p-2 bg-gray-50 dark:bg-gray-800 dark:border-second"
                >
                  <span>
                    {lang.name} - {lang.level}
                  </span>
                  <button
                    onClick={() =>
                      setLanguages(languages.filter((l) => l.id !== lang.id))
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => setShowCertificateModal(true)}
              className="cursor-pointer w-48 flex items-center gap-2 mb-2 bg-second/90 text-white px-4 py-2 rounded hover:bg-second"
            >
              <Plus size={18} />
              Sertifika Ekle
            </button>
            <div className="space-y-2">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex justify-between items-center border rounded p-2 bg-gray-50 dark:bg-gray-800 dark:border-second"
                >
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-gray-600">
                      {cert.institution} - {cert.date}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setCertificates(
                        certificates.filter((c) => c.id !== cert.id)
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => setShowSkillModal(true)}
              className="cursor-pointer w-48 flex items-center gap-2 mb-2 bg-second/90 text-white px-4 py-2 rounded hover:bg-second"
            >
              <Plus size={18} />
              Yetenek Ekle
            </button>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex justify-between items-center border rounded p-2 bg-gray-50 dark:bg-gray-800 dark:border-second"
                >
                  <span>
                    {skill.name} - {skill.level}
                  </span>
                  <button
                    onClick={() =>
                      setSkills(skills.filter((s) => s.id !== skill.id))
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Accordion>

      <Accordion
        title="Hobiler"
        isOpen={activeAccordions.includes("hobbies")}
        onToggle={() => toggleAccordion("hobbies")}
      >
        <button
          onClick={() => setShowHobbyModal(true)}
          className="cursor-pointer w-48 flex items-center gap-2 mb-4 bg-second/90 text-white px-4 py-2 rounded hover:bg-second"
        >
          <Plus size={18} />
          Hobi Ekle
        </button>
        <div className="flex flex-wrap gap-2">
          {hobbies.map((hobby) => (
            <div
              key={hobby.id}
              className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 dark:border-second rounded-full px-4 py-2"
            >
              <span>{hobby.name}</span>
              <button
                onClick={() =>
                  setHobbies(hobbies.filter((h) => h.id !== hobby.id))
                }
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion
        title="Özgeçmiş"
        isOpen={activeAccordions.includes("resume")}
        onToggle={() => toggleAccordion("resume")}
      >
        <div>
          <label className="block text-sm font-medium mb-3">
            Özgeçmiş Metni
          </label>
          <textarea
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            placeholder="Özgeçmişinizi buraya yazabilirsiniz..."
            className="w-full border rounded-md p-4 min-h-[200px] resize-y focus:outline-none focus:ring-2 focus:ring-second focus:border-transparent bg-white dark:bg-gray-900"
            rows={8}
          />
          <p className="text-sm text-gray-500 mt-2">
            Özgeçmişinizi detaylı bir şekilde yazabilirsiniz. Bu metin CV&apos;nizde görüntülenecektir.
          </p>
        </div>
      </Accordion>

      <Accordion
        title="Referanslar"
        isOpen={activeAccordions.includes("references")}
        onToggle={() => toggleAccordion("references")}
      >
        <button
          onClick={() => setShowReferenceModal(true)}
          className="cursor-pointer w-48 flex items-center gap-2 mb-2 bg-second/90 text-white px-4 py-2 rounded hover:bg-second"
        >
          <Plus size={18} />
          Referans Ekle
        </button>
        <div className="space-y-3">
          {references.map((ref) => (
            <div key={ref.id} className="border rounded p-3 bg-gray-50 dark:bg-gray-800 dark:border-second">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{ref.name}</h4>
                  <p className="text-sm text-gray-600">
                    {ref.position} - {ref.company}
                  </p>
                  <p className="text-sm text-gray-500">{ref.phone}</p>
                  {ref.email && (
                    <p className="text-sm text-gray-500">{ref.email}</p>
                  )}
                </div>
                <button
                  onClick={() =>
                    setReferences(references.filter((r) => r.id !== ref.id))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Accordion>

      {/* Experience Modal */}
      <Modal
        isOpen={showExperienceModal}
        onClose={() => setShowExperienceModal(false)}
        title="Deneyim Ekle"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              İş Yeri İsmi *
            </label>
            <input
              type="text"
              value={newExperience.companyName}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  companyName: e.target.value,
                })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pozisyon *</label>
            <input
              type="text"
              value={newExperience.position}
              onChange={(e) =>
                setNewExperience({ ...newExperience, position: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Başlangıç Tarihi *
              </label>
              <input
                type="date"
                value={newExperience.startDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    startDate: e.target.value,
                  })
                }
                className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Bitiş Tarihi
              </label>
              <input
                type="date"
                value={newExperience.endDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    endDate: e.target.value,
                  })
                }
                disabled={newExperience.isCurrentlyWorking}
                className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second disabled:bg-gray-100"
              />
            </div>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newExperience.isCurrentlyWorking}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  isCurrentlyWorking: e.target.checked,
                  endDate: "",
                })
              }
              className="w-4 h-4"
            />
            <span className="text-sm">Devam Ediyor</span>
          </label>
          <div>
            <label className="block text-sm font-medium mb-1">
              Çalışma Şekli *
            </label>
            <select
              value={newExperience.workType}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  workType: e.target.value as "office" | "hybrid" | "remote",
                })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            >
              <option value="office">Ofisten</option>
              <option value="hybrid">Hibrit</option>
              <option value="remote">Uzaktan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              İstihdam Türü *
            </label>
            <select
              value={newExperience.employmentType}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  employmentType: e.target.value as "fulltime" | "parttime" | "intern",
                })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            >
              <option value="fulltime">Tam Zamanlı</option>
              <option value="parttime">Part Time</option>
              <option value="intern">Stajyer</option>
            </select>
          </div>
          <button
            onClick={addExperience}
            className="cursor-pointer w-full bg-second/80 text-white py-2 rounded hover:bg-second"
          >
            Ekle
          </button>
        </div>
      </Modal>

      {/* Education Modal */}
      <Modal
        isOpen={showEducationModal}
        onClose={() => setShowEducationModal(false)}
        title="Öğrenim Ekle"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Kurum İsmi *
            </label>
            <input
              type="text"
              value={newEducation.institutionName}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  institutionName: e.target.value,
                })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tür *</label>
            <select
              value={newEducation.type}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  type: e.target.value as "highschool" | "associate" | "undergraduate" | "master" | "phd",
                })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            >
              <option value="highschool">Lise</option>
              <option value="associate">Ön Lisans</option>
              <option value="undergraduate">Lisans</option>
              <option value="master">Yüksek Lisans</option>
              <option value="phd">Doktora</option>
            </select>
          </div>
          {newEducation.type !== "highschool" && (
            <div>
              <label className="block text-sm font-medium mb-1">Bölüm</label>
              <input
                type="text"
                value={newEducation.department}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    department: e.target.value,
                  })
                }
                className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Durum *</label>
            <select
              value={newEducation.status}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  status: e.target.value as "graduated" | "continuing" | "dropped",
                })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            >
              <option value="graduated">Mezun</option>
              <option value="continuing">Devam Ediyor</option>
              <option value="dropped">Terk</option>
            </select>
          </div>
          {newEducation.status === "graduated" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Mezuniyet Tarihi
              </label>
              <input
                type="date"
                value={newEducation.graduationDate}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    graduationDate: e.target.value,
                  })
                }
                className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
              />
            </div>
          )}
          <button
            onClick={addEducation}
            className="cursor-pointer w-full bg-second/80 text-white py-2 rounded hover:bg-second"
          >
            Ekle
          </button>
        </div>
      </Modal>

      {/* Language Modal */}
      <Modal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        title="Dil Ekle"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Dil *</label>
            <input
              type="text"
              value={newLanguage.name}
              onChange={(e) =>
                setNewLanguage({ ...newLanguage, name: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Seviye *</label>
            <select
              value={newLanguage.level}
              onChange={(e) =>
                setNewLanguage({ ...newLanguage, level: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            >
              <option value="">Seçiniz</option>
              <option value="A1">A1 - Başlangıç</option>
              <option value="A2">A2 - Temel</option>
              <option value="B1">B1 - Orta</option>
              <option value="B2">B2 - Orta Üstü</option>
              <option value="C1">C1 - İleri</option>
              <option value="C2">C2 - Anadil</option>
            </select>
          </div>
          <button
            onClick={addLanguage}
            className="cursor-pointer w-full bg-second/80 text-white py-2 rounded hover:bg-second"
          >
            Ekle
          </button>
        </div>
      </Modal>

      {/* Certificate Modal */}
      <Modal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        title="Sertifika Ekle"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Sertifika Adı *
            </label>
            <input
              type="text"
              value={newCertificate.name}
              onChange={(e) =>
                setNewCertificate({ ...newCertificate, name: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kurum</label>
            <input
              type="text"
              value={newCertificate.institution}
              onChange={(e) =>
                setNewCertificate({
                  ...newCertificate,
                  institution: e.target.value,
                })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tarih</label>
            <input
              type="date"
              value={newCertificate.date}
              onChange={(e) =>
                setNewCertificate({ ...newCertificate, date: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <button
            onClick={addCertificate}
            className="cursor-pointer w-full bg-second/80 text-white py-2 rounded hover:bg-second"
          >
            Ekle
          </button>
        </div>
      </Modal>

      {/* Skill Modal */}
      <Modal
        isOpen={showSkillModal}
        onClose={() => setShowSkillModal(false)}
        title="Yetenek Ekle"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Yetenek *</label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill({ ...newSkill, name: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Seviye *</label>
            <select
              value={newSkill.level}
              onChange={(e) =>
                setNewSkill({ ...newSkill, level: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            >
              <option value="">Seçiniz</option>
              <option value="Başlangıç">Başlangıç</option>
              <option value="Orta">Orta</option>
              <option value="İleri">İleri</option>
              <option value="Uzman">Uzman</option>
            </select>
          </div>
          <button
            onClick={addSkill}
            className="cursor-pointer w-full bg-second/80 text-white py-2 rounded hover:bg-second"
          >
            Ekle
          </button>
        </div>
      </Modal>

      {/* Hobby Modal */}
      <Modal
        isOpen={showHobbyModal}
        onClose={() => setShowHobbyModal(false)}
        title="Hobi Ekle"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Hobi *</label>
            <input
              type="text"
              value={newHobby.name}
              onChange={(e) =>
                setNewHobby({ ...newHobby, name: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <button
            onClick={addHobby}
            className="cursor-pointer w-full bg-second/80 text-white py-2 rounded hover:bg-second"
          >
            Ekle
          </button>
        </div>
      </Modal>

      {/* Reference Modal */}
      <Modal
        isOpen={showReferenceModal}
        onClose={() => setShowReferenceModal(false)}
        title="Referans Ekle"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ad Soyad *</label>
            <input
              type="text"
              value={newReference.name}
              onChange={(e) =>
                setNewReference({ ...newReference, name: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Şirket</label>
            <input
              type="text"
              value={newReference.company}
              onChange={(e) =>
                setNewReference({ ...newReference, company: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pozisyon</label>
            <input
              type="text"
              value={newReference.position}
              onChange={(e) =>
                setNewReference({ ...newReference, position: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telefon *</label>
            <input
              type="tel"
              value={newReference.phone}
              onChange={(e) =>
                setNewReference({ ...newReference, phone: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">E-posta</label>
            <input
              type="email"
              value={newReference.email}
              onChange={(e) =>
                setNewReference({ ...newReference, email: e.target.value })
              }
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-800 dark:border-second"
            />
          </div>
          <button
            onClick={addReference}
            className="cursor-pointer w-full bg-second/80 text-white py-2 rounded hover:bg-second"
          >
            Ekle
          </button>
        </div>
      </Modal>

      <div className="mt-8 flex gap-4">
        <button className="flex-1 py-3 rounded-lg font-semibold bg-second/80 text-white hover:bg-second cursor-pointer">CV Kontrol Et</button>
        <button className="flex-1 py-3 rounded-lg font-semibold bg-green-600 dark:bg-green-800 text-white hover:bg-green-700 cursor-pointer">CV Kaydet</button>
      </div>
    </div>
  );
};

export default CVForm;
