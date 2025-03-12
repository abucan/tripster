import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#09090B',
    primary: '#02023d',
    destructive: '#EF4444',
    secondary: '#F4F4F5',
    outline: '#E4E4E7',
    ghost: 'transparent',
    white: '#FFFFFF',
    brand: '#3B82F6',
  },
  dark: {
    background: '#09090B',
    text: '#FFFFFF',
    primary: '#02023d',
    destructive: '#EF4444',
    secondary: '#27272A',
    outline: '#3F3F46',
    ghost: 'transparent',
    white: '#FFFFFF',
    brand: '#60A5FA',
  },
};

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
  style?: ViewStyle;
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
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const buttonStyle = [
    styles.button,
    styles[`${size}Button`],
    getVariantStyle(variant, theme),
    style,
  ];

  const textStyleFinal = [
    styles.text,
    styles[`${size}Text`],
    getTextStyle(variant, theme),
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
  switch (variant) {
    case 'default':
      return { backgroundColor: theme.primary };
    case 'destructive':
      return { backgroundColor: theme.destructive };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.outline,
      };
    case 'secondary':
      return { backgroundColor: theme.secondary };
    case 'ghost':
      return { backgroundColor: 'transparent' };
    case 'link':
      return { backgroundColor: 'transparent' };
    default:
      return { backgroundColor: theme.primary };
  }
};

const getTextStyle = (
  variant: string,
  theme: typeof Colors.light
): TextStyle => {
  switch (variant) {
    case 'default':
    case 'destructive':
      return { color: theme.white };
    case 'outline':
      return { color: 'black' };
    case 'secondary':
    case 'ghost':
      return { color: theme.text };
    case 'link':
      return {
        color: '#6b7280',
      };
    default:
      return { color: theme.white };
  }
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
  iconText: {
    fontSize: 14,
  },
});
