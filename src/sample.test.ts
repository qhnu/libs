import { sample } from './sample'

describe('sample', () => {
  it('add', () => {
    const result = sample(1, 2)
    expect(result).toBe(3)
  })
})
