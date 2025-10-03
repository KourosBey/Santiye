type WorkType = "Tam Zamanlı" | "Yarı Zamanlı" | "Staj" | "Freelance";
type WorkModel = "Ofisten" | "Hibrit" | "Uzaktan";


export interface JobPosting {
  id: number;
  title: string;              // İlan başlığı
  company: string;            // Firma adı
  logo?: string;              // Firma logosu (opsiyonel)
  city: string;               // Şehir
  district: string;           // İlçe
  type: WorkType;             // Çalışma tipi
  category: string;           // Örn: Yazılım, Tasarım, Muhasebe
  description: string;        // İlan açıklaması
  requirements: string[];     // Gereksinimler
  salary?: string;            // Maaş (opsiyonel)
  workModel: WorkModel;       // Çalışma modeli
  featured: boolean;          // Vitrin ilan mı
  active: boolean;            // İlan aktif mi
  postedAt: string;           // Açılış tarihi (ISO format önerilir)
  deadline?: string;          // Son başvuru tarihi
  views: number;              // Görüntülenme sayısı
  applicants: number;         // Başvuru sayısı
}