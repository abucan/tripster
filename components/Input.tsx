import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { TextInputProps } from '@/types/index';
import { Ionicons } from '@expo/vector-icons';

export const Input = ({
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
  ...props
}: TextInputProps) => {
  const [securePassword, setSecurePassword] = useState(secureTextEntry);

  const handlePasswordVisibility = () => {
    setSecurePassword(!securePassword);
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.container, error && { borderColor: 'red' }]}>
        <Ionicons name={icon} size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={securePassword}
          autoCapitalize="none"
          keyboardType={keyboardType}
          textContentType={textContentType}
          autoComplete={autoComplete}
          placeholderTextColor={'#6b7280'}
          {...props}
        />
        {secureTextEntry && (
          <Ionicons
            onPress={handlePasswordVisibility}
            name={securePassword ? 'eye-off' : 'eye'}
            size={24}
            style={styles.icon}
          />
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

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
    borderColor: '#CFCFCF',
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
    color: 'grey',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
