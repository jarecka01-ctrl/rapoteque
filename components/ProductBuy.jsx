'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartProvider';

// Gallery + options + add to cart. Receives only plain, serializable props.
export default function ProductBuy({ slug, title, price, colors, sizes, sizeGuide, children }) {
  const { add, lastAdded } = useCart();
  const [color, setColor] = useState(colors[0].name);
  const [size, setSize] = useState(sizes.length === 1 ? sizes[0] : null);
  const [warn, setWarn] = useState(false);
  const current = colors.find((c) => c.name === color);
  const justAdded = lastAdded && lastAdded.slug === slug;

  function onAdd() {
    if (!size) {
      setWarn(true);
      return;
    }
    add({ slug, title, price, color, size, image: current.image });
  }

  return (
    <div className="pdp">
      <div className="pdp-gallery">
        <div className="pdp-main-img">
          <Image
            src={current.image}
            alt={`${title} in ${color}`}
            width={1000}
            height={1000}
            sizes="(max-width: 900px) 100vw, 640px"
            priority
          />
        </div>
        {colors.length > 1 && (
          <div className="pdp-thumbs">
            {colors.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-pressed={c.name === color}
                aria-label={`Show ${c.name}`}
                onClick={() => setColor(c.name)}
              >
                <Image src={c.image} alt="" width={156} height={156} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="pdp-title">{title}</h1>
        <p className="pdp-price">${price}</p>

        {colors[0].name !== 'Print' && (
          <>
            <p className="opt-label">
              <span>Color: {color}</span>
            </p>
            <div className="opts" role="group" aria-label="Color">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className="opt opt--color"
                  aria-pressed={c.name === color}
                  onClick={() => setColor(c.name)}
                >
                  <i style={{ background: c.hex }} />
                  {c.name}
                </button>
              ))}
            </div>
          </>
        )}

        <p className="opt-label">
          <span>Size{size ? `: ${size}` : ''}</span>
          {sizeGuide && <Link href="/size-guide">Size guide</Link>}
        </p>
        <div className="opts" role="group" aria-label="Size">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              className="opt"
              aria-pressed={s === size}
              onClick={() => {
                setSize(s);
                setWarn(false);
              }}
            >
              {s}
            </button>
          ))}
        </div>
        {warn && (
          <p role="alert" className="notice" style={{ marginTop: -8, marginBottom: 16 }}>
            Choose a size to add this to your cart.
          </p>
        )}

        <button type="button" className="btn btn--ink btn--block" onClick={onAdd}>
          Add to cart, ${price}
        </button>
        {justAdded && (
          <p className="added-note" role="status">
            Added to cart. <Link href="/cart">View cart</Link>
          </p>
        )}

        {children}
      </div>
    </div>
  );
}
