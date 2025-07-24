import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';

import { colors } from '@/constants/theme';
import { useTheme } from '@/lib/theme';
import { TextInputProps } from '@/types/index';
import { Ionicons } from '@expo/vector-icons';

export function Input({
  onChangeText,
  value,
  label,
  icon,
  placeholder,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  textContentType,
  autoComplete,
  wrapperStyle,
  ...props
}: TextInputProps & { wrapperStyle?: ViewStyle }) {
  const [securePassword, setSecurePassword] = useState(secureTextEntry);
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const handlePasswordVisibility = () => {
    setSecurePassword(!securePassword);
  };

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          { borderColor: error ? 'red' : themeColors.border },
        ]}
      >
        <Ionicons
          name={icon}
          size={24}
          style={[styles.icon, { color: themeColors.textSecondary }]}
        />
        <TextInput
          style={[styles.input, { color: themeColors.text }]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={securePassword}
          autoCapitalize="none"
          keyboardType={keyboardType}
          textContentType={textContentType}
          autoComplete={autoComplete}
          placeholderTextColor={themeColors.textSecondary}
          {...props}
        />
        {secureTextEntry && (
          <Ionicons
            onPress={handlePasswordVisibility}
            name={securePassword ? 'eye-off' : 'eye'}
            size={24}
            style={[styles.icon, { color: themeColors.textSecondary }]}
          />
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 16,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    height: 52,
    paddingVertical: 10,
    paddingHorizontal: 2,
    fontSize: 14,
  },
  icon: {
    marginHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
