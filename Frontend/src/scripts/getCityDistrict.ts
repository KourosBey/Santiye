import { CityDistrict } from "@/types/cityDistrict";
import cityDistrictLocal from "@/locales/cityDistrict.json";
export const cityDistrictData : CityDistrict = cityDistrictLocal;

export class cityDistrictUtils {
  // get city list
  static getIller(): string[] {
    return Object.keys(cityDistrictData).sort();
  }

  // get district list by city
  static getIlceler(il: string): string[] {
    if (!il || !cityDistrictData[il]) {
      return [];
    }
    return cityDistrictData[il].sort();
  }

  // check if city is valid
  static isValidIl(il: string): boolean {
    return Object.keys(cityDistrictData).includes(il);
  }

  // check if district is valid
  static isValidIlIlce(il: string, ilce: string): boolean {
    if (!this.isValidIl(il)) return false;
    return cityDistrictData[il].includes(ilce);
  }

  // handle city change and return districts
  static handleIlChange(il: string): string[] {
    return this.getIlceler(il);
  }
}
