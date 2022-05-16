import { defineConfig } from '@windicss/plugin-utils'
import defaultTheme from 'windicss/defaultTheme'

export default defineConfig({
  /**
   * Write windi classes in html attributes.
   * @see https://windicss.org/features/attributify.html
   */
  attributify: false,
  theme: {
    extend: {
      width: {
        tagsMd: '67.5%',
        tagsLg: '53.5%',
      },
      gridTemplateColumns: {
        '2-custom': '30% 70%',
      },
      gridTemplateRows: {
        '2-custom': '30% 70%',
      },
    },
  },
  plugins: [
    require('windicss/plugin/typography'),
    require('windicss/plugin/line-clamp'),
  ],
})
