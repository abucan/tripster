import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

import { Colors } from '@/constants/button';
import { useTheme } from '@/lib/theme';

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  title: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  shouldAnimate?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle[];
  textStyle?: TextStyle;
}

export function Button({
  title,
  variant = 'default',
  size = 'default',
  isLoading = false,
  shouldAnimate = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const { theme: themeVariant } = useTheme();
  const theme = Colors[themeVariant];

  const buttonStyle = [
    styles.button,
    styles[`${size}Button`],
    getVariantStyle(variant, theme),
    (isLoading || props.disabled) && styles.disabledButton,
    style,
  ];

  const textStyleFinal = [
    styles.text,
    styles[`${size}Text`],
    getTextStyle(variant, theme),
    (isLoading || props.disabled) && styles.disabledText,
    textStyle,
  ];

  const TextComponent = shouldAnimate ? Animated.Text : Text;
  const animationProps = shouldAnimate
    ? { entering: ZoomIn.duration(500) }
    : {};

  return (
    <TouchableOpacity
      style={buttonStyle}
      activeOpacity={0.7}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <ActivityIndicator
            color={
              variant === 'default' || variant === 'destructive'
                ? theme.white
                : theme.text
            }
            size="small"
          />
        </>
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <TextComponent style={textStyleFinal} {...animationProps}>
            {title}
          </TextComponent>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
}

const getVariantStyle = (
  variant: string,
  theme: typeof Colors.light
): ViewStyle => {
  const variantStyles: Record<string, ViewStyle> = {
    default: { backgroundColor: theme.primary },
    destructive: { backgroundColor: theme.destructive },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.outline,
    },
    secondary: { backgroundColor: theme.secondary },
    ghost: { backgroundColor: 'transparent' },
    link: { backgroundColor: 'transparent' },
  };

  return variantStyles[variant] || variantStyles.default;
};

const getTextStyle = (
  variant: string,
  theme: typeof Colors.light
): TextStyle => {
  const textStyles: Record<string, TextStyle> = {
    default: { color: theme.white },
    destructive: { color: theme.white },
    outline: { color: 'black' },
    secondary: { color: theme.text },
    ghost: { color: theme.text },
    link: { color: '#6b7280' },
  };

  return textStyles[variant] || textStyles.default;
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    gap: 8,
  },
  text: {
    fontWeight: '500',
  },
  defaultButton: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  smButton: {
    height: 36,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
  },
  lgButton: {
    height: 52,
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 30,
  },
  disabledButton: {
    backgroundColor: 'lightgray',
  },
  iconButton: {
    height: 40,
    width: 40,
    borderRadius: 8,
  },
  defaultText: {
    fontSize: 14,
  },
  smText: {
    fontSize: 12,
  },
  lgText: {
    fontSize: 16,
  },
  disabledText: {
    color: 'white',
  },
  iconText: {
    fontSize: 14,
  },
});
