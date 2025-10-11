export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <aside className="w-64 p-4 border-r">
        <nav className="flex flex-col gap-2">
          <a href="/employer/home">Ana Sayfa</a>
          <a href="/employer/buy-package">İlan Paketi Satın Al</a>
          <a href="/employer/create-job-post">İş İlanı Oluştur</a>
          <a href="/employer/my-job-posts">İlanlarım</a>
          <a href="/employer/account">Hesabım</a>
        </nav>
      </aside>
      <div className="flex-1 p-6">
        {children}
      </div>
    </section>
  );
}
