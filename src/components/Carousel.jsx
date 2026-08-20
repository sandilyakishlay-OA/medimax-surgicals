import { useEffect, useRef, useState } from 'react'

export default function Carousel({ items, renderItem, ariaLabel }) {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateState = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollPrev(el.scrollLeft > 8)
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)

    const card = el.firstElementChild
    if (card) {
      const cardWidth = card.getBoundingClientRect().width + 20
      setActiveIndex(Math.round(el.scrollLeft / cardWidth))
    }
  }

  useEffect(() => {
    updateState()
    const el = trackRef.current
    if (!el) return undefined
    const onResize = () => updateState()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [items])

  const scrollByCard = (direction) => {
    const el = trackRef.current
    if (!el) return
    const card = el.firstElementChild
    const cardWidth = card ? card.getBoundingClientRect().width + 20 : 300
    el.scrollBy({ left: direction * cardWidth, behavior: 'smooth' })
  }

  const scrollToIndex = (index) => {
    const el = trackRef.current
    const card = el?.children[index]
    card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }

  if (!items.length) return null

  return (
    <div className="carousel">
      <div className="carousel__track" ref={trackRef} onScroll={updateState} role="list" aria-label={ariaLabel}>
        {items.map((item, index) => (
          <div className="carousel__item" role="listitem" key={item.id || index}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--prev"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--next"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollNext}
            aria-label="Next"
          >
            ›
          </button>

          <div className="carousel__dots">
            {items.map((item, index) => (
              <button
                type="button"
                key={item.id || index}
                className={`carousel__dot ${activeIndex === index ? 'carousel__dot--active' : ''}`}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
