// src/styles/typography.ts

export const typography = {
  fontWeight: '700' as '700', // Default weight for headlines
  fontSize: 18, // Default font size for headlines
  lineHeight: 24.3, // Default line height
  letterSpacing: -0.64, // Default letter spacing

  // Define specific variants
  headline: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: -0.64,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    letterSpacing: -0.48,
  },
  body: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 24.3,
    letterSpacing: -0.32,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.16,
  },
};
