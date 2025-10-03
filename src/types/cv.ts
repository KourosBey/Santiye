type Gender = "Erkek" | "Kadın";
type MilitaryStatus = "Tecilli" | "Tamamlandı" | "Muaf";
type WorkExperience = {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
};
type GraduationStatus = "Öğrenci" | "Mezun" | "Terk" | "Ara Vermiş";
type HighScholl = {
    schoolName: string;
    graduationStatus: GraduationStatus;
    startDate: string;
    endDate: string;
};
type EducationLevel = 'Yüksek Okul' | 'Üniversite' | 'Yüksek Lisans' | 'Doktora/PHD';
type StudyType = 'Örgün' | 'İkinci' | 'Açık' | 'Uzaktan';
type University = {
    schoolName: string;
    educationLevel: EducationLevel;
    graduationStatus: GraduationStatus;
    faculty: string;
    department: string;
    studtyType: StudyType;
    studyLanguage: string;
    startDate: string;
    endDate: string;
};
type Certificate = {
    name: string;
    certificateNumber: string;
    date: string;
    organization: string;
}
type Referance = {
    name: string;
    company: string;
    phone: string;
}

type Links = {
    link: string;
    description: string;
}

export interface Cv {
  id: number;
  
  name: string;
  surname: string;
  country: string;
  city: string;
  district: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: Gender;
  isMarried: boolean;
  millitaryStatus: MilitaryStatus;
  defermentEndDate: string;

  workExperience: WorkExperience[];
  highScholl: HighScholl;
  university: University;

  languages: string[];
  skills: string[];
  certificates: Certificate[];

  referances: Referance[];

  salaryRequest: string;

  driveLicenses: string[];
  isDisabled: boolean;

  links: Links[];
}