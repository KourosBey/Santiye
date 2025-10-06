type WorkType = "Tam Zamanlı" | "Yarı Zamanlı" | "Staj" | "Freelance";
type WorkModel = "Ofisten" | "Hibrit" | "Uzaktan";


export interface JobPosting {
  id: string;
  title: string;              // İlan başlığı (pozisyon?)
  company: string;            // Firma adı
  logo?: string;              // Firma logosu (opsiyonel)
  city: string;               // Şehir
  district: string;           // İlçe
  type: WorkType;             // Çalışma tipi
  workModel: WorkModel;       // Çalışma modeli
  category: string;           // Örn: Yazılım, Tasarım, Muhasebe
  description: string;        // İlan açıklaması
  featured: boolean;          // Vitrin ilan mı
  active: boolean;            // İlan aktif mi
  postedAt: string;           // Açılış tarihi (ISO format önerilir)
}