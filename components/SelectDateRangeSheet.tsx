import React, { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DateType } from 'react-native-ui-datepicker';

import { SelectDateRangeSheetProps } from '@/types';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { colors, useTheme } from '../lib/theme';

import DateRangePicker from './DateRangePicker';

export default function SelectDateRangeSheet({
  bottomSheetRef,
  onDateRangeChange,
  onClose,
}: SelectDateRangeSheetProps) {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const snapPoints = useMemo(() => ['75%'], []);

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
    [onClose],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const onChange = (params: any) => {
    setDateRange(params);

    onDateRangeChange({
      startDate: params.startDate,
      endDate: params.endDate,
    });
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
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={onChange}
        />

        <View style={styles.footerContainer}>
          <View style={styles.footer}>
            <Text style={styles.footerSubtitle}>Start Date</Text>
            <Text style={styles.footerDate}>{from || 'No Date'}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerSubtitle}>End Date</Text>
            <Text style={styles.footerDate}>{to || 'No Date'}</Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
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
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    gap: 16,
  },
  footer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    gap: 4,
  },
  footerSubtitle: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 12,
    color: colors.light.textSecondary,
  },
  footerDate: {
    fontFamily: 'Helvetica-Now-Display-Medium',
    fontSize: 16,
  },
});
