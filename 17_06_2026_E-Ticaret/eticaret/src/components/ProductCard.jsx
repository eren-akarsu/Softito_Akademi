export default function ProductCard({ product }) {
  return (
    <>
      <div className="product-card">
        <div className="product-img-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-img"
          />
        </div>
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-title">{product.title}</h3>
          <div className="product-rating">
            <span>*</span>
            <span>{product.rating}</span>
            <span className="text-gray-400">({product.ratingCount})</span>
          </div>
          <div className="product-price-container">
            <span className="product-price">{product.price} TL</span>
            <button className="product-btn">
              <span>+</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
