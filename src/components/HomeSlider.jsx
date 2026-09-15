import { useState } from 'react'
import { A11y, Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { useCopy } from '../i18n/index.jsx'

const photoUrl = (file) => `${import.meta.env.BASE_URL}home/${file}`

export default function HomeSlider() {
  const { copy } = useCopy()
  const homePhotos = copy.hero.photos
  // 불러오지 못한 사진은 슬라이드에서 빼서 사진만 이어서 보여줍니다.
  const [missing, setMissing] = useState(() => new Set())
  // 첫 화면이 빨리 뜨도록 첫 장만 먼저 받고, 나머지는 첫 장을 받은 뒤에 이어서 받습니다.
  const [loadRest, setLoadRest] = useState(false)
  const photos = homePhotos.filter((photo) => !missing.has(photo.file))

  if (photos.length === 0) return null

  return (
    <Swiper
      // 슬라이드 수가 바뀌면 loop 계산을 새로 하도록 다시 마운트
      key={photos.length}
      className="home-slider"
      modules={[Autoplay, EffectFade, Pagination, A11y]}
      // crossFade를 끄면 이전 사진이 불투명하게 남은 채 다음 사진이 위로 나타나 배경이 비치지 않습니다.
      effect="fade"
      fadeEffect={{ crossFade: false }}
      speed={600}
      loop={photos.length > 1}
      autoplay={{ delay: 1500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      a11y={{
        prevSlideMessage: copy.hero.slider.prev,
        nextSlideMessage: copy.hero.slider.next,
        paginationBulletMessage: copy.hero.slider.bullet,
      }}
    >
      {photos.map((photo, index) => {
        const isFirst = index === 0
        return (
          <SwiperSlide key={photo.file}>
            {(isFirst || loadRest) && (
              <img
                className="home-slider__img"
                src={photoUrl(photo.file)}
                alt={photo.alt}
                style={{ objectPosition: photo.focus ?? 'center' }}
                fetchPriority={isFirst ? 'high' : 'auto'}
                decoding="async"
                draggable={false}
                onLoad={isFirst ? () => setLoadRest(true) : undefined}
                onError={() => {
                  if (isFirst) setLoadRest(true)
                  setMissing((prev) => new Set(prev).add(photo.file))
                }}
              />
            )}
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
