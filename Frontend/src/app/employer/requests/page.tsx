'use client';

import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Splash from "@/components/common/Splash";

const FeedbackForm = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    candidateNo: ''
  });
  
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchUserInfo
    
    // Örnek veri
    setTimeout(() => {
      setUserInfo({
        fullName: 'Mert FINDIK',
        candidateNo: '0012431586086'
      });
      setLoading(false);
    }, 500);
  }, []);

  const handleSubmit = () => {
    if (!message.trim()) {
      toast.error('Lütfen mesajınızı yazınız.');
      return;
    }

    setIsSubmitting(true);
    
    // await submitFeedback({ ...userInfo, message });
    
    setTimeout(() => {
      toast.success('Mesajınız başarıyla gönderildi!');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  if (loading) {
    return <Splash fullScreen message="CV verileri yükleniyor..." />;
  }   

  return (
    <div className="rounded-lg p-2">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Ad Soyad
          </label>
          <input
            type="text"
            value={userInfo.fullName}
            disabled
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Aday No
          </label>
          <input
            type="text"
            value={userInfo.candidateNo}
            disabled
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            İstek, Şikayet veya Öneri *
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px] resize-y"
            placeholder="Mesajınızı buraya yazınız..."
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-green-600 dark:bg-green-800 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <Send size={20} />
          {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;