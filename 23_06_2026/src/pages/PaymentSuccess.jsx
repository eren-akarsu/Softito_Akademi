import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('id') || '';

  useEffect(() => {
    fetch('/courses.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.id === courseId);
        setCourse(found);
      });
  }, [courseId]);

  if (!course) {
    return <div className="py-xl text-center">Yükleniyor...</div>;
  }

  return (
    <div className="status-card-box mx-auto">
      <div className="status-icon-circle-success">
        <span className="material-symbols-outlined !text-6xl">check_circle</span>
      </div>
      
      <h1 className="status-headline">Ödeme Başarılı!</h1>
      
      <p className="status-subtitle">
        Kursun artık profilinde. Öğrenmeye hemen başlayabilirsin!
      </p>
      
      <div className="status-summary-box">
        <div className="status-summary-row-header">
          <span className="text-label-md text-on-surface-variant">Sipariş Numarası</span>
          <span className="text-label-lg text-primary">#EF-9824105</span>
        </div>
        <div className="status-summary-item">
          <div 
            className="status-summary-item-img"
            style={{ backgroundImage: `url('${course.image}')` }}
          ></div>
          <div className="flex-col-center-y">
            <span className="status-summary-item-title">{course.title}</span>
            <span className="text-caption text-on-surface-variant">Kayıt Tarihi: 22 Haziran 2026</span>
          </div>
        </div>
        <div className="status-summary-row-footer">
          <span className="text-label-md text-on-surface-variant">Toplam Ödeme</span>
          <span className="text-headline-md text-secondary">₺{course.price}</span>
        </div>
      </div>
      
      <div className="status-actions">
        <button onClick={() => navigate('/watch/' + course.id)} className="status-btn-primary">
          Eğitime Başla
        </button>
        <button onClick={() => navigate('/')} className="status-btn-secondary">
          Anasayfaya Dön
        </button>
      </div>
      
      <div className="status-footer">
        <div className="status-footer-badge">
          <span className="material-symbols-outlined !text-sm">verified_user</span>
          <span className="status-badge-text">Güvenli İşlem Tamamlandı</span>
        </div>
        <p className="text-caption text-outline">Faturanız e-posta adresinize gönderilmiştir.</p>
      </div>
    </div>
  );
}
