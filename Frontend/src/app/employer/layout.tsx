import Sidebar from '@/components/employer/Sidebar';
import TitleBar from '@/components/employer/TitleBar';

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full max-w-[1200px] px-2 md:px-0 py-4 flex flex-col md:flex-row items-start">
      <Sidebar />
      <div className="flex-1 w-full py-4 md:px-6 md:py-0 flex flex-col gap-4">
        <TitleBar />
        <div className="w-full p-2">{children}</div>
      </div>
    </main>
  );
}
