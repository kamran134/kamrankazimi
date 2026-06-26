'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { getText } from '@/lib/i18n';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.04)',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 400,
  letterSpacing: '0.021em',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-acronym)',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '#9a9a9a',
  marginBottom: '6px',
};

export default function ContactForm() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to send message');

      setStatus({
        type: 'success',
        message: getText({
          az: 'Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.',
          ru: 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.',
          en: "Your message has been sent successfully! We'll get back to you soon.",
        }, lang),
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus({
        type: 'error',
        message: getText({
          az: 'Mesaj göndərilərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
          ru: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.',
          en: 'An error occurred while sending your message. Please try again.',
        }, lang),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {status && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '13px',
            letterSpacing: '0.021em',
            border: `1px solid ${status.type === 'success' ? 'rgba(21,132,110,0.4)' : 'rgba(255,80,80,0.35)'}`,
            color: status.type === 'success' ? '#15846e' : '#ff6b6b',
            background:
              status.type === 'success' ? 'rgba(21,132,110,0.08)' : 'rgba(255,80,80,0.08)',
          }}
        >
          {status.message}
        </div>
      )}

      <div>
        <label style={labelStyle}>
          {getText({ az: 'Ad', ru: 'Имя', en: 'Name' }, lang)} *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={getText({ az: 'Adınız', ru: 'Ваше имя', en: 'Your name' }, lang)}
          style={inputStyle}
          onFocus={e => { e.currentTarget.style.borderColor = '#8052ff'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        />
      </div>

      <div>
        <label style={labelStyle}>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="email@example.com"
          style={inputStyle}
          onFocus={e => { e.currentTarget.style.borderColor = '#8052ff'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        />
      </div>

      <div>
        <label style={labelStyle}>
          {getText({ az: 'Mövzu', ru: 'Тема', en: 'Subject' }, lang)}
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={getText({ az: 'Mövzu (ixtiyari)', ru: 'Тема (необязательно)', en: 'Subject (optional)' }, lang)}
          style={inputStyle}
          onFocus={e => { e.currentTarget.style.borderColor = '#8052ff'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        />
      </div>

      <div>
        <label style={labelStyle}>
          {getText({ az: 'Mesaj', ru: 'Сообщение', en: 'Message' }, lang)} *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder={getText({ az: 'Mesajınız...', ru: 'Ваше сообщение...', en: 'Your message...' }, lang)}
          style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={e => { e.currentTarget.style.borderColor = '#8052ff'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          background: submitting ? 'rgba(128,82,255,0.5)' : '#8052ff',
          color: '#ffffff',
          padding: '14px 24px',
          borderRadius: '24px',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          border: 'none',
          cursor: submitting ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-acronym)',
          transition: 'opacity 0.2s',
        }}
      >
        {submitting
          ? getText({ az: 'Göndərilir...', ru: 'Отправка...', en: 'Sending...' }, lang)
          : getText({ az: 'Mesaj Göndər', ru: 'Отправить сообщение', en: 'Send Message' }, lang)}
      </button>
    </form>
  );
}
