import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-main-wrapper">
      <div className="profile-grid-layout">
        <div className="profile-left-col">
          <section className="profile-header-section">
            <div className="relative">
              <div className="profile-avatar-wrapper">
                <img 
                  className="profile-avatar-img" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCprEWk_kZAPZV1jJfqtPg5Cd1kVT3Aj-CL6M5hTSvd4WXoJ1sD5pV1kbWFEr3fmeizUGS9byEBtdw4PZgBmG1M2kYYrgB3W1l-covoCrS7tXkCpUulf-AO3rGlybbsFOA8Fh3AqP0BykXrWU-0gG5nNY686Y4D2k2dZ7f4a3gEbtDh1jssOIOitBAPCbnGmUAL8aaPFCvjy6E7MVacbroms5kS-bsdJ5XcgqiU481_mpvmV-4ghk-UQ9_X9NqMWQaJsgUPOQp_4_1" 
                  alt="Ahmet Yılmaz" 
                />
              </div>
              <div className="profile-avatar-edit-badge">
                <span className="material-symbols-outlined profile-edit-icon">edit</span>
              </div>
            </div>
            <div className="space-y-xs">
              <h2 className="text-headline-lg text-on-surface">Ahmet Yılmaz</h2>
              <p className="text-body-md text-on-surface-variant">Kıdemli Yazılım Geliştirici</p>
            </div>
            <button className="btn-primary w-full">
              Hesabı Düzenle
            </button>
          </section>
        </div>

        <div className="profile-right-col">
          <section className="profile-stats-grid">
            <div className="profile-stats-card">
              <span className="text-display-lg text-secondary">12</span>
              <span className="profile-stats-label">Alınan Kurslar</span>
            </div>
            <div className="profile-stats-card">
              <span className="text-display-lg text-secondary">3</span>
              <span className="profile-stats-label">Sertifikalar</span>
            </div>
          </section>

          <section className="profile-menu-container">
            <nav className="flex flex-col">
              <div className="profile-menu-item" onClick={() => alert('Hesap Ayarları yakında eklenecek!')}>
                <div className="flex-gap-md">
                  <div className="profile-menu-icon-wrapper">
                    <span className="material-symbols-outlined">settings</span>
                  </div>
                  <span className="text-title-lg text-on-surface">Hesap Ayarları</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </div>
              <hr className="mx-md border-outline-variant/30" />
              
              <div className="profile-menu-item" onClick={() => alert('Kayıtlı Kartlarım yakında eklenecek!')}>
                <div className="flex-gap-md">
                  <div className="profile-menu-icon-wrapper">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <span className="text-title-lg text-on-surface">Ödeme Yöntemleri</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </div>
              <hr className="mx-md border-outline-variant/30" />
              
              <div className="profile-menu-item" onClick={() => navigate('/contact')}>
                <div className="flex-gap-md">
                  <div className="profile-menu-icon-wrapper">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <span className="text-title-lg text-on-surface">İletişim & Destek</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </div>
              <hr className="mx-md border-outline-variant/30" />
              
              <div className="profile-menu-item-logout" onClick={() => {
                localStorage.removeItem('enrolled_courses');
                alert('Çıkış yapıldı (Kayıtlı kurslar sıfırlandı).');
                navigate('/');
              }}>
                <div className="flex-gap-md">
                  <div className="profile-menu-icon-wrapper-logout">
                    <span className="material-symbols-outlined">logout</span>
                  </div>
                  <span className="text-title-lg text-error">Çıkış Yap</span>
                </div>
              </div>
            </nav>
          </section>

          <div className="profile-footer-box">
            <p className="text-caption text-outline">Versiyon 2.4.0 • EduFlow Tech</p>
          </div>
        </div>
      </div>
    </div>
  );
}
