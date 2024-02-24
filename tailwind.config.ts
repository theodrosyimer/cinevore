import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        // sm: '2rem',
        // lg: '4rem',
        // xl: '5rem',
        // '2xl': '6rem',
      },
      screens: {
        // xs: '320px',
        // sm: '480px',
        // md: '768px',
        // lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        neon: '0 0 5px theme(colors.purple.200), 0 0 20px theme(colors.purple.700)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontSize: {
        sm: 'clamp(0.8rem, -0.08vw + 0.82rem, 0.75rem)',
        base: 'clamp(1rem, 0vw + 1rem, 1rem)',
        lg: 'clamp(1.25rem, 0.14vw + 1.22rem, 1.33rem)',
        xl: 'clamp(1.56rem, 0.36vw + 1.49rem, 1.78rem)',
        '2xl': 'clamp(1.95rem, 0.69vw + 1.81rem, 2.37rem)',
        '3xl': 'clamp(2.44rem, 1.19vw + 2.2rem, 3.16rem)',
        '4xl': 'clamp(3.05rem, 1.93vw + 2.67rem, 4.21rem)',
        '5xl': 'clamp(3.81rem, 2.99vw + 3.22rem, 5.61rem)',
        '6xl': 'clamp(4.77rem, 4.52vw + 3.87rem, 7.48rem)',
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
      minHeight: {
        // svh: ['100vh', '100svh'],
        // dynamic: ['100vh', '100dvh'],
        svh: '100svh',
        dynamic: '100dvh',
      },
      backgroundImage: {
        'not-found': "url('../public/bg-404.jpg')",
      },
      padding: {
        DEFAULT: '1rem',
        // sm: '2rem',
        // lg: '4rem',
        // xl: '5rem',
        // '2xl': '6rem',
      },
      screens: {
        xs: '320px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      width: {
        'film-poster-92': '92px',
        'film-poster-154': '154px',
        'film-poster-185': '185px',
        'film-poster-342': '342px',
        'film-poster-500': '500px',
        'film-poster-780': '780px',
        'film-backdrop-300': '300px',
        'film-backdrop-780': '780px',
        'film-backdrop-1280': '1280px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
