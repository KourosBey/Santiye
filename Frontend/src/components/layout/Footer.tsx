import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full pt-4 bg-background-dark dark:bg-black text-text-dark flex justify-center items-start text-xs">
          <div className="w-[1200px] max-w-full py-2 flex flex-col justify-center items-start gap-4">
            <div className="w-full p-2 flex flex-wrap flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start">
                <div className="max-w-full sm:max-w-[calc(25%-0.5rem)] flex flex-col gap-2">
                    <h3 className="text-sm font-bold text-white">Hakkımızda</h3>
                    <ul className="flex flex-col gap-1">
                        <li className="cursor-pointer font-medium hover:text-third">Tarihçe</li>
                        <li className="cursor-pointer font-medium hover:text-third">Vizyon</li>
                        <li className="cursor-pointer font-medium hover:text-third">Misyon</li>
                    </ul>
                </div>
                <div className="max-w-full sm:max-w-[calc(25%-0.5rem)] flex flex-col gap-2">
                    <h3 className="text-sm font-bold text-white">İletişim</h3>
                    <ul className="flex flex-col gap-1">
                        <li className="cursor-pointer font-medium hover:text-third flex items-start gap-3">
                            <Phone className="w-4 min-w-4 aspect-square"/>
                            <span className="font-medium pt-1">+90 (216) 123 45 67</span>
                        </li>
                        <li className="cursor-pointer font-medium hover:text-third flex items-start gap-3">
                            <Mail className="w-4 min-w-4 aspect-square"/>
                            <span className="font-medium pt-1">sirketAdi@info.com.tr</span>
                        </li>
                        <li className="cursor-pointer font-medium hover:text-third flex items-start gap-3">
                            <MapPin className="w-4 min-w-4 aspect-square"/>
                            <span className="font-medium pt-1">Soğanlık Yeni Mahallesi Soğanlık D-100 Yan yol Cad. B Blok No: 72, D:1, 34400 Kartal</span>
                        </li>
                    </ul>
                </div>
                <div className="max-w-full sm:max-w-[calc(25%-0.5rem)] flex flex-col gap-2">
                    <h3 className="text-sm font-bold text-white">Veri Politikası</h3>
                    <ul className="flex flex-col gap-1">
                        <li className="cursor-pointer font-medium hover:text-third">Kişisel Verilerin Korunması ve İşlenmesi Politikası</li>
                        <li className="cursor-pointer font-medium hover:text-third">Aday Aydınlatma Metni</li>
                        <li className="cursor-pointer font-medium hover:text-third">İlan Veren Aydınlatma Metni</li>
                        <li className="cursor-pointer font-medium hover:text-third">Çalışan Aydınlatma Metni</li>
                    </ul>
                </div>
                <div className="max-w-full sm:max-w-[calc(25%-0.5rem)] flex flex-col gap-2">
                    <h3 className="text-sm font-bold text-white">Yardım</h3>
                    <ul className="flex flex-col gap-1">
                        <li className="cursor-pointer font-medium hover:text-third">Reklam Ver</li>
                        <li className="cursor-pointer font-medium hover:text-third">Talep Bildir</li>
                        <li className="cursor-pointer font-medium hover:text-third">Sorun Bildir</li>
                        <li className="cursor-pointer font-medium hover:text-third">Sıkça Sorulan Sorular</li>
                    </ul>
                </div>
            </div>
            <div className="w-full p-2 flex flex-col-reverse gap-4 sm:flex-row justify-between items-center border-t border-white/50">
                <span>© 2025 Lorem Ipsum - Tüm Hakları Saklıdır</span>
                <div className="flex items-center gap-4">
                    <Facebook className="h-6 cursor-pointer hover:text-main" />
                    <Instagram className="h-6 cursor-pointer hover:text-main" />
                    <Twitter className="h-6 cursor-pointer hover:text-main" />
                    <Youtube className="h-6 cursor-pointer hover:text-main" />
                </div>
            </div>
            <div className="w-full p-2 flex flex-col sm:flex-row gap-4 items-center">
                <Image
                    src="/images/iskur.webp"
                    alt="iskur"
                    width={48}
                    height={48}
                    className="h-12 aspect-square"
                />
                <span className="text-xs text-justify">Lorem Ipsum Elektronik Yayıncılık ve İletişim Hizmetleri A.Ş. Özel İstihdam Bürosu olarak 31/08/2024 – 30/08/2027 tarihleri arasında faaliyette bulunmak üzere, Türkiye İş Kurumu tarafından 26/07/2024 tarih ve 16398069 sayılı karar uyarınca 170 nolu belge ile faaliyet göstermektedir. 4904 sayılı kanun uyarınca iş arayanlardan ücret alınması yasaktır. Şikayetleriniz için aşağıdaki telefon numaralarına başvurabilirsiniz. Diğer iller için tıklayın. Türkiye İş Kurumu İstanbul İl Müdürlüğü: 0212 249 29 87 Türkiye iş Kurumu İstanbul Çalışma ve İş Kurumu Ümraniye Hizmet Merkezi : 0216 523 90 26</span>
            </div>
          </div>
        </footer>
    )
}