import { useState } from "react";

const Object = () => {
const [kullanici, setKullanici] = useState({
ad: "Ali",
soyad: "Veli",
eposta: "ali@veli.com",
yas: "50",
});

const adGuncelle = (yeniAd) => {
    setKullanici((prev) => ({
        ...prev,
        ad: yeniAd,
    }));
};

const soyadGuncelle = (yeniSoyad) => {
    setKullanici((prev) => ({
        ...prev,
        soyad: yeniSoyad,
    }));
};

const epostaGuncelle = (yeniEposta) => {
    setKullanici((prev) => ({
        ...prev,
        eposta: yeniEposta,
    }));
};

const yasGuncelle = (yeniYas) => {
    setKullanici((prev) => ({
        ...prev,
        yas: Number(yeniYas) || 0,
    }));
};

return (
    <div className="p-4">
        <h3 className="demo-title">Demo: 3 Nesne(Object) State Yönetimi</h3>
        <div className="demo-card-layout-grid max-w-3xl">
            <div className="demo-card demo-card-3xl space-y-4">
                <h4 className="card-title-bordered ">Profil Düzenle</h4>
                <div>
                    <label className="demo-label">Ad:</label>
                    <input
                        type="text"
                        value={kullanici.ad}
                        onChange={(e) => adGuncelle(e.target.value)}
                        className="demo-input"
                    />
                </div>
                <div>
                    <label className="demo-label">Soyad:</label>
                    <input
                        type="text"
                        value={kullanici.soyad}
                        onChange={(e) => soyadGuncelle(e.target.value)}
                        className="demo-input"
                    />
                </div>
                <div>
                    <label className="demo-label">E-posta:</label>
                    <input
                        type="text"
                        value={kullanici.eposta}
                        onChange={(e) => epostaGuncelle(e.target.value)}
                        className="demo-input"
                    />
                </div>

                <div>
                    <label className="demo-label">Yaş:</label>
                    <input
                        type="number"
                        value={kullanici.yas}
                        onChange={(e) => yasGuncelle(e.target.value)}
                        className="demo-input"
                    />
                </div>
            </div>
            <div className="demo-card demo-card-3xl demo-profile-card">
                <div>
                    <span className="badge-success mb-3">Canlı Profil Kartı</span>
                    <h4 className="demo-title">{kullanici.ad} {kullanici.soyad}</h4>
                    <div className="demo-state-info space-y-2">
                        <div>
                            <strong>Eposta</strong> {kullanici.eposta}
                        </div>
                        <div>
                            <strong>Yaş</strong> {kullanici.yas}
                        </div>
                    </div>
                    <div className="demo-code-footer">
                        <strong>Mevcut State Nesenesi (JSON)</strong>
                        <pre className="demo-pre">{JSON.stringify(kullanici, null, 2)}</pre>
                    </div>
                </div>

            </div>
        </div>
    </div>
);
};

export default Object;