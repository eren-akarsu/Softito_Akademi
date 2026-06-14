import React from "react";

const UrunKutusu = (props) => {
  return (
    <div className="card">
      <h4 className="font-bold">{props.ad}</h4>
      <div className="mt-2">
        {props.stokAdeti > 0 ? (
          <span className="badge-success">
            Stokta Var ({props.stokAdeti}) adet
          </span>
        ) : (
          <span className="badge-danger">Stokta Yok - Tükendi</span>
        )}
      </div>

      <div className="mt-2">
        {props.indirimdeMi && (
          <span className="badge-danger">Kampanyali Urun</span>
        )}
      </div>
    </div>
  );
};

const Demo5Rendering = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 5: Koşullu render</h3>
      <div className="product-grid">
        <UrunKutusu ad="Televizyon" stokAdeti={5} indirimdeMi={true} />
        <UrunKutusu ad="Buzdolabı" stokAdeti={0} indirimdeMi={false} />
        <UrunKutusu ad="Mikrodalga" stokAdeti={2} indirimdeMi={true} />
      </div>
    </div>
  );
};
export default Demo5Rendering;
