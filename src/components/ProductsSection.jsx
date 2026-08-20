import { useState } from 'react'
import { asset } from '../utils/paths.js'
import Carousel from './Carousel.jsx'

function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false)

  return (
    <article className="card product-card">
      <div className="product-card__image-wrap">
        {!imgError ? (
          <img
            src={asset(`assets/images/products/${product.image}`)}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="image-placeholder" aria-hidden="true">
            <span>{product.name.charAt(0)}</span>
          </div>
        )}
        {product.category && <span className="product-card__category">{product.category}</span>}
      </div>
      <div className="card__body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
    </article>
  )
}

export default function ProductsSection({ products }) {
  return (
    <section id="products" className="products">
      <div className="section-heading">
        <h2>Our Products</h2>
        <p>Precision-engineered surgical instruments, sourced and tested to the highest standards.</p>
      </div>

      {products.length === 0 ? (
        <p className="empty-state">Add products to public/data/products.json to see them here.</p>
      ) : products.length === 1 ? (
        <div className="products__single">
          <ProductCard product={products[0]} />
        </div>
      ) : (
        <Carousel
          items={products}
          ariaLabel="Products"
          renderItem={(product) => <ProductCard product={product} />}
        />
      )}
    </section>
  )
}
