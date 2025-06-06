import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      scale: {
        '102': '1.02',
      },
      boxShadow: {
        custom: '0px 0px 12px 2px #FFFFFF40',
      },
      backgroundImage: {
        'landing-top-large': "url('/contents/landing-top-large.png')",
        'landing-top-medium': "url('/contents/landing-top-medium.png')",
        'landing-top-small': "url('/contents/landing-top-small.png')",
        'landing-bottom-large': "url('/contents/landing-bottom-large.png')",
        'landing-bottom-medium': "url('/contents/landing-bottom-medium.png')",
        'landing-bottom-small': "url('/contents/landing-bottom-small.png')",
      },
      screens: {
        tablet: '744px', // 반응형 태플릿 기준(744px추가)
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        state: {
          '950': '#020617',
          '50/10': '#F8FAFC10',
        },
        brand: {
          primary: '#10B981',
          secondary: '#34D399',
          tertiary: '#A3E635',
          gradient: {
            from: '#10B981',
            to: '#A3E635',
          },
        },
        point: {
          purple: '#A855F7',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          pink: '#EC4899',
          rose: '#F43F5E',
          orange: '#F97316',
          yellow: '#EAB308',
          red: '#EF4444',
        },
        background: {
          primary: '#0F172A',
          secondary: '#1E293B',
          tertiary: '#334155',
          inverse: '#FFFFFF',
          darkPrimary: '#18212F',
        },
        interaction: {
          inactive: '#94A3B8',
          hover: '#059669',
          pressed: '#047857',
          focus: '#10B981',
        },
        border: {
          primary: 'rgba(248, 250, 252, 0.5)',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          tertiary: '#E2E8F0',
          default: '#64748B',
          inverse: '#FFFFFF',
          disabled: '#94A3B8',
        },
        status: {
          danger: '#DC2626',
        },
        icon: {
          primary: '#64748B',
          inverse: '#F8FAFC',
          brand: '#10B981',
          danger: '#DC2626',
        },
      },
      fontSize: {
        '4xl': ['2.5rem', { lineHeight: '3rem' }], // 40px / 48px
        '3xl': ['2rem', { lineHeight: '2.375rem' }], // 32px / 38px
        '2xl': ['1.5rem', { lineHeight: '1.75rem' }], // 24px / 28px
        xl: ['1.25rem', { lineHeight: '1.5rem' }], // 20px / 24px
        '2lg': ['1.125rem', { lineHeight: '1.3125rem' }], // 18px / 21px
        lg: ['1rem', { lineHeight: '1.1875rem' }], // 16px / 19px
        md: ['0.875rem', { lineHeight: '1.0625rem' }], // 14px / 17px
        sm: ['0.8125rem', { lineHeight: '1rem' }], // 13px / 16px
        xs: ['0.75rem', { lineHeight: '0.875rem' }], // 12px / 14px
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
} satisfies Config;
