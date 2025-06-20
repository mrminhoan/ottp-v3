import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        surface: {
          DEFAULT: 'var(--surface)',
          muted: 'var(--surface-muted)'
        },

        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)'
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)'
        },
        info: 'var(--info)',
        warning: 'var(--warning)',
        success: 'var(--success)',
        error: 'var(--error)',
        disabled: 'var(--disabled)',
        label: 'var(--label)'
      },
      backgroundImage: {
        'info-gradient': 'var(--info-gradient)',
        'warning-gradient': 'var(--warning-gradient)',
        'success-gradient': 'var(--success-gradient)',
        'error-gradient': 'var(--error-gradient)',
        user: 'var(--color-user-gradient)',
        seller: 'var(--color-seller-gradient)',
        shop: 'var(--color-shop-gradient)',
        deposit: 'var(--color-deposit-gradient)',
        withdrawal: 'var(--color-withdrawal-gradient)',
        tether: 'var(--color-tether-gradient)'
      }
    },
    colors: {}
  },
  plugins: [animate]
}
