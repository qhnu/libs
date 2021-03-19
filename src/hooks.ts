import { useRef, useLayoutEffect } from 'react'
import { useShallowCompareEffect } from 'react-use'

export const useUpdateLayoutEffect: typeof useLayoutEffect = (
  effect,
  deps = []
) => {
  const used = useRef(false)
  useLayoutEffect(() => {
    if (!used.current) {
      used.current = true
      return
    }
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export const useUpdateShallowCompareEffect: typeof useShallowCompareEffect = (
  effect,
  deps = []
) => {
  const used = useRef(false)
  useShallowCompareEffect(() => {
    if (!used.current) {
      used.current = true
      return
    }
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
