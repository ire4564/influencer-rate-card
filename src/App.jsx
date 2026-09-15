import { useEffect, useState } from 'react'
import Calculator from './components/calculator/Calculator.jsx'
import Hero from './components/Hero.jsx'
import Audience from './components/sections/Audience.jsx'
import Contact from './components/sections/Contact.jsx'
import Footer from './components/sections/Footer.jsx'
import Metrics from './components/sections/Metrics.jsx'
import Process from './components/sections/Process.jsx'
import RateCard from './components/sections/RateCard.jsx'
import Rationale from './components/sections/Rationale.jsx'
import Strengths from './components/sections/Strengths.jsx'

const navItems = [
  { href: '#about', label: '타깃' },
  { href: '#metrics', label: '지표' },
  { href: '#rates', label: '단가' },
  { href: '#calculator', label: '계산기' },
  { href: '#process', label: '진행 절차' },
  { href: '#contact', label: '문의' },
]

export default function App() {
  const [activeSection, setActiveSection] = useState(navItems[0].href.slice(1))

  useEffect(() => {
    const sections = navItems
      .map((item) => ({ id: item.href.slice(1), el: document.getElementById(item.href.slice(1)) }))
      .filter((s) => s.el)

    // 스크롤 위치 기준으로 "지금 지나온 마지막 메뉴"를 활성화합니다.
    // (지표·단가 사이의 콘텐츠 강점처럼 메뉴에 없는 구간을 지나는 동안에도
    // 가장 최근에 지난 메뉴가 계속 유지되도록)
    function pickActiveSection() {
      const line = window.scrollY + window.innerHeight * 0.35
      let current = sections[0]?.id
      for (const s of sections) {
        if (s.el.getBoundingClientRect().top + window.scrollY <= line) {
          current = s.id
        }
      }
      if (current) setActiveSection(current)
    }

    // 스크롤 이벤트마다 위치를 재면 모바일에서 끊길 수 있어 한 프레임에 한 번만 계산합니다.
    let frame = 0
    function onScroll() {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        pickActiveSection()
      })
    }

    pickActiveSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <nav className="nav" aria-label="주요 메뉴">
        <div className="container nav__inner">
          <ul className="nav__links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === item.href.slice(1) ? 'active' : undefined}
                  aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main>
        <Hero />
        <Audience />
        <Metrics />
        <Strengths />
        <RateCard />
        <Rationale />
        <Calculator />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
