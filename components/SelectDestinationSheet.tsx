import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useTheme, colors } from '../lib/theme';
import PlacesAutocomplete from './PlacesAutocomplete';

interface SelectDestinationSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onClose: () => void;
  onDestinationChange: (destination: string) => void;
}

export default function SelectDestinationSheet({
  bottomSheetRef,
  onClose,
  onDestinationChange,
}: SelectDestinationSheetProps) {
  const { theme } = useTheme();
  const themeColors = colors[theme];

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
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: themeColors.card,
      }}
    >
      <BottomSheetView style={styles.sheetContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: themeColors.text }]}>
              Select Destination
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeText, { color: themeColors.primary }]}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <PlacesAutocomplete value="" onSelect={handleDestinationChange} />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
  },
  contentContainer: {
    // flex: 1,
    marginHorizontal: 20,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 20,
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
