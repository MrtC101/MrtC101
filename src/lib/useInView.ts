import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type UseInViewOptions = {
  threshold?: number
  rootMargin?: string
}

type InViewState = {
  visible: boolean
  // False for content already on screen at mount — it should just render in
  // its final state instead of playing the entrance animation, which avoids
  // racing the IntersectionObserver's first (async) callback against paint.
  animate: boolean
}

export function useInView<T extends Element>({
  threshold = 0.15,
  rootMargin = '0px',
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const [state, setState] = useState<InViewState>({ visible: false, animate: true })
  const resolvedOnMount = useRef(false)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0
    if (alreadyVisible) {
      resolvedOnMount.current = true
      setState({ visible: true, animate: false })
    }
  }, [])

  useEffect(() => {
    if (resolvedOnMount.current) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState({ visible: true, animate: true })
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, visible: state.visible, animate: state.animate }
}
