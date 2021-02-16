import random from 'lodash/random'

export const randomUniqueRange: (
  count: number,
  availableNumbers: number[]
) => number[] = (count, availableNumbers) => {
  const range: number[] = []
  let remainNumbers = [...availableNumbers]

  while (range.length < count) {
    if (!remainNumbers.length) remainNumbers = [...availableNumbers]

    const randomIndex = random(0, remainNumbers.length - 1)
    const picks = remainNumbers.splice(randomIndex, 1)
    range.push(picks[0])
  }

  return range
}
