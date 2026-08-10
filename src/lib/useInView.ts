import { useEffect, useRef, useState } from 'react'

type UseInViewOptions = {
  threshold?: number
  rootMargin?: string
}

export function useInView<T extends Element>({
  threshold = 0.15,
  rootMargin = '0px',
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, inView }
}
