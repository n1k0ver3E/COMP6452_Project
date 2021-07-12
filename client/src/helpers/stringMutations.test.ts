import { titleCase } from './stringMutations'

describe('stringMutations', () => {
  describe('#titleCase', () => {
    it('returns the correct title case is there is only one word', () => {
      const input = 'promie'
      const result = 'Promie'

      expect(titleCase(input)).toBe(result)
    })

    it('returns the correct title case if there are multiple words capitalize', () => {
      const input = 'PROMIE YUTASANE'
      const result = 'Promie Yutasane'

      expect(titleCase(input)).toBe(result)
    })

    it('does not return anything if an empty string is passed in', () => {
      const input = ''
      const result = ''

      expect(titleCase(input)).toBe(result)
    })
  })
})
