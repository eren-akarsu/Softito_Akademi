import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    fetch('/courses.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.id === id);
        setCourse(found);
      });
  }, [id]);

  const handlePurchase = () => {
    const enrolled = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
    if (!enrolled.includes(id)) {
      enrolled.push(id);
      localStorage.setItem('enrolled_courses', JSON.stringify(enrolled));
    }
    navigate('/payment-success?id=' + id);
  };

  if (!course) {
    return <div className="py-xl text-center">Yükleniyor...</div>;
  }

  return (
    <div className="payment-main-wrapper">
      <div className="payment-grid-layout">
        <div className="payment-left-col">
          <section>
            <h2 className="text-title-lg payment-section-title">Sipariş Özeti</h2>
            <div className="payment-summary-box">
              <div className="payment-summary-img-wrapper">
                <img 
                  className="payment-summary-img" 
                  src={course.image} 
                  alt={course.title}
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-label-lg payment-summary-title">{course.title}</h3>
                <p className="text-caption payment-summary-instructor">Eğitmen: {course.instructor.name}</p>
                <div className="flex-between">
                  <span className="text-headline-md text-secondary">₺{course.price}</span>
                  <span className="badge-tag">En Çok Satan</span>
                </div>
              </div>
            </div>
          </section>

          <section className="secure-badge-box">
            <div className="payment-security-badges">
              <div className="payment-security-badge-item">
                <span className="material-symbols-outlined text-success" style={{ color: '#2e7d32' }}>lock</span>
                <span className="text-caption">256-bit SSL Güvenlik</span>
              </div>
              <div className="payment-security-brands">
                <span className="text-caption font-bold">VISA</span>
                <span className="text-caption font-bold">Mastercard</span>
              </div>
            </div>
            <p className="text-caption text-on-surface-variant">
              Ödemeniz güvenli altyapımız tarafından işlenmektedir. Kişisel verileriniz EduFlow gizlilik politikası çerçevesinde korunur.
            </p>
          </section>
        </div>

        <div className="payment-right-col">
          <section>
            <h2 className="text-title-lg payment-section-title">Ödeme Yöntemi</h2>
            <div className="flex gap-md">
              <button 
                onClick={() => setPaymentMethod('card')}
                className={paymentMethod === 'card' ? 'payment-method-btn-active' : 'payment-method-btn'}
              >
                <span className="material-symbols-outlined payment-method-icon-active">credit_card</span>
                <span className="text-label-lg">Kredi Kartı</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('wallet')}
                className={paymentMethod === 'wallet' ? 'payment-method-btn-active' : 'payment-method-btn'}
              >
                <span className="material-symbols-outlined payment-method-icon">account_balance_wallet</span>
                <span className="text-label-lg">Dijital Cüzdan</span>
              </button>
            </div>
          </section>

          {paymentMethod === 'card' ? (
            <section className="space-y-md">
              <div>
                <label className="input-label">Kart Üzerindeki İsim</label>
                <input type="text" placeholder="AD SOYAD" className="text-input-field" />
              </div>
              <div>
                <label className="input-label">Kart Numarası</label>
                <div className="relative">
                  <input type="text" placeholder="0000 0000 0000 0000" className="text-input-field" />
                  <div className="payment-input-icon-wrapper">
                    <span className="material-symbols-outlined text-on-surface-variant">credit_card</span>
                  </div>
                </div>
              </div>
              <div className="payment-grid-cols-2">
                <div>
                  <label className="input-label">Son Kullanma Tarihi</label>
                  <input type="text" placeholder="AA / YY" className="text-input-field text-center" />
                </div>
                <div>
                  <label className="input-label">CVV</label>
                  <input type="password" placeholder="***" maxLength="3" className="text-input-field text-center" />
                </div>
              </div>
            </section>
          ) : (
            <section className="payment-wallet-box">
              <p className="text-body-md payment-wallet-text">Dijital cüzdan ile ödeme yapmak için yönlendirileceksiniz.</p>
            </section>
          )}

          <div className="payment-footer">
            <div className="payment-footer-container">
              <div className="payment-footer-row">
                <span className="text-body-md text-on-surface-variant">Toplam Tutar</span>
                <span className="text-headline-lg text-primary">₺{course.price}</span>
              </div>
              <div className="payment-footer-buttons">
                <button onClick={handlePurchase} className="btn-primary flex-grow">
                  <span>Ödemeyi Tamamla</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button onClick={() => navigate('/payment-failed')} className="btn-secondary">
                  <span>Başarısız Test</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
