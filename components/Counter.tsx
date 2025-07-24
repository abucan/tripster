import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CounterProps } from '@/types';

export function Counter({
  initialValue = 1,
  min = 1,
  max = 50,
  onChange,
  error,
}: CounterProps) {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    if (value < max) {
      const newValue = value + 1;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      const newValue = value - 1;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.viewContainer,
          error && { borderColor: 'red', borderWidth: 1 },
        ]}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{value > 1 ? 'People' : 'Person'}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleIncrement}>
            ChevronUp
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDecrement}>
            ChevronDown
          </TouchableOpacity>
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 'auto',
    height: 'auto',
    gap: 6,
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    borderColor: '#6b7280',
  },
  labelContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: 'Helvetica-Now-Display-Medium',
    fontSize: 14,
    color: '#6b7280',
  },
  value: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
