export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <aside className="w-64 p-4 border-r">
        <nav className="flex flex-col gap-2">
          <a href="/candidate/home">Ana Sayfa</a>
          <a href="/candidate/create-cv">CV Oluştur/Düzenle</a>
          <a href="/candidate/applications">İş Başvurularım</a>
          <a href="/candidate/account">Hesabım</a>
        </nav>
      </aside>
      <div className="flex-1 p-6">
        {children}
      </div>
    </section>
  );
}
