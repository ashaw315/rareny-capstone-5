import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* CSS Reset and Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background-color: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Typography Base */
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['6xl']};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['7xl']};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    }
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    }
  }

  h5 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize.xl};
    }
  }

  h6 {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
    }
  }

  p {
    margin: 0;
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }

  /* Link Styles */
  a {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transition.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.accent.blue};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.accent.blue};
      outline-offset: 2px;
    }
  }

  /* Form Elements Base */
  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent.blue};
    outline-offset: 2px;
  }

  /* Remove focus outline for mouse users */
  *:focus:not(:focus-visible) {
    outline: none;
  }

  /* Image styles */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* List styles */
  ul, ol {
    list-style: none;
  }

  /* Table styles */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    max-width: ${({ theme }) => theme.breakpoints['2xl']};
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing[4]};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0 ${({ theme }) => theme.spacing[6]};
    }
    
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: 0 ${({ theme }) => theme.spacing[8]};
    }
  }

  /* Loading and skeleton styles */
  .loading {
    opacity: 0.6;
    pointer-events: none;
  }

  .skeleton {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary.gray[200]} 25%,
      ${({ theme }) => theme.colors.primary.gray[100]} 50%,
      ${({ theme }) => theme.colors.primary.gray[200]} 75%
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s ease-in-out infinite;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* Enhanced Micro-interactions and Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  /* Utility Animation Classes */
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out;
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.5s ease-out;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.5s ease-out;
  }

  .animate-scale-in {
    animation: scaleIn 0.4s ease-out;
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Stagger Animation Delays */
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }
  .stagger-6 { animation-delay: 0.6s; }

  /* Enhanced Interactive Elements */
  .interactive-hover {
    transition: all ${({ theme }) => theme.transition.base};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadow.lg};
    }
  }

  .interactive-scale {
    transition: transform ${({ theme }) => theme.transition.fast};
    
    &:hover {
      transform: scale(1.05);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }

  /* Gradient Text Utility */
  .gradient-text {
    background: linear-gradient(135deg, #000 0%, #343a40 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .gradient-text-accent {
    background: linear-gradient(135deg, #004dc9 0%, #317589 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  /* Enhanced Card Styles */
  .card-hover-lift {
    transition: all ${({ theme }) => theme.transition.base};
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${({ theme }) => theme.shadow.xl};
    }
  }

  .card-subtle {
    background: ${({ theme }) => theme.colors.background.card};
    border: 1px solid ${({ theme }) => theme.colors.primary.gray[200]};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  /* Enhanced Button Base Styles */
  .btn-base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[2]};
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    text-decoration: none;
    cursor: pointer;
    transition: all ${({ theme }) => theme.transition.fast};
    border: 2px solid transparent;
    
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.accent.blue};
      outline-offset: 2px;
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }
  }

  .btn-primary {
    background: linear-gradient(135deg, #000 0%, #343a40 100%);
    color: white;
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadow.lg};
    }
  }

  .btn-outline {
    background: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    border-color: ${({ theme }) => theme.colors.primary.gray[300]};
    
    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.text.primary};
      background: ${({ theme }) => theme.colors.primary.gray[50]};
    }
  }

  /* Enhanced Form Elements */
  .form-control {
    width: 100%;
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
    border: 2px solid ${({ theme }) => theme.colors.primary.gray[300]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    transition: ${({ theme }) => theme.transition.fast};
    background: ${({ theme }) => theme.colors.background.primary};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent.blue};
      box-shadow: 0 0 0 3px rgba(0, 77, 201, 0.1);
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.text.muted};
    }
    
    &:disabled {
      background: ${({ theme }) => theme.colors.primary.gray[100]};
      color: ${({ theme }) => theme.colors.text.muted};
      cursor: not-allowed;
    }
  }

  /* Enhanced Grid Utilities */
  .grid-auto-fit {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${({ theme }) => theme.spacing[6]};
  }

  .grid-auto-fill {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing[4]};
  }

  /* Enhanced Flex Utilities */
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  /* Enhanced Spacing Utilities */
  .space-y-2 > * + * { margin-top: ${({ theme }) => theme.spacing[2]}; }
  .space-y-4 > * + * { margin-top: ${({ theme }) => theme.spacing[4]}; }
  .space-y-6 > * + * { margin-top: ${({ theme }) => theme.spacing[6]}; }
  .space-y-8 > * + * { margin-top: ${({ theme }) => theme.spacing[8]}; }

  .space-x-2 > * + * { margin-left: ${({ theme }) => theme.spacing[2]}; }
  .space-x-4 > * + * { margin-left: ${({ theme }) => theme.spacing[4]}; }
  .space-x-6 > * + * { margin-left: ${({ theme }) => theme.spacing[6]}; }

  /* Enhanced Responsive Utilities */
  .hide-mobile {
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  }

  .hide-desktop {
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  }

  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }

  /* Enhanced Truncation */
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Enhanced Loading States */
  .loading-overlay {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }
  }

  /* Enhanced Error States */
  .error-state {
    border-color: ${({ theme }) => theme.colors.semantic.error} !important;
    background: ${({ theme }) => theme.colors.semantic.errorBg} !important;
  }

  /* Enhanced Success States */
  .success-state {
    border-color: ${({ theme }) => theme.colors.semantic.success} !important;
    background: ${({ theme }) => theme.colors.semantic.successBg} !important;
  }

  /* Smooth scrolling for reduced motion users */
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    .animate-fade-in,
    .animate-fade-in-up,
    .animate-slide-in-left,
    .animate-slide-in-right,
    .animate-scale-in,
    .animate-pulse {
      animation: none !important;
    }
  }
`;

export default GlobalStyles;