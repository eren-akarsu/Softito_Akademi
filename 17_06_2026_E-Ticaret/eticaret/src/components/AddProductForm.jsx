import { useForm } from "react-hook-form";
export default function AddProductForm({ categories, setView, onAddProduct }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    onAddProduct(data);
    reset();
    setView("home");
  };
  return (
    <>
      <main className="container">
        <div className="form-layout">
          <h2 className="form-title">Yeni Ürün Ekle</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label">Ürün Adı</label>
              <input
                className="form-input"
                type="text"
                placeholder="Örn:Kablosuz Klavye"
                {...register("title", {
                  required: "Ürün adı zorunludur",
                  minLength: {
                    value: 3,
                    message: "Ürün adı en az 3 karakter olmalıdır",
                  },
                })}
              />
              {errors.title && (
                <span className="form-error">{errors.title.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Kategori</label>
              <select
                className="form-select"
                {...register("category", {
                  required: "Kategori seçimi zorunludur",
                })}
              >
                <option value="">Seçiniz</option>
                {categories
                  .filter((c) => c !== "Tümü")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
              {errors.category && (
                <span className="form-error">{errors.category.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Görsel URL </label>
              <input
                type="text"
                placeholder="https://"
                className="form-input"
                {...register("image", {
                  required: "Görsel URL zorunludur.",
                })}
              />
              {errors.image && (
                <span className="form-error">{errors.image.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Fiyat (TL)</label>
              <input
                type="number"
                placeholder="Örn: 1450"
                className="form-input"
                {...register("price", {
                  required: "Fiyat Zorunludur",
                  min: {
                    value: 1,
                    message: "Fiyat 0'dan büyük olmalıdır",
                  },
                })}
              />
              {errors.price && (
                <span className="form-error">{errors.price.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Açıklama</label>
              <textarea
                className="form-textarea"
                placeholder="Ürün Detayları..."
                {...register("description", {
                  required: "Açıklama Zorunludur",
                  minLength: {
                    value: 10,
                    message: "Açıklama en az 10 karakter olmalıdır",
                  },
                })}
              />
              {errors.description && (
                <span className="form-error">{errors.description.message}</span>
              )}
            </div>

            <button className="form-submit" type="submit">
              Ürünü Kaydet
            </button>
            <span className="form-toggle-btn" onClick={()=>{reset();setView('home')}}>Geri Dön</span>
          </form>
        </div>
      </main>
    </>
  );
}
