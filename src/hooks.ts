import equal from 'fast-deep-equal'
import { useRef, useLayoutEffect, useState, useCallback } from 'react'
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

export const useObjState = <T>(init: T): [T, (newObj: T) => void] => {
  const [obj, setObjState] = useState(init)

  const setObj = useCallback((newObj: T) => {
    setObjState((currValue) => {
      if (equal(currValue, newObj)) {
        return currValue
      } else {
        return newObj
      }
    })
  }, [])

  return [obj, setObj]
}
