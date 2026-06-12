import React from "react";

const UrunKarti = (props) => {
  return (
    <div className="card">
      <h4 className="font-bold">{props.ad}</h4>
      <p className="text-gray-600">Fiyat:{props.fiyat}TL</p>
      <p className="text-sm">Stokta:{props.stoktaVar ? "Var" : "Yok"}</p>
    </div>
  );
};

const Demo3PropsBasic = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 3 Props Kullanımı</h3>
      <div className="product-grid">
        <UrunKarti ad="Laptop" fiyat={1500} stoktaVar={true} />
        <UrunKarti ad="Telefon" fiyat={500} stoktaVar={true} />
        <UrunKarti ad="Kulaklık" fiyat={1500} stoktaVar={true} />
      </div>
    </div>
  );
};

export default Demo3PropsBasic;
