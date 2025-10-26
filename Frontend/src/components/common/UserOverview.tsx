'use client';
import type { UserOverview } from "@/types/userOverview";
import { useState, useEffect } from "react";
import { getUserOverview } from '@/scripts/ajaxScript';
import Splash from "@/components/common/Splash";

export default function UserOverview() {
    const [userOverview, setUserOverview] = useState<UserOverview>();

    useEffect(() => {
        getUserOverview({
            onSuccess: (res) => {
                console.log("User overview data:", res);
                setUserOverview(res.data as UserOverview);
            },
            onError: (err) => {
                console.error("Error fetching user overview:", err);
            },
        });
    }, []);

    if (userOverview) {
        const user = userOverview;
        return (
            <div className="p-2 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-black dark:text-white font-semibold">Hoşgeldiniz <span className="text-lg">{user.fullName}</span></h2>
                    <p className="text-sm font-medium"><span className="font-semibold">Müşteri No:</span> {user.userNumber}</p>
                </div>
            </div>
        );
    } else {
        return <Splash fullScreen message="Kullanıcı verileri yükleniyor..." />;
    }
}