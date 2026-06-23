import React from 'react';

export default function Contact() {
  return (
    <div className="contact-main-wrapper">
      <section className="contact-hero-section">
        <h2 className="text-display-lg text-primary">Bize Ulaşın</h2>
        <p className="contact-hero-desc">
          Öğrenme yolculuğunuzda size destek olmak için buradayız. Sorularınız, önerileriniz veya teknik destek ihtiyaçlarınız için bizimle iletişime geçebilirsiniz.
        </p>
      </section>

      <div className="contact-grid-layout">
        <div className="lg:col-span-7">
          <div className="contact-faq-box">
            <h3 className="text-headline-lg text-primary">Sıkça Sorulan Sorular</h3>
            <div className="space-y-sm">
              <div className="contact-faq-item">
                <div className="contact-faq-question-row">
                  <span className="contact-faq-question-text">Eğitimlere nasıl erişebilirim?</span>
                </div>
                <p className="font-body-md text-on-surface-variant">
                  Kaydolduktan sonra "Eğitimlerim" sekmesi üzerinden tüm aktif kurslarınıza 7/24 erişim sağlayabilirsiniz.
                </p>
              </div>

              <div className="contact-faq-item">
                <div className="contact-faq-question-row">
                  <span className="contact-faq-question-text">Sertifika alabiliyor muyum?</span>
                </div>
                <p className="font-body-md text-on-surface-variant">
                  Evet, her kursu başarıyla tamamladığınızda adınıza düzenlenen dijital başarı sertifikasına profilinizden erişebilirsiniz.
                </p>
              </div>

              <div className="contact-faq-item">
                <div className="contact-faq-question-row">
                  <span className="contact-faq-question-text">Ödeme yöntemleri nelerdir?</span>
                </div>
                <p className="font-body-md text-on-surface-variant">
                  Tüm kredi ve banka kartları ile güvenli ödeme yapabilirsiniz. Ayrıca taksit seçeneklerimiz de mevcuttur.
                </p>
              </div>
            </div>
          </div>

          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="contact-info-icon-circle">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <h4 className="text-label-lg text-primary">E-posta</h4>
                <p className="text-body-md text-on-surface-variant">destek@eduflow.com</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon-circle">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div>
                <h4 className="text-label-lg text-primary">Telefon</h4>
                <p className="text-body-md text-on-surface-variant">+90 212 555 00 00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="contact-form-box">
            <h3 className="text-headline-lg text-primary">Mesaj Gönderin</h3>
            <form 
              className="space-y-md"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Mesajınız başarıyla gönderildi!');
                e.target.reset();
              }}
            >
              <div className="space-y-xs">
                <label className="text-label-md text-on-surface-variant" htmlFor="name">Ad Soyad</label>
                <input className="text-input-field" id="name" placeholder="Adınız ve soyadınız" required type="text" />
              </div>
              <div className="space-y-xs">
                <label className="text-label-md text-on-surface-variant" htmlFor="email">E-posta</label>
                <input className="text-input-field" id="email" placeholder="örnek@eposta.com" required type="email" />
              </div>
              <div className="space-y-xs">
                <label className="text-label-md text-on-surface-variant" htmlFor="subject">Konu</label>
                <select className="text-input-field bg-white" id="subject">
                  <option value="support">Teknik Destek</option>
                  <option value="billing">Ödemeler ve Faturalandırma</option>
                  <option value="course">Kurs İçerikleri</option>
                  <option value="other">Diğer</option>
                </select>
              </div>
              <div className="space-y-xs">
                <label className="text-label-md text-on-surface-variant" htmlFor="message">Mesajınız</label>
                <textarea className="contact-textarea-field" id="message" placeholder="Sorunuzu veya mesajınızı buraya yazın..." required rows="4"></textarea>
              </div>
              <button className="contact-submit-btn" type="submit">
                <span>Mesaj Gönder</span>
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
