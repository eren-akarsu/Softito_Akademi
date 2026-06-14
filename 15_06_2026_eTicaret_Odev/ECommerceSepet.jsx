import React, { useState } from "react";

const urunler = [
  { id: 1, ad: "Yedek Kablosuz Klavye", kategori: "Aksesuar", fiyat: 750, stok: 12 },
  { id: 2, ad: "Yedek Oyuncu Faresi", kategori: "Aksesuar", fiyat: 600, stok: 5 },
  { id: 3, ad: "Yedek Full HD Monitor", kategori: "Ekran", fiyat: 3200, stok: 3 },
  { id: 4, ad: "Yedek Bluetooth Kulaklik", kategori: "Ses", fiyat: 850, stok: 8 },
  { id: 5, ad: "Yedek Harici Disk", kategori: "Depolama", fiyat: 1100, stok: 6 },
];

const kategoriler = ["Tumu", "Aksesuar", "Ekran", "Ses", "Depolama"];

export default function ECommerceSepet() {
  const [arama, setArama] = useState("");
  const [seciliKategori, setSeciliKategori] = useState("Tumu");
  const [sepet, setSepet] = useState([]);

  const filtrelenmisUrunler = urunler.filter((urun) => {
    const kategoriUyuyor = seciliKategori === "Tumu" || urun.kategori === seciliKategori;
    const aramaUyuyor = urun.ad.toLowerCase().includes(arama.toLowerCase());
    return kategoriUyuyor && aramaUyuyor;
  });

  const sepeteEkle = (urun) => {
    setSepet((onceki) => {
      const mevcut = onceki.find((item) => item.id === urun.id);
      if (mevcut) {
        return onceki.map((item) =>
          item.id === urun.id ? { ...item, adet: item.adet + 1 } : item
        );
      }
      return [...onceki, { ...urun, adet: 1 }];
    });
  };

  const adetArttir = (id) => {
    setSepet((onceki) =>
      onceki.map((item) => (item.id === id ? { ...item, adet: item.adet + 1 } : item))
    );
  };

  const adetAzalt = (id) => {
    setSepet((onceki) =>
      onceki
        .map((item) => (item.id === id ? { ...item, adet: item.adet - 1 } : item))
        .filter((item) => item.adet > 0)
    );
  };

  const urunSil = (id) => {
    setSepet((onceki) => onceki.filter((item) => item.id !== id));
  };

  const sepetiTemizle = () => {
    setSepet([]);
  };

  const satinAl = () => {
    if (sepet.length === 0) {
      alert("Sepetiniz bos!");
      return;
    }
    alert("Satin alma islemi tamamlandi! Toplam: " + toplamTutar + " TL");
    setSepet([]);
  };

  const toplamTutar = sepet.reduce((toplam, item) => toplam + item.fiyat * item.adet, 0);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2>Urun Ara ve Filtrele</h2>

      <input
        type="text"
        placeholder="Urun adi ara..."
        value={arama}
        onChange={(e) => setArama(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          boxSizing: "border-box",
        }}
      />

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px", flexWrap: "wrap" }}>
        {kategoriler.map((kategori) => (
          <button
            key={kategori}
            onClick={() => setSeciliKategori(kategori)}
            style={{
              padding: "10px 20px",
              fontSize: "15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              cursor: "pointer",
              backgroundColor: seciliKategori === kategori ? "#2563eb" : "#f3f4f6",
              color: seciliKategori === kategori ? "#fff" : "#000",
              fontWeight: seciliKategori === kategori ? "bold" : "normal",
            }}
          >
            {kategori}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: "2", minWidth: "300px" }}>
          <h2>Urun Listesi</h2>

          {filtrelenmisUrunler.map((urun) => (
            <div
              key={urun.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "15px",
              }}
            >
              <h3 style={{ margin: "0 0 5px 0" }}>{urun.ad}</h3>
              <p style={{ margin: "0 0 5px 0", color: "#6b7280" }}>Kategori: {urun.kategori}</p>
              <p style={{ margin: "0 0 5px 0", color: "#2563eb", fontWeight: "bold" }}>
                Fiyat: {urun.fiyat} TL
              </p>
              <p
                style={{
                  display: "inline-block",
                  backgroundColor: "#d1fae5",
                  color: "#065f46",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                Stok: {urun.stok} adet
              </p>
              <br />
              <button
                onClick={() => sepeteEkle(urun)}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Sepete Ekle
              </button>
            </div>
          ))}

          {filtrelenmisUrunler.length === 0 && <p>Aramaniza uygun urun bulunamadi.</p>}
        </div>

        <div style={{ flex: "1", minWidth: "260px" }}>
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Sepetiniz</h2>

            {sepet.length === 0 && <p>Sepetiniz bos.</p>}

            {sepet.map((item) => (
              <div key={item.id} style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #e5e7eb" }}>
                <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>{item.ad}</p>
                <p style={{ margin: "0 0 8px 0", color: "#6b7280" }}>Fiyat: {item.fiyat} TL</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={() => adetAzalt(item.id)}
                    style={{ width: "30px", height: "30px", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", backgroundColor: "#f3f4f6" }}
                  >
                    -
                  </button>
                  <span>{item.adet}</span>
                  <button
                    onClick={() => adetArttir(item.id)}
                    style={{ width: "30px", height: "30px", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", backgroundColor: "#f3f4f6" }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => urunSil(item.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#dc2626",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginLeft: "auto",
                    }}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}

            <h3 style={{ marginBottom: "15px" }}>Toplam Tutar: {toplamTutar} TL</h3>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={sepetiTemizle}
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#f3f4f6",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Temizle
              </button>
              <button
                onClick={satinAl}
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#16a34a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Satin Al
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
