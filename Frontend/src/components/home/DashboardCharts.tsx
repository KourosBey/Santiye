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
import { getHomeGraphsDataJobPosts } from "@/scripts/ajaxScript";

export default function DashboardCharts() {
  const [graphDatas, setGraphDatas] = useState(null);
  const [domesticJobGraph, setDomesticJobGraph] = useState([
    { "name": "Yurtiçi", "value": 0 },
    { "name": "Yurtdışı", "value": 0 },
  ]);
  
  useEffect(() => {
      const onSuccess = (res: any) => {
        setGraphDatas(res.data);
        setDomesticJobGraph([
          { "name": "Yurtiçi", "value": res.data.domesticJobPostCount },
          { "name": "Yurtdışı", "value": res.data.internationalJobPostCount },
        ]);
      }
      const onError = () => {
        throw new Error("Veriler yüklenemedi");
      }
      getHomeGraphsDataJobPosts({ onSuccess: onSuccess, onError: onError });
  }, []);

  if (!graphDatas) return <p className="text-center">Yükleniyor...</p>;

  return (
    <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Aktif Sayılar */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-wrap justify-around items-center p-6 bg-white dark:bg-gray-900 shadow-md rounded-2xl">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text dark:text-text-dark">Aktif İlan Sayısı</h3>
          <p className="text-4xl font-mono font-bold text-main dark:text-third">{graphDatas.activeJobPostCount}+</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text dark:text-text-dark">Aktif CV Sayısı</h3>
          <p className="text-4xl font-mono font-bold text-main dark:text-third">{graphDatas.activeCvCount}+</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text dark:text-text-dark">Üye Sayımız</h3>
          <p className="text-4xl font-mono font-bold text-main dark:text-third">{graphDatas.activeJobPostCount}+</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text dark:text-text-dark">Şirket Sayısı</h3>
          <p className="text-4xl font-mono font-bold text-main dark:text-third">{graphDatas.activeJobPostCount}+</p>
        </div>
      </div>

      {/* Sektöre Göre İlanlar */}
      <ChartCard title="Sektöre Göre İlanlar">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={graphDatas.sectorGraph}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#F4B05F" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Çalışma Yöntemine Göre */}
      <ChartCard title="Çalışma Yöntemine Göre İlanlar">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={graphDatas.workTypeGraph}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#124559" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Çalışma Modeline Göre */}
      <ChartCard title="Çalışma Modeline Göre İlanlar">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={graphDatas.workModelGraph}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#C00201" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Başvuru Yaş Grafiği */}
      <ChartCard title="Başvuru Yaş Dağılımı">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={graphDatas.ageGraph}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#124559" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Yurtiçi/Yurtdışı İlanlar */}
      <ChartCard title="Yurtiçi / Yurtdışı İlanlar">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={domesticJobGraph}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#C00201" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* İllere Göre İlanlar */}
      <ChartCard title="İllere Göre İlanlar">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={graphDatas.cityGraph}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#F4B05F" radius={[6, 6, 0, 0]} />
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
    <div className="py-4 px-2 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h3 className="text-base font-semibold text-second dark:text-text-dark text-center mb-2">
        {title}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}