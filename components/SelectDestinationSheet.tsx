import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

import { SelectDestinationSheetProps } from '@/types';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { useTheme } from '../lib/theme';

import { PlacesAutocomplete } from './PlacesAutocomplete';
// TODO
export default function SelectDestinationSheet({
  bottomSheetRef,
  onDestinationChange,
  onClose,
}: SelectDestinationSheetProps) {
  const { theme } = useTheme();
  // const themeColors = colors[theme];

  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) onClose();
    },
    [onClose]
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const handleDestinationChange = ({
    name,
    coordinates,
  }: {
    name: string;
    coordinates: [number, number];
  }) => {
    if (name) {
      onDestinationChange(name);
    }
  };

  return (
    <ActionSheet gestureEnabled ref={bottomSheetRef}>
      <View style={styles.sheetContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: 'black' }]}>
              Select Destination
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        <PlacesAutocomplete value="" onSelect={handleDestinationChange} />
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    height: 500,
    marginHorizontal: 20,
  },
  contentContainer: {
    marginHorizontal: 20,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
