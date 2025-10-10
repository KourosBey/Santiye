"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardCharts() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Sahte fetch isteği (API'den gelecek verilerle değiştirebilirsin)
    const fetchData = async () => {
      const mockData = {
        activeJobs: 128,
        activeCVs: 340,
        jobsBySector: [
          { name: "Teknoloji", value: 45 },
          { name: "Sağlık", value: 30 },
          { name: "Eğitim", value: 20 },
          { name: "Finans", value: 25 },
        ],
        jobsByMethod: [
          { name: "Tam Zamanlı", value: 70 },
          { name: "Yarı Zamanlı", value: 20 },
          { name: "Staj", value: 10 },
        ],
        jobsByCity: [
          { name: "İstanbul", value: 60 },
          { name: "Ankara", value: 25 },
          { name: "İzmir", value: 15 },
          { name: "Bursa", value: 10 },
          { name: "Antalya", value: 18 },
        ],
        applicantAge: [
          { name: "18-24", value: 30 },
          { name: "25-34", value: 45 },
          { name: "35-44", value: 25 },
          { name: "45+", value: 10 },
        ],
      };
      setData(mockData);
    };
    fetchData();
  }, []);

  if (!data) return <p className="text-center">Yükleniyor...</p>;

  const COLORS = ["#2D9CDB", "#27AE60", "#F2994A", "#9B51E0", "#EB5757"];

  return (
    <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Aktif Sayılar */}
      <div className="col-span-1 md:col-span-2 flex justify-around items-center p-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-main">Aktif İlan Sayısı</h3>
          <p className="text-3xl font-bold text-main">{data.activeJobs}</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-third">Aktif CV Sayısı</h3>
          <p className="text-3xl font-bold text-third">{data.activeCVs}</p>
        </div>
      </div>

      {/* Sektöre Göre İlanlar */}
      <ChartCard title="Sektöre Göre İlanlar">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.jobsBySector}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2D9CDB" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Çalışma Yöntemine Göre */}
      <ChartCard title="Çalışma Yöntemine Göre İlanlar">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.jobsByMethod}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#F2994A" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* İllere Göre İlanlar */}
      <ChartCard title="İllere Göre İlanlar">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.jobsByCity}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#27AE60" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Başvuru Yaş Grafiği */}
      <ChartCard title="Başvuru Yaş Dağılımı">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.applicantAge}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#9B51E0" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

/* 🔹 Tailwind tabanlı sade ChartCard bileşeni */
function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
      <h3 className="text-base font-semibold text-second text-center mb-2">
        {title}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}