import { useCopy } from '../../i18n/index.jsx'
import SectionHead from '../SectionHead.jsx'

export default function RateCard() {
  const { copy, f } = useCopy()
  const t = copy.rateCard

  return (
    <section className="section section--tinted" id="rates">
      <div className="container">
        <SectionHead index={4} eyebrow={t.eyebrow} title={t.title} desc={t.desc} />

        <div className="price-groups">
          {t.groups.map((group) => {
            // 상품이 하나뿐이고 이름이 그룹명과 같으면 제목 아래에 가격만 표시합니다.
            const single = group.items.length === 1 && group.items[0].name === group.title
            return (
              <article key={group.id} className={`price-group price-group--${group.id}`}>
                <header className="price-group__head">
                  <h3>{group.title}</h3>
                  <p>{group.summary}</p>
                  <span className="price-group__lead">{group.leadTime}</span>
                </header>
                {single ? (
                  <p className="price-group__price">{f.wonRange(group.items[0].min, group.items[0].max)}</p>
                ) : (
                  <ul className="price-list">
                    {group.items.map((item) => (
                      <li
                        key={item.id}
                        className={`price-item${item.featured ? ' price-item--featured' : ''}`}
                      >
                        <div className="price-item__text">
                          <span className="price-item__name">
                            {item.name}
                            {item.featured && <em>{t.badge}</em>}
                          </span>
                          {item.desc && <span className="price-item__desc">{item.desc}</span>}
                        </div>
                        <span className="price-item__price">{f.wonRange(item.min, item.max)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            )
          })}
        </div>

        <div className="rate-split">
          <div className="panel">
            <h3 className="panel__title">{t.termsTitle}</h3>
            <dl className="terms">
              {t.terms.map((term) => (
                <div key={term.label} className="terms__row">
                  <dt>{term.label}</dt>
                  <dd>{term.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="panel">
            <h3 className="panel__title">{t.extrasTitle}</h3>
            <table className="extra-table">
              <thead>
                <tr>
                  <th scope="col">{t.extrasHead.request}</th>
                  <th scope="col">{t.extrasHead.price}</th>
                </tr>
              </thead>
              <tbody>
                {t.extras.map((extra) => (
                  <tr key={extra.id}>
                    <td>{extra.name}</td>
                    <td className={extra.type === 'negotiable' ? 'is-muted' : ''}>{extra.priceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="panel__note">{t.extrasNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
