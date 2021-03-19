import equal from 'fast-deep-equal'
import { useRef, useLayoutEffect } from 'react'
import { useDeepCompareEffect, useCustomCompareEffect } from 'react-use'

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

export const useUpdateDeepCompareEffect: typeof useDeepCompareEffect = (
  effect,
  deps = []
) => {
  const used = useRef(false)
  useCustomCompareEffect(
    () => {
      if (!used.current) {
        used.current = true
        return
      }
      effect()
    },
    deps,
    (prevDeps, nextDeps) => equal(prevDeps, nextDeps)
  )
}
