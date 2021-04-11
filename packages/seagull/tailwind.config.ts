import { defineConfig } from 'vite-plugin-windicss';
import colors from 'windicss/colors';
import typography from 'windicss/plugin/typography';

export default defineConfig({
  darkMode: 'class',
  plugins: [typography()],
  theme: {
    /**
     * #2B303A
     * #69D1C5
     * #008BCF
     * #A04023
     */
    extend: {
      colors: {
        primary: {
          // DEFAULT: '#008bcf',
          DEFAULT: '#3b82f6',
          dark: colors.blue[800],
        },
        highlight: {
          DEFAULT: '#a04023',
          dark: colors.red[800],
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'inherit',
              opacity: 0.75,
              fontWeight: '500',
              textDecoration: 'underline',
              '&:hover': {
                opacity: 1,
                color: colors.teal[600],
              },
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            code: { color: 'inherit' },
          },
        },
      },
    },
  },
});
