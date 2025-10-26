import Image from "next/image";
import ThemeToggle from "@/components/layout/ThemeToggle";
import HeaderButtons from "@/components/layout/HeaderButtons";
import HeaderNavbar from "@/components/layout/HeaderNavbar";
import HamburgerMenu from "@/components/layout/HamburgerMenu";

export default function Header() {
    return (
        <header className="z-20 w-full h-[70px] sm:h-[76px] fixed top-0 bg-white dark:bg-[#1F0E1E] flex justify-center items-center border-b border-b-main/5 dark:border-b-white/5">
            <div className="w-full h-full max-w-[1200px] pt-4 pb-2 px-4 xl:px-0 flex justify-between items-center">
                <HamburgerMenu />
                <div className="hidden md:flex items-center gap-12">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={60}
                            height={48}
                            className="h-10 sm:h-12"
                            priority
                        />
                        <h1 className="hidden lg:inline-block text-xl font-bold text-main dark:text-white">Lorem Ipsum</h1>
                    </div>
                    <HeaderNavbar />
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <ThemeToggle />
                    <HeaderButtons />
                </div>
            </div>
        </header>
    )
}