// src/components/Typography.tsx

import React from 'react';
import {Text, TextStyle, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {typography} from '../styles/typography';

type TypographyVariant = 'headline' | 'subheading' | 'body' | 'caption';

interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  style?: TextStyle;
}

const Typography: React.FC<TypographyProps> = ({variant, children, style}) => {
  const {theme} = useTheme();
  const {colors} = theme;

  const variantStyles = typography[variant] || typography.body;

  return (
    <Text style={[styles.base, variantStyles, {color: colors.text}, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System', // Adjust if you are using custom fonts
  },
});

export default Typography;
