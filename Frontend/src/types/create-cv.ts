export interface Experience {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorking: boolean;
  workType: 'office' | 'hybrid' | 'remote';
  employmentType: 'fulltime' | 'parttime' | 'intern';
}

export interface Education {
  id: string;
  institutionName: string;
  type: 'highschool' | 'undergraduate' | 'associate' | 'master' | 'phd';
  department?: string;
  status: 'graduated' | 'continuing' | 'dropped';
  graduationDate?: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Certificate {
  id: string;
  name: string;
  institution: string;
  date: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Hobby {
  id: string;
  name: string;
}

export interface Reference {
  id: string;
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
}

export interface CvData {
  generalInfo: {
    fullName: string;
    gender: string;
    age: string;
    city: string;
    district: string;
    email: string;
    phone: string;
  };
  experiences: Experience[];
  educations: Education[];
  languages: Language[];
  certificates: Certificate[];
  skills: Skill[];
  hobbies: Hobby[];
  references: Reference[];
  cvText: string;
  otherInfo: {
    hasLicense: boolean;
    licenseClass: string;
    militaryStatus: string;
    sgkStatus: string;
    maritalStatus: string;
    childrenCount: string;
    spouseWorking: string;
    hasDisability: boolean;
    disabilityDescription: string;
    hasTravelRestriction: boolean;
    travelRestrictionDescription: string;
  };
}