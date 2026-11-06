'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { mergeClassNames } from "@/styles/class-names"

const CAROUSEL_IMAGES = [
  { src: '/media/courses/course-1.webp', alt: 'Слайд 1' },
  { src: '/media/courses/course-2.webp', alt: 'Слайд 2' },
  { src: '/media/courses/course-3.webp', alt: 'Слайд 3' },
  { src: '/media/courses/course-4.webp', alt: 'Слайд 4' },
]

const CAROUSEL_INTERVAL_MS = 3000

export function PhotoCarousel() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  const showNextPhoto = useCallback(() => {
    setActivePhotoIndex((current) => (current + 1) % CAROUSEL_IMAGES.length)
  }, [])

  const showPreviousPhoto = useCallback(() => {
    setActivePhotoIndex((current) => (current - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)
  }, [])

  useEffect(() => {
    const rotationTimer = setInterval(showNextPhoto, CAROUSEL_INTERVAL_MS)
    return () => clearInterval(rotationTimer)
  }, [showNextPhoto, activePhotoIndex])

  return (
    <div className="relative h-full w-full overflow-hidden bg-muted">
      {CAROUSEL_IMAGES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={mergeClassNames(
            'object-cover transition-opacity duration-700 ease-in-out dark:brightness-[0.6]',
            i === activePhotoIndex ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}

      <button
        type="button"
        onClick={showPreviousPhoto}
        aria-label="Предыдущий слайд"
        className="absolute top-1/2 left-4 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition hover:bg-background"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={showNextPhoto}
        aria-label="Следующий слайд"
        className="absolute top-1/2 right-4 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition hover:bg-background"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {CAROUSEL_IMAGES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Перейти к слайду ${i + 1}`}
            onClick={() => setActivePhotoIndex(i)}
            className={mergeClassNames(
              'size-2 rounded-full transition',
              i === activePhotoIndex ? 'bg-background' : 'bg-background/40',
            )}
          />
        ))}
      </div>
    </div>
  )
}
