import { DefaultTheme } from 'react-native-paper';

export const colors = {
  primary: '#1976D2', // Blue
  secondary: '#D32F2F', // Red
  accent: '#FF5722',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#212121',
  error: '#B00020',
  disabled: '#BDBDBD',
  placeholder: '#9E9E9E',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  gradient: {
    blue: '#1976D2',
    red: '#D32F2F',
  },
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    error: colors.error,
    disabled: colors.disabled,
    placeholder: colors.placeholder,
    backdrop: colors.backdrop,
    secondary: colors.secondary,
  },
  roundness: 8,
};

export const getGradient = (start = colors.gradient.blue, end = colors.gradient.red) => ({
  colors: [start, end],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
});
