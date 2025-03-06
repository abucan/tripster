import { StyleSheet, View } from 'react-native';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';

import { MaterialIcons } from '@expo/vector-icons';

interface DateRangePickerProps {
  startDate: DateType;
  endDate: DateType;
  onChange: (params: any) => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
}: DateRangePickerProps) {
  return (
    <View style={styles.container}>
      <DateTimePicker
        style={styles.picker}
        mode="range"
        navigationPosition="around"
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        styles={{
          header: {
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
          weekday_label: {
            fontFamily: 'Helvetica-Now-Display-Bold',
            fontSize: 16,
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
            height: 50,
            width: 50,
            borderRadius: 100,
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    flex: 1,
    maxHeight: '80%',
    marginHorizontal: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
