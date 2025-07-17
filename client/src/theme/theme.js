// Design System - Unified theme and design tokens
// Based on existing RARE NY visual identity

const theme = {
  // Color Palette - Refined from existing patterns
  colors: {
    // Primary Colors
    primary: {
      black: '#000000',
      white: '#ffffff',
      gray: {
        100: '#f8f9fa',
        200: '#e9ecef', 
        300: '#dee2e6',
        400: '#ced4da',
        500: '#adb5bd',
        600: '#6c757d',
        700: '#495057',
        800: '#343a40',
        900: '#212529'
      }
    },

    // Accent Colors - From existing patterns
    accent: {
      blue: '#004dc9',
      lightBlue: '#317589',
      teal: '#8effe6',
      green: '#e0e6ad',
      lightGreen: '#e0e6ad'
    },

    // Semantic Colors
    semantic: {
      error: '#e03131',
      errorBg: '#fff5f5',
      errorBorder: '#fcc2c3',
      success: '#51cf66',
      successBg: '#f3f9f3',
      warning: '#ffd43b',
      warningBg: '#fffbf0',
      info: '#339af0',
      infoBg: '#f0f8ff'
    },

    // Background Colors
    background: {
      primary: '#ffffff',
      secondary: '#f8f9fa',
      accent: '#ebe7e1',
      card: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.5)'
    },

    // Text Colors
    text: {
      primary: '#000000',
      secondary: '#363636',
      muted: '#6c757d',
      inverse: '#ffffff'
    }
  },

  // Typography Scale - Refined from existing patterns
  typography: {
    fontFamily: {
      primary: 'Corbert, Arial, Helvetica, sans-serif',
      secondary: 'graphik, Arial, sans-serif'
    },
    
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px  
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
      '8xl': '6rem',    // 96px
      '9xl': '8rem'     // 128px
    },

    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },

    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  },

  // Spacing Scale - Systematic progression
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem'     // 256px
  },

  // Border Radius - Consistent with existing patterns
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px'
  },

  // Shadows - Enhanced from existing patterns
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    // Custom shadows from existing design
    card: '0 2px 4px rgba(49, 117, 139, 0.1)',
    accent: '0 4px 8px rgba(224, 230, 173, 0.3)'
  },

  // Breakpoints - Mobile-first responsive design
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  },

  // Transitions - Smooth and consistent
  transition: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '300ms ease',
    slower: '500ms ease'
  }
};

// Utility functions for theme access
export const getColor = (path) => {
  const keys = path.split('.');
  return keys.reduce((obj, key) => obj?.[key], theme.colors);
};

export const getSpacing = (value) => theme.spacing[value] || value;

export const getBreakpoint = (size) => theme.breakpoints[size];

export default theme;