import { useState } from 'react';

const MultipleInputs = () => {
  const [formVerileri, setFormVerileri] = useState({
    urunAdi: "",
    fiyat: "",
    kategori: "Elektronik",
    stok: "",
    hizliKargo: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const guncelDeger = type === "checkbox" 
      ? checked 
      : type === "number" 
        ? (value === "" ? "" : Number(value)) 
        : value;

    setFormVerileri(prev => ({
      ...prev,
      [name]: guncelDeger
    }));
  };

  const formuSifirla = () => {
    setFormVerileri({
      urunAdi: "",
      fiyat: "",
      kategori: "Elektronik",
      stok: "",
      hizliKargo: false
    });
  };

  return (
    <div className="p-4">
      <h3 className="demo-title">Demo 5: Tek State ile Çoklu Input Yönetimi</h3>
      <p className="demo-desc">
        Formda çok sayıda girdi varsa, her birine ayrı <code>useState</code> açmak yerine tek bir nesne state'i ve girdilerin <code>name</code> özellikleri kullanılarak dinamik yönetim sağlanır.
      </p>

      <div className="demo-card-layout-grid max-w-3xl">
        {/* Dinamik Form */}
        <div className="demo-card demo-card-3xl space-y-4">
          <h4 className="card-title-bordered">Ürün Bilgileri Ekle</h4>

          <div>
            <label className="demo-label">Ürün Adı:</label>
            <input
              type="text"
              name="urunAdi"
              value={formVerileri.urunAdi}
              onChange={handleInputChange}
              placeholder="Örn: Kablosuz Mouse"
              className="demo-input"
            />
          </div>

          <div className="demo-grid-2">
            <div>
              <label className="demo-label">Fiyat (TL):</label>
              <input
                type="number"
                name="fiyat"
                value={formVerileri.fiyat}
                onChange={handleInputChange}
                placeholder="0"
                className="demo-input"
              />
            </div>
            <div>
              <label className="demo-label">Stok Adedi:</label>
              <input
                type="number"
                name="stok"
                value={formVerileri.stok}
                onChange={handleInputChange}
                placeholder="0"
                className="demo-input"
              />
            </div>
          </div>

          <div>
            <label className="demo-label">Kategori:</label>
            <select
              name="kategori"
              value={formVerileri.kategori}
              onChange={handleInputChange}
              className="demo-select"
            >
              <option value="Elektronik">Elektronik</option>
              <option value="Aksesuar">Aksesuar</option>
              <option value="Ev-Yasam">Ev & Yaşam</option>
              <option value="Kitap">Kitap</option>
            </select>
          </div>

          <div className="pt-1">
            <label className="demo-checkbox-label">
              <input
                type="checkbox"
                name="hizliKargo"
                checked={formVerileri.hizliKargo}
                onChange={handleInputChange}
                className="todo-checkbox"
              />
              <span className="demo-checkbox-text">Hızlı Kargo Seçeneği Aktif</span>
            </label>
          </div>

          <button
            onClick={formuSifirla}
            className="btn-gray-full mt-2"
          >
            Formu Temizle
          </button>
        </div>

        {/* Canli State Gosterici */}
        <div className="demo-card demo-card-3xl demo-amber-card">
          <div>
            <span className="badge-amber-mini">
              Canlı State İzleyici
            </span>
            <h4 className="demo-section-title">JSON Formatında State Durumu:</h4>
            <pre className="demo-pre-amber">
              {JSON.stringify(formVerileri, null, 2)}
            </pre>
          </div>

          <div className="demo-info-panel-amber space-y-1.5">
            <div><strong>Ürün:</strong> {formVerileri.urunAdi || "Girilmedi"}</div>
            <div><strong>Fiyat:</strong> {formVerileri.fiyat ? `${formVerileri.fiyat} TL` : "Girilmedi"}</div>
            <div><strong>Hızlı Kargo:</strong> {formVerileri.hizliKargo ? "Evet (Ücretsiz)" : "Hayır"}</div>
          </div>
        </div>
      </div>

      <div className="demo-note">
        <h4 className="demo-note-title">💡 Öğrenim Notu:</h4>
        <ul className="demo-note-list">
          <li>Girdilerin <code>name</code> özellikleri, state nesnesindeki anahtar (key) isimleriyle tam olarak aynı olmalıdır (Örn: <code>name="urunAdi"</code>).</li>
          <li><code>{"setFormVerileri(prev => ({ ...prev, [name]: value }))"}</code> yazımı ES6'nın dinamik nesne anahtarı (computed property name) özelliğini kullanır.</li>
        </ul>
      </div>
    </div>
  );
};

export default MultipleInputs;