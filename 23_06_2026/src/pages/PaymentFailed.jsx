import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="status-failed-card-box mx-auto">
      <div className="status-failed-icon-wrapper">
        <div className="status-failed-icon-circle">
          <span className="material-symbols-outlined !text-[48px]">error</span>
        </div>
      </div>
      
      <h1 className="status-failed-title">Ödeme Başarısız</h1>
      <p className="status-failed-subtitle">
        İşlemin sırasında bir hata oluştu. Kart bilgilerini kontrol edip tekrar deneyebilirsin.
      </p>
      
      <div className="status-failed-details-box">
        <div className="status-failed-details-header">
          <span className="material-symbols-outlined status-failed-info-icon">info</span>
          <span className="status-failed-info-title">Hata Detayı</span>
        </div>
        <code className="status-failed-code">
          ERR_DECLINED_BY_BANK: 3D Secure Doğrulaması Başarısız (Kod: 1024)
        </code>
      </div>
      
      <div className="flex-col-stretch">
        <button onClick={() => navigate('/courses')} className="status-failed-btn-retry">
          <span className="material-symbols-outlined text-[20px]">refresh</span>
          <span>Tekrar Dene</span>
        </button>
        <button onClick={() => navigate('/contact')} className="status-failed-btn-support">
          <span className="material-symbols-outlined text-[20px]">support_agent</span>
          <span>Destek Al</span>
        </button>
      </div>
      
      <div className="status-failed-solutions-box mx-auto">
        <h3 className="status-failed-solutions-title">Yaygın Çözümler</h3>
        <ul className="text-left space-y-3">
          <li className="flex-start-gap">
            <span className="material-symbols-outlined status-failed-check-icon">check_circle</span>
            <span className="text-body-md text-on-surface-variant">Kartınızın internet alışverişlerine açık olduğundan emin olun.</span>
          </li>
          <li className="flex-start-gap">
            <span className="material-symbols-outlined status-failed-check-icon">check_circle</span>
            <span className="text-body-md text-on-surface-variant">Yetersiz bakiye durumunu kontrol edin.</span>
          </li>
          <li className="flex-start-gap">
            <span className="material-symbols-outlined status-failed-check-icon">check_circle</span>
            <span className="text-body-md text-on-surface-variant">Başka bir ödeme yöntemi kullanmayı deneyin.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
