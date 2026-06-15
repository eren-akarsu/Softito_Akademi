import { useState } from 'react';

const DynamicFormFields = () => {
  const [yetenekler, setYetenekler] = useState([
    { id: 1, ad: "React", seviye: "Orta" }
  ]);

  const yetenekEkle = () => {
    setYetenekler([
      ...yetenekler,
      { id: Date.now(), ad: "", seviye: "Başlangıç" }
    ]);
  };

  const yetenekSil = (id) => {

    if (yetenekler.length === 1) {
      alert("En az bir yetenek alanı bulunmalıdır.");
      return;
    }
    setYetenekler(yetenekler.filter(y => y.id !== id));
  };

  const yetenekGuncelle = (id, field, value) => {
    setYetenekler(
      yetenekler.map(y => y.id === id ? { ...y, [field]: value } : y)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gönderilen Yetenekler:", yetenekler);
    alert("Yetenekler kaydedildi. Console log'u kontrol edin.");
  };

  return (
    <div className="p-4">
      <h3 className="demo-title">Demo 9: Dinamik Form Alanları (Dynamic Form Fields)</h3>
      <p className="demo-desc">
        Kullanıcının form üzerinde dinamik olarak yeni satırlar eklemesine veya silmesine imkan tanımak için dizi state'leri ile form girdileri map edilerek yönetilir.
      </p>

      <div className="demo-card demo-card-2xl">
        <div className="card-header-list pb-2 mb-4">
          <h4 className="demo-section-title">Yetenekleriniz</h4>
          <button
            type="button"
            onClick={yetenekEkle}
            className="btn-blue-outline-xs"
          >
            + Yeni Yetenek Ekle
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {yetenekler.map((y, index) => (
            <div key={y.id} className="demo-dyn-row">
              <span className="demo-dyn-num">{index + 1}.</span>

              <input
                type="text"
                value={y.ad}
                onChange={(e) => yetenekGuncelle(y.id, "ad", e.target.value)}
                placeholder="Yetenek adı (Örn: CSS, SQL)"
                className="demo-input"
                required
              />

              <select
                value={y.seviye}
                onChange={(e) => yetenekGuncelle(y.id, "seviye", e.target.value)}
                className="demo-select w-32"
              >
                <option value="Başlangıç">Başlangıç</option>
                <option value="Orta">Orta</option>
                <option value="İleri">İleri</option>
              </select>

              <button
                type="button"
                onClick={() => yetenekSil(y.id)}
                className="btn-delete-dyn"
              >
                Sil
              </button>
            </div>
          ))}

          <div className="demo-form-actions-row">
            <button
              type="submit"
              className="btn-blue-submit-lg"
            >
              Yetenekleri Kaydet
            </button>
          </div>
        </form>

        <div className="demo-code-footer mt-4 pt-3">
          <strong>Anlık Dinamik State:</strong>
          <pre className="demo-pre-dark">
            {JSON.stringify(yetenekler, null, 2)}
          </pre>
        </div>
      </div>

      <div className="demo-note">
        <h4 className="demo-note-title">💡 Öğrenim Notu:</h4>
        <ul className="demo-note-list">
          <li>Dinamik satırlarda veri güncellerken ilgili satırın <code>id</code> bilgisi parametre olarak gönderilir ve dizi map edilerek güncellenir.</li>
          <li>Girdilerin benzersiz kalması ve render performansının korunması için <code>key</code> özelliğine mutlaka satıra ait benzersiz <code>id</code> atanmalıdır.</li>
        </ul>
      </div>
    </div>
  );
};

export default DynamicFormFields;