import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useTheme, colors } from '../lib/theme';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';

interface SelectDateRangeSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onClose: () => void;
  onDateRangeChange: (dateRange: {
    startDate: string;
    endDate: string;
  }) => void;
}

export default function SelectDateRangeSheet({
  bottomSheetRef,
  onClose,
  onDateRangeChange,
}: SelectDateRangeSheetProps) {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const snapPoints = useMemo(() => ['50%'], []);

  const [dateRange, setDateRange] = React.useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });

  const from = dateRange.startDate
    ? dayjs(dateRange.startDate).format('MMM DD, YYYY')
    : '';
  const to = dateRange.endDate
    ? dayjs(dateRange.endDate).format('MMM DD, YYYY')
    : '';

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

  const onChange = (params: any) => {
    console.log(params);
    setDateRange(params);
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
              Select Date Range
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeText, { color: themeColors.primary }]}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Date range picker */}
        <DateTimePicker
          style={{ marginHorizontal: 20 }}
          mode="range"
          navigationPosition="right"
          containerHeight={300}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={onChange}
          styles={{
            header: {
              // marginHorizontal: 10,
              marginBottom: 10,
            },
            month_selector_label: {
              fontFamily: 'Helvetica-Now-Display-Bold',
              fontSize: 20,
            },
            year_selector_label: {
              fontFamily: 'Helvetica-Now-Display-Bold',
              fontSize: 20,
            },
            button_next: {
              marginLeft: -10,
            },
            range_start: {
              backgroundColor: 'red',
            },
            range_end: {
              backgroundColor: 'blue',
            },
            range_fill: {
              backgroundColor: 'lightblue',
            },
            range_middle: {
              backgroundColor: 'lightblue',
            },
            range_fill_weekend: {
              borderTopRightRadius: 100,
              borderBottomRightRadius: 100,
            },
            range_fill_weekstart: {
              borderTopLeftRadius: 100,
              borderBottomLeftRadius: 100,
            },
            day: {
              borderRadius: 100,
              height: 50,
              width: 50,
            },
            day_cell: {
              marginVertical: 4,
            },
          }}
          components={{
            IconPrev: (
              <MaterialIcons name="navigate-before" size={26} color="black" />
            ),
            IconNext: (
              <MaterialIcons name="navigate-next" size={26} color="black" />
            ),
          }}
        />
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
