import { useState } from "react";

const Toggle = () => {
    const [sifreGoster, setSifreGoster] = useState(false);
    const [geceModu, setGeceModu] = useState(false);
    const [girisSifre, setGirisSifre] = useState("password123");

    const sifretoggle = () => {
        setSifreGoster((prev) => !prev);
    };

    const modToggle = () => {
        setGeceModu((prev) => !prev);
    };

    return (
        <div className="p-4">
            <h3 className="demo-title">Demo 2: Mantıksal (boolean) State Yönetimi</h3>
            <div
                className={`demo - card demo-card-lg demo-toggle-card ${geceModu ? "demo-card-dark" : ""}`}
>
            <div className="card-header">
                <h4 className="font-bold">Örnek Panel</h4>
                <button onClick={modToggle} className="btn-togglemode">
                    {geceModu ? "Gündüz Modu" : "Gece Modu"}
                </button>
            </div>
            <div className="space-y-4">
                <div>
                    <label className={geceModu ? "demo-label demo-label-dark" : "demo-label"}>
                        Giriş Şifresi
                    </label>
                    <div className="relative">
                        <input type={sifreGoster ? "text" : "password"} value={girisSifre} onChange={(e) => setGirisSifre(e.target.value)} className={geceModu ? "demo-input demo-input-dark pr-20" : "demo-input pr-20"} />
                        <button type="button" onClick={sifretoggle} className="btn-password-toggle">
                            {sifreGoster ? "Gizle" : "Göster"}
                        </button>
                    </div>
                </div>
                <div className="demo-state-info">
                    <strong>Durum Bilgisi</strong>
                    <ul className="demo-info-list">
                        <li>Gece Modu: <code>{geceModu ? "Açık(true)" : "Kapalı(false)"}</code></li>
                        <li>Şifre Gösterimi <code>{sifreGoster ? "Açık" : "Kapalı"}</code></li>
                    </ul>
                </div>
            </div>
        </div>
</div >
);
};

export default Toggle;