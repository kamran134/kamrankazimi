'use client';

import { useState } from 'react';
import { useLanguage } from "@/lib/LanguageContext";
import { getText } from "@/lib/i18n";

export default function ContactForm() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus({
        type: 'success',
        message: getText({
          az: "Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.",
          ru: "Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.",
          en: "Your message has been sent successfully! We'll get back to you soon."
        }, lang)
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch {
      setStatus({
        type: 'error',
        message: getText({
          az: "Mesaj göndərilərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
          ru: "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.",
          en: "An error occurred while sending your message. Please try again."
        }, lang)
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status && (
        <div className={`p-4 rounded-lg ${
          status.type === 'success' 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-400'
            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-400'
        }`}>
          {status.message}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {getText({az: "Ad", ru: "Имя", en: "Name"}, lang)} *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={getText({az: "Adınız", ru: "Ваше имя", en: "Your name"}, lang)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={getText({az: "email@example.com", ru: "email@example.com", en: "email@example.com"}, lang)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {getText({az: "Mövzu", ru: "Тема", en: "Subject"}, lang)}
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={getText({az: "Mövzu (ixtiyari)", ru: "Тема (необязательно)", en: "Subject (optional)"}, lang)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {getText({az: "Mesaj", ru: "Сообщение", en: "Message"}, lang)} *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={getText({az: "Mesajınız...", ru: "Ваше сообщение...", en: "Your message..."}, lang)}
        ></textarea>
      </div>
      
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting 
          ? getText({az: "Göndərilir...", ru: "Отправка...", en: "Sending..."}, lang)
          : getText({az: "Mesaj Göndər", ru: "Отправить сообщение", en: "Send Message"}, lang)
        }
      </button>
    </form>
  );
}
