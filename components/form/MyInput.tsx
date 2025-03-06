import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { MyInputProps } from '@/types/index';
import { Ionicons } from '@expo/vector-icons';

export function MyInput({
  onChangeText,
  value,
  label,
  icon,
  placeholder,
  error,
  height,
  isTextArea = false,
  editable = true,
  customStyle,
  ...props
}: MyInputProps) {
  return (
    <View style={[styles.container, customStyle]}>
      <View
        style={[styles.wrapper, error && { borderColor: 'red' }, { height }]}
      >
        <View>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            style={[styles.input, isTextArea && { flex: 1 }]}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            autoCapitalize="none"
            placeholderTextColor={'#6b7280'}
            multiline={isTextArea}
            numberOfLines={isTextArea ? 4 : 1}
            editable={editable}
            {...props}
          />
        </View>
        {icon && <Ionicons name={icon} size={24} style={{}} />}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontFamily: 'Helvetica-Now-Display-Medium',
    fontSize: 14,
    color: '#6b7280',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    borderColor: '#6b7280',
    gap: 2,
  },
  input: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
