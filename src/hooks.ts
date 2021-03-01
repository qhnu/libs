import { useRef, useLayoutEffect } from 'react'

export const useUpdateLayoutEffect: typeof useLayoutEffect = (
  effect,
  deps = []
) => {
  const isInitialMount = useRef(true)

  useLayoutEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
