'use client';

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function HeaderButtons() {
    const router = useRouter();
    const { openLoginModal } = useAuthStore();
    
    const goToRegister = () => {
        router.push("/register");
    };

    return (
        <div className="flex items-center gap-2">
            <button 
                onClick={goToRegister} 
                className="cursor-pointer p-2 w-20 2xl:w-24 bg-transparent text-main/85 border-2 border-main/85 dark:border-white dark:text-white font-bold text-xs rounded-lg"
            >
                Kayıt Ol
            </button>
            <button 
                onClick={openLoginModal}
                className="cursor-pointer p-2 w-20 2xl:w-24 bg-main/85 text-white border-2 border-main/85 font-bold text-xs rounded-lg"
            >
                Giriş Yap
            </button>
        </div>
    );
}