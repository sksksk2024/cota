import daisyui from 'daisyui';

// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  content: [
    './public/**/*.html',
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,svg}',
    './src/**/*.svg',
    // Nextjs
    './pages/**/*.{js,ts,jsx,tsx}', // This will include all files inside the 'pages' folder
    './components/**/*.{js,ts,jsx,tsx}', // This will include all files inside the 'components' folder
    './app/**/*.{js,ts,jsx,tsx}', // If you're using the new app folder structure in Next.js
  ],
  theme: {
    extend: {
      extend: {
        spacing: {
          'btn-lg': '3rem',
        },
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
        'red-hat-text': ['Red Hat Text', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        commissioner: ['Commissioner', 'sans-serif'],
        epilogue: ['Epilogue', 'sans-serif'],
        'barlow-condensed': ['Barlow Condensed', 'sans-serif'],
        barlow: ['Barlow', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        inconsolata: ['Inconsolata', 'monospace'],
        'dm-serif-display': ['DM Serif Display', 'sans-serif'],
        karla: ['Karla', 'sans-serif'],
        'league-spartan': ['League Spartan', 'sans-serif'],
        fraunces: ['Fraunces', 'sans-serif'],
        overpass: ['Overpass', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      keyframes: {
        comeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-200vw)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        comeOut: {
          '0%': {
            opacity: '1',
            zIndex: '10',
            transform: 'scale(1.1)',
          },
          '10%': {
            transform: 'scale(1.5)',
          },
          '20%': {
            zIndex: '-10',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(-150vw)',
          },
        },
        walk: {
          '0%': {
            transform: 'translateX(-6.25rem)',
            opacity: '0',
          },
          '50%': {
            transform: 'translateX(6.25rem)',
            opacity: '0.2',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'ease-in-out',
          },
          '25%': {
            transform: 'translateY(-20%)',
            'animation-timing-function': 'ease-in',
          },
          '50%': {
            transform: 'translateY(10%)',
            'animation-timing-function': 'ease-out',
          },
          '75%': {
            transform: 'translateY(-10%)',
            'animation-timing-function': 'ease-in-out',
          },
        },
        bounceCombo: {
          '0%': {
            transform: 'translate(-3.125rem, -50%) scale(0.8)',
            opacity: '0',
          },
          '50%': {
            transform: 'translate(0, 50%) scale(1.5)',
            opacity: '0.5',
          },
          '100%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '1',
          },
        },
        fadeOut: {
          '0%': {
            opacity: '1',
            zIndex: '50',
          },
          '100%': {
            opacity: '0',
            zIndex: '0',
          },
        },
      },
      animation: {
        comeIn: 'comeIn .5s forwards',
        fadeOut: 'fadeOut .5s forwards',
        comeOut: 'comeOut 1s forwards',
        walk: 'walk 2s backwards',
        bounce: 'bounce 3.6s forwards',
        bounceCombo: 'bounceCombo 3.5s forwards',
      },
      colors: {
        'cyan-light': '#00E6E6',
        'green-light': '#00D26A',
        'cyan-dark': '#00B3B3',
        'green-dark': '#00A656',
        'background-dark': '#0A192F',
        'background-light': '#F5F7FA',
        highlight: '#F4D06F',
        warning: '#FF8243',
        textis: '#000',
        // textis: '#505050',
      },
      translate: {
        '1.0625': '17rem',
        '1.375': '25rem',
      },
      maxWidth: {
        'container-48': '3rem',
        'container-100': '6.25rem',
        'container-176': '11rem',
        'container-200': '12.5rem',
        'container-300': '18.75rem',
        'container-375': '23.4375rem',
        'container-400': '25rem',
        'container-500': '31.25rem',
        'container-600': '37.5rem',
        'container-700': '43.75rem',
        'container-800': '50rem',
        'container-900': '56.25rem',
        'container-1000': '62.5rem',
        'container-1100': '68.75rem',
        'container-1200': '75rem',
        'container-1300': '81.25rem',
        'container-1400': '87.5rem',
        'container-1440': '90rem',
        'container-1500': '93.75rem',
      },
      minWidth: {
        'container-100': '6.25rem',
        'container-200': '12.5rem',
        'container-300': '18.75rem',
        'container-400': '25rem',
        'container-500': '31.25rem',
        'container-600': '37.5rem',
        'container-700': '43.75rem',
        'container-800': '50rem',
        'container-900': '56.25rem',
        'container-1000': '62.5rem',
        'container-1100': '68.75rem',
        'container-1200': '75rem',
        'container-1300': '81.25rem',
        'container-1400': '87.5rem',
        'container-1500': '93.75rem',
      },
      width: {
        '1W': '0.0039rem',
        '1.6W': '0.0625rem',
        '8W': '0.3125rem',
        '16W': '1rem',
        '24W': '1.5rem',
        '28-8W': '1.8rem',
        '32W': '2rem',
        '48W': '3rem',
        '64W': '4rem',
        '80W': '5rem',
        '96W': '6rem',
        '112W': '7rem',
        '128W': '8rem',
        '144W': '9rem',
        '160W': '10rem',
        '176W': '11rem',
        '192W': '12rem',
        '200W': '12.5rem',
        '208W': '13rem',
        '240W': '15rem',
        '252.8W': '15.8rem',
        '256W': '16rem',
        '272W': '17rem',
        '288W': '18rem',
        '300W': '18.75rem',
        '316W': '19.75rem',
        '400W': '25rem',
        '464W': '29rem',
        '480W': '30rem',
        '496W': '31rem',
        '600W': '37.5rem',
        '736W': '46rem',
        '800W': '50rem',
        '936W': '58.5rem',
        logo: '7.8125rem',
        how: '11.375rem',
        btn: '35%',
      },
      maxHeight: {
        'container-100': '6.25rem',
        'container-200': '12.5rem',
        'container-300': '18.75rem',
        'container-400': '25rem',
        'container-500': '31.25rem',
        'container-600': '37.5rem',
        'container-700': '43.75rem',
        'container-800': '50rem',
        'container-900': '56.25rem',
        'container-1000': '62.5rem',
        'container-1100': '68.75rem',
        'container-1200': '75rem',
        'container-1300': '81.25rem',
        'container-1400': '87.5rem',
        'container-1500': '93.75rem',
      },
      minHeight: {
        'container-100': '6.25rem',
        'container-200': '12.5rem',
        'container-300': '18.75rem',
        'container-400': '25rem',
        'container-500': '31.25rem',
        'container-600': '37.5rem',
        'container-700': '43.75rem',
        'container-800': '50rem',
        'container-900': '56.25rem',
        'container-1000': '62.5rem',
        'container-1100': '68.75rem',
        'container-1200': '75rem',
        'container-1300': '81.25rem',
        'container-1400': '87.5rem',
        'container-1500': '93.75rem',
      },
      height: {
        '1.6H': '0.0625rem',
        '2H': '0.125rem',
        '8H': '0.3125rem',
        '16H': '1rem',
        '32H': '2rem',
        '33.6H': '2.1rem',
        '40H': '2.5rem',
        '48H': '3rem',
        '56H': '3.5rem',
        '64H': '4rem',
        '1-6H': '0.0625rem',
        '24H': '1.5rem',
        '28-8H': '1.8rem',
        '73.6H': '4.6rem',
        '80H': '5rem',
        '96H': '6rem',
        '100H': '6.25rem',
        '112H': '7rem',
        '128H': '8rem',
        '144H': '9rem',
        '160H': '10rem',
        '176H': '10rem',
        '192H': '12rem',
        '200H': '12.5rem',
        '208H': '13rem',
        '256H': '16rem',
        '272H': '17rem',
        '288H': '18rem',
        '300H': '18.75rem',
        '304H': '19rem',
        '316H': '19.75rem',
        '320H': '20rem',
        '400H': '25rem',
        '464H': '29rem',
        '480H': '30rem',
        '500H': '31.25rem',
        '550-4H': '34.4rem',
        '564H': '35.25rem',
        '600H': '37.5rem',
        '624H': '39rem',
        '800H': '50rem',
        '816H': '51rem',
        '832H': '52rem',
        '848H': '53rem',
        '864H': '54rem',
      },
      screens: {
        '3xs': '0px',
        '23-125': '23.125rem',
        '2xs': '23.75rem',
        custom: '26.875rem',
        xs: '30rem',
        sm: '40rem',
        md: '48rem',
        lg: '64rem',
        xl: '80rem',
        '2xl': '96rem',
      },
      fontSize: {
        '1-5xs': 'var(--font-size-1-5xs)',
        '2xs': 'var(--font-size-2xs)',
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        md: 'var(--font-size-md)',
        'md-1': 'var(--font-size-md-1)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '2-2xl': 'var(--font-size-2-2xl)',
        '2-4xl': 'var(--font-size-2-4xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '4-5xl': 'var(--font-size-4-5xl)',
      },
      margin: {
        socialM: '-4rem',
        '1.6M': '0.1rem',
        '4M': '0.25rem',
        '8M': '0.5rem',
        '10M': '0.625rem',
        '12M': '0.75rem',
        '16M': '1rem',
        '28.8M': '1.8rem',
        '32M': '2rem',
        '1.2M': '1.2rem',
        '48M': '3rem',
        '64M': '4rem',
        '67.2M': '4.2rem',
        '80M': '5rem',
        '96M': '6rem',
        '108M': '6.75',
        '128M': '8rem',
        '144M': '9rem',
        '160M': '10rem',
        '176M': '11rem',
        '192M': '12rem',
        '224M': '14rem',
        '240M': '15rem',
        '288M': '18rem',
        '304M': '19rem',
        '320M': '20rem',
      },
      inset: {
        '16negI': '-1rem',
        '1.12I': '0.07rem',
        '1.6I': '0.1rem',
        '2.4I': '0.15rem',
        '4I': '0.25rem',
        '8I': '0.5rem',
        '10I': '0.625rem',
        '12.8I': '0.8rem',
        '16I': '1rem',
        '19.2I': '1.2rem',
        '24I': '1.5rem',
        '26I': '1.625rem',
        '28I': '1.75rem',
        '28.8I': '1.8rem',
        '32I': '2rem',
        '48I': '3rem',
        '60.8I': '3.8rem',
        '64I': '4rem',
        '68.8I': '4.3rem',
        '80I': '5rem',
        '83-2I': '5.2rem',
        '86.4I': '5.4rem',
        '96I': '6rem',
        '105.6I': '6.6rem',
        '112I': '7rem',
        '116.8I': '7.3rem',
        '124.8I': '7.8rem',
        '128I': '8rem',
        '136.8I': '8.55rem',
        '140I': '8.75rem',
        '144I': '9rem',
        '146.4I': '9.15rem',
        '152.8I': '9.55rem',
        '160I': '10rem',
        '176I': '11rem',
        '182.4I': '11.4rem',
        '192I': '12rem',
        '200I': '12.5rem',
        '208I': '13rem',
        '224I': '14rem',
        '240I': '15rem',
        '243.2I': '15.2rem',
        '256I': '16rem',
        '272I': '17rem',
        '280I': '17.5rem',
        '288I': '18rem',
        '300I': '18.75rem',
        '304I': '19rem',
        '320I': '20rem',
        '352I': '22rem',
        '400I': '25rem',
        '800I': '50rem',
      },
      backgroundImage: {
        // Light Gradients
        'cyan-green-light': 'linear-gradient(to right, #00E6E6, #00D26A)',
        'green-cyan-light':
          'linear-gradient(to bottom right, #00D26A, #00E6E6)',
        'soft-light': 'linear-gradient(to bottom, #ffffff, #00E6E6, #00D26A)',
        // Black Gradients
        'cyan-green-dark': 'linear-gradient(to right, #00B3B3, #00A656)',
        'subtle-dark': 'linear-gradient(to bottom, #0A192F, #00B3B3, #00A656)',
        'deep-dark':
          'linear-gradient(135deg, #00A656 0%, #0A192F 50%, #00B3B3 100%)',
        'deep-dark-transition':
          'linear-gradient(135deg, #00A656 0%, #0A192F 50%, #00B3B3 100%)',
      },
      padding: {
        '1.2P': '1.2rem',
        '1.6P': '0.1rem',
        '3.2P': '0.2rem',
        '4P': '0.25rem',
        '6P': '0.375rem',
        '8P': '0.5rem',
        '10P': '0.625rem',
        '12P': '0.75rem',
        '16P': '1rem',
        '22.4P': '1.4rem',
        '24P': '1.5rem',
        '28P': '1.75rem',
        '28.8P': '1.8rem',
        '22.08P': '1.38rem',
        '22.56P': '1.41rem',
        '32P': '2rem',
        '48P': '3rem',
        '56P': '3.5rem',
        '64P': '4rem',
        '72P': '4.5rem',
        '80P': '5rem',
        '96P': '6rem',
        '112P': '7rem',
        '128P': '8rem',
        '144P': '9rem',
        '160P': '10rem',
        '176P': '11rem',
        '192P': '12rem',
        '208P': '13rem',
        '272P': '17rem',
        '288P': '18rem',
        '304P': '19rem',
        '320P': '20rem',
      },
      borderRadius: {
        '5BR': '0.3125rem',
        '10BR': '0.625rem',
        '20BR': '1.25rem',
        '30BR': '1.875rem',
        '40BR': '2.5rem',
        '50BR': '3.125rem',
        '80BR': '5rem',
        '100BR': '6.25rem',
        '150BR': '9.375rem',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        '1BW': '0.0625rem',
        '2BW': '0.125rem',
        '3BW': '0.1875rem',
        '4BW': '0.25rem',
        '5BW': '0.3125rem',
      },
      boxShadow: {
        'custom-light':
          '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.06)',
        'custom-medium':
          '0 0.25rem 0.375rem rgba(0, 0, 0, 0.1), 0 0.125rem 0.25rem rgba(0, 0, 0, 0.06)',
        'custom-dark':
          '0 0.625rem 0.9375rem rgba(0, 0, 0, 0.2), 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1)',
        'custom-xl':
          '0 1.25rem 1.5625rem rgba(0, 0, 0, 0.25), 0 0.625rem 0.625rem rgba(0, 0, 0, 0.22)',
        'custom-dark-cyan':
          '0 0.1875rem 0.0625rem rgba(0, 100, 0, 0.9), 0 0.25rem 0.375rem rgba(38, 186, 164, 0.9)',
        'custom-dark-light-blue':
          '0 0.1875rem 0.0625rem rgba(80, 70, 100, 0.9), 0 0.25rem 0.375rem rgba(97, 115, 255, 0.9)',
        'centered-black-soft':
          '0 0 0.3125rem 0.0625rem rgba(0, 0, 0, 0.3), 0 0 0.625rem 0.1875rem rgba(0, 0, 0, 0.2)',
        'centered-black-strong':
          '0 0 0.9375rem 0.3125rem rgba(0, 0, 0, 0.7), 0 0 1.875rem 0.625rem rgba(0, 0, 0, 0.5)',
      },
      userSelect: {
        none: 'none',
      },
      letterSpacing: {
        '0.2': '0.2rem',
        '0.3': '0.3rem',
        '0.4': '0.4rem',
        '1.2': '1.2rem',
        '1.5': '1.5rem',
      },
      lineHeight: {
        '3xs-tight': '.8',
        '2xs-tight': '1',
        'xs-tight': '1.2',
        'extra-loose': '2.5',
        xxl: '3',
      },
      zIndex: {
        '5': '5',
        '60': '60',
        '100': '100',
      },
    },
  },
  plugins: [daisyui, require('tailwindcss-animate')],
};
