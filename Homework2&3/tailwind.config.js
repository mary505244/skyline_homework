module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundImage: {
      'bluebg': "url('src/components/Calculator/imgs/blue.jpg')",
      'pinkbg': "url('src/components/Calculator/imgs/pink.jpg')",
      'purplebg': "url('src/components/Calculator/imgs/purple.jpg')"

    },
    themeVariants: ["pink", "purple", "blue"],
    extend: {
      colors: {
        pink: {
          900: `#e0267dea`,
          800: `#e23787ea`,
          700: `#e44690ea`,
          600: `#e7579aea`,
          500: `#e969a5ea`,
          400: `#e97eb0ea`,
          300: `#e790b9ea`,
          200: `#e7a5c4ea`,
          100: `#e7bbd0ea`,
        },
        purple: {
          900: `#a126d1ea`,
          800: `#a839d4ea`,
          700: `#b24ddaea`,
          600: `#ba62ddea`,
          500: `#be76dbea`,
          400: `#c68dddea`,
          300: `#cda0dfea`,
          200: `#d4b6e0ea`,
          100: `#d8c8dfea`,
        },
        blue: {
          900: `#1470daea`,
          800: `#267bdbea`,
          700: `#3a87dfea`,
          600: `#4d92e0ea`,
          500: `#5f9be0ea`,
          400: `#74a8e2ea`,
          300: `#88b1e0ea`,
          200: `#9bbbe0ea`,
          100: `#b4c9e2ea`,
        },

        red: {
          700: `#db4242ea`,
          600: `#df5757ea`,
          500: `#e27070ea`,
        },

        gray: {
          700: `#3d3d3d`,
          600: `#5e5d5d`,
          500: `#818181`,
          400: `#a3a2a2`,
          300: `#c0bfbf`,
          200: `#dbd9d9`,
          100: `#f5f3f3`
        },
      },

      boxShadow: {
        normal: `inset 0px -4px 0px var(--tw-ring-color)`,
        pressed: `inset 0px 0px 0px var(--tw-ring-color)`,
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
    },
  },
  plugins: [require("tailwindcss-multi-theme")],
};
