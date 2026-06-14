import React from "react";

const Kart = (props) => {
  return <div className="card">{props.children}</div>;
};

const Demo4PropsChildren = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 4 Props Children Kullanımı</h3>
      <div className="product-grid">
        <Kart>
          <h4 className="font-bold">Kart:1 Başlık</h4>
          <p className="text-sm">Birinci Kartın İçerik Metni</p>
        </Kart>

        <Kart>
          <h4 className="font-bold">Kart 2 Başlık</h4>
          <button className="btn-blue">Kart Butonu</button>
        </Kart>
      </div>
    </div>
  );
};
export default Demo4PropsChildren;
