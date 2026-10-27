import Link from 'next/link';
import Image from 'next/image';
import { COLORS } from '@/data/catalog.mjs';
import { JsonLd, breadcrumbLd, faqLd } from '@/lib/seo';

export function ProductCard({ product, priority = false }) {
  const first = product.colors[0];
  return (
    <Link href={`/products/${product.slug}`} className="card">
      <div className="card-img">
        <Image
          src={product.image(first)}
          alt={`${product.title} in ${first}`}
          width={600}
          height={600}
          sizes="(max-width: 600px) 50vw, 300px"
          priority={priority}
        />
      </div>
      <h3 className="card-title">{product.title}</h3>
      <div className="card-meta">
        <span className="card-price">${product.price}</span>
        {product.colors.length > 1 && (
          <span className="swatches" aria-label={`${product.colors.length} colors`}>
            {product.colors.map((c) => (
              <i key={c} style={{ background: COLORS[c].hex }} />
            ))}
          </span>
        )}
      </div>
    </Link>
  );
}

export function ProductGrid({ products, priorityCount = 0 }) {
  return (
    <div className="grid">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={it.path}>
            {i < items.length - 1 ? <Link href={it.path}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbLd(items)} />
    </nav>
  );
}

export function Faq({ items, title = 'Questions' }) {
  if (!items?.length) return null;
  return (
    <section className="section">
      <h2 className="section-title" style={{ marginBottom: 16 }}>
        {title}
      </h2>
      <div className="faq">
        {items.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqLd(items)} />
    </section>
  );
}

// Renders the {h, p, list, table} blocks used by guides and info pages.
export function Blocks({ blocks }) {
  return blocks.map((b, i) => (
    <div key={i}>
      {b.h && <h2>{b.h}</h2>}
      {b.p?.map((t, j) => <p key={j}>{t}</p>)}
      {b.list && (
        <ul>
          {b.list.map((t, j) => (
            <li key={j}>{t}</li>
          ))}
        </ul>
      )}
      {b.table && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {b.table[0].map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.table.slice(1).map((row, r) => (
                <tr key={r}>
                  {row.map((c, k) => (
                    <td key={k}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  ));
}
