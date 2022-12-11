module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "460px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      scale: {
        icon: 1.25,
        active: 0.95,
      },
      minWidth: {
        block: "800px",
      },
      maxWidth: {
        block: "800px",
        content: "1140px",
        logo: "168px",
      },
      maxHeight: {
        logo: "25px",
      },
      borderRadius: {
        DEFAULT: "4px",
      },
      fontSize: {
        xs: [
          "12px",
          {
            letterSpacing: "-.0125em",
            lineHeight: "15px",
            fontWeight: "400",
          },
        ],
        sm: [
          "14px",
          {
            letterSpacing: "-.0125em",
            lineHeight: "160%",
            fontWeight: "400",
          },
        ],
        md: [
          "16px",
          {
            letterSpacing: "-.0125em",
            lineHeight: "140%",
            fontWeight: "400",
          },
        ],
        lg: [
          "40px",
          {
            letterSpacing: "-.05em",
            lineHeight: "100%",
            fontWeight: "600",
          },
        ],
        xl: [
          "48px",
          {
            letterSpacing: "-.05em",
            lineHeight: "100%",
            fontWeight: "600",
          },
        ],
      },
      colors: {
        dark: {
          focus: "#4F7AE7",
          red: "#E75B4F",
          shade: {
            1: "#F2F2F2",
            2: "#B0B0B0",
            3: "#383838",
            4: "#222222",
            5: "#151515",
          },
        },
        light: {
          red: "#D62617",
          focus: "#177AD6",
          shade: {
            1: "#151515",
            2: "#515151",
            3: "#D1D1D1",
            4: "#EEEEEE",
            5: "#FFFFFF",
          },
        },
      },
      spacing: {
        icon: "1em",
        xl: "100px",
        lg: "40px",
        md: "24px",
        sm: "16px",
        xs: "8px",
      },
    },
  },
  plugins: [],
};
