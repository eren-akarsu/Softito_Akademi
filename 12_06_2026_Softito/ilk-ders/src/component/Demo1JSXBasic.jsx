import React from "react";

const Demo1JSXBasic = () => {
const dersAdi = "React dersi";
const ogrenciSayisi = 24;
const aktifMi = true;
const dersYili = 2026;

return (
    <div className="p-4">
        <h3 className="text-xl font-bold">Demo1: Temel JSX Kullanımı</h3>

    <div className="mt-4">
        <p className="border-b "><strong>Ders Adı:</strong>{dersAdi}</p>
        <p className="border-b "><strong>Öğrenci Sayısı:</strong>{ogrenciSayisi}</p>
        <p className="border-b "><strong>İşlem:</strong>{2+2}</p>
        <p className="border-b "><strong>Ders Yılı:</strong>{dersAdi}</p>
        <p className="border-b "><strong>Ders Adı:</strong>{dersAdi.toUpperCase()}</p>
        <p className="border-b "><strong>Ders Durum:</strong>{aktifMi ? "Aktif":"Pasif"}</p>
    </div>



    </div>
)
}

export default Demo1JSXBasic