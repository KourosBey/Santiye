'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getAnnouncement } from '@/scripts/ajaxScript'

interface Announcement {
  id: string
  title?: string
  message: string
  image?: string
  type: 'info' | 'warning' | 'success'
  link?: string
  closable?: boolean
}

export default function AnnouncementBanner() {
    const [announcement, setAnnouncement] = useState<Announcement | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const onSuccess = (res: { data: unknown }) => {
            setAnnouncement(res.data as Announcement);
            setIsLoading(false);
        }
        const onError = (err: unknown) => {
            setIsLoading(false);
            console.error('Duyuru yüklenirken hata oluştu:', err)
        }
        getAnnouncement({ onSuccess: onSuccess, onError: onError });
    }, []);

    const handleClose = () => {
        setIsVisible(false)
    }

    if (isLoading || !announcement || !isVisible) {
        return null
    }

    const bgColorMap = {
        info: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
        warning: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800',
        success: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
    }

    const textColorMap = {
        info: 'text-blue-900 dark:text-blue-100',
        warning: 'text-yellow-900 dark:text-yellow-100',
        success: 'text-green-900 dark:text-green-100'
    }

    const iconColorMap = {
        info: 'text-blue-600 dark:text-blue-400',
        warning: 'text-yellow-600 dark:text-yellow-400',
        success: 'text-green-600 dark:text-green-400'
    }

    const isClosable = announcement.closable !== false

    return (
        <div className='w-full p-2'>
            <div className={`w-full border ${bgColorMap[announcement.type]} rounded-lg shadow-sm overflow-hidden`}>
                <div className="relative p-4 md:px-6">
                    {isClosable && (
                    <button
                        onClick={handleClose}
                        className={`absolute top-2 right-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${iconColorMap[announcement.type]}`}
                        aria-label="Duyuruyu kapat"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    )}

                    <div className="flex flex-col md:flex-row gap-4 items-center">
                    {announcement.image ? (
                        <div className="flex-shrink-0">
                        <Image
                            src={announcement.image}
                            alt={announcement.title || 'Duyuru'}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                        />
                        </div>
                    ) : (
                        <div className={`flex-shrink-0 ${iconColorMap[announcement.type]}`}>
                        {announcement.type === 'info' && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        {announcement.type === 'warning' && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        )}
                        {announcement.type === 'success' && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        </div>
                    )}

                    <div className="flex-1 text-center md:text-left">
                        {announcement.title && (
                        <h3 className={`text-lg font-bold mb-2 ${textColorMap[announcement.type]}`}>
                            {announcement.title}
                        </h3>
                        )}
                        <p className={`text-sm md:text-base ${textColorMap[announcement.type]}`}>
                        {announcement.message}
                        </p>
                        {announcement.link && (
                        <a
                            href={announcement.link}
                            className={`inline-block mt-3 px-4 py-2 rounded-lg font-semibold text-sm ${iconColorMap[announcement.type]} hover:underline transition-all`}
                        >
                            Detaylı Bilgi →
                        </a>
                        )}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}