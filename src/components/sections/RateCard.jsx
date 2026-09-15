import { extras, productGroups, terms } from '../../data/pricing.js'
import { formatRange } from '../../lib/estimate.js'
import SectionHead from '../SectionHead.jsx'

export default function RateCard() {
  return (
    <section className="section section--tinted" id="rates">
      <div className="container">
        <SectionHead
          index={4}
          eyebrow="Rate Card"
          title="광고 상품 및 단가"
          desc="모든 단가는 부가세 포함 금액입니다."
        />

        <div className="price-groups">
          {productGroups.map((group) => {
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
                  <p className="price-group__price">{formatRange(group.items[0].min, group.items[0].max)}</p>
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
                            {item.featured && <em>추천</em>}
                          </span>
                          {item.desc && <span className="price-item__desc">{item.desc}</span>}
                        </div>
                        <span className="price-item__price">{formatRange(item.min, item.max)}</span>
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
            <h3 className="panel__title">진행 조건</h3>
            <dl className="terms">
              {terms.map((t) => (
                <div key={t.label} className="terms__row">
                  <dt>{t.label}</dt>
                  <dd>{t.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="panel">
            <h3 className="panel__title">추가 비용 및 2차 활용</h3>
            <table className="extra-table">
              <thead>
                <tr>
                  <th scope="col">추가 요청</th>
                  <th scope="col">추가 비용</th>
                </tr>
              </thead>
              <tbody>
                {extras.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td className={e.type === 'negotiable' ? 'is-muted' : ''}>{e.priceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="panel__note">
              메타 광고 집행, 상세페이지 사용, 원본 제공은 별도 권리로 기본 단가에 포함되지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
