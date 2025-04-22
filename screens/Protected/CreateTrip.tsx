import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { TripForm } from '@/components/form/TripForm';
import { CreateTripModal } from '@/components/modals/CreateTripModal';
import { ScreenHeader } from '@/components/ScreenHeader';
import SelectDateRangeSheet from '@/components/SelectDateRangeSheet';
import SelectDestinationSheet from '@/components/SelectDestinationSheet';
import { useTripForm } from '@/hooks/forms/useTripForm';
import { MyInput } from '@/components/form/MyInput';

// new imports
import { useRef, useState } from 'react';

// TODO
export default function CreateTripScreen() {
  const {
    control,
    imageUri,
    destinationBottomSheetRef,
    rangeBottomSheetRef,
    showModal,
    isLoading,
    isSubmitting,
    errors,
    onSubmit,
    onErrors,
    handleSubmit,
    handleSelectImage,
    handleDestinationChange,
    handleDateRangeChange,
    setShowModal,
    reset,
  } = useTripForm({});

  const insets = useSafeAreaInsets();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const animatedHeight = useRef(new Animated.Value(1)).current; // 1 = expanded, 0 = collapsed

  const handleCollapse = () => {
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false, // useNativeDriver cannot animate height, so use false
    }).start(() => setIsCollapsed(!isCollapsed));
  };

  const onNewSubmit = (data: any) => {
    // ...your submit logic
    handleCollapse();
  };

  return (
    <ScrollView
      style={[
        styles.safeArea,
        {
          top: insets.top,
          bottom: insets.bottom,
        },
      ]}
    >
      <ScreenHeader
        title="Create Trip"
        leftIcon="arrow-back"
        rightIcon="ellipsis-horizontal"
      />
      <Animated.View
        style={{
          flex: 1,
          marginHorizontal: 20,
          gap: 16,
          marginTop: 12,
          padding: 16,
          borderRadius: 18,
          borderCurve: 'continuous',
          boxShadow: '0px 0px 20px -10px rgba(0, 0, 0, 0.16)',
          backgroundColor: 'white',

          height: animatedHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 350],
          }),
          overflow: 'hidden',
        }}
      >
        {!isCollapsed ? (
          <TouchableOpacity onPress={handleCollapse}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Helvetica-Now-Display-Bold',
                }}
              >
                Trip Name
              </Text>
              <MyInput
                onChangeText={() => {}}
                value={''}
                placeholder="Enter trip name"
                label="Trip Name"
                error={errors.title?.message}
              />
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Helvetica-Now-Display-Bold',
                }}
              >
                Trip Description
              </Text>
              <MyInput
                onChangeText={() => {}}
                value={''}
                placeholder="Enter trip description"
                label="Trip Description"
                error={errors.description?.message}
                height={125}
                isTextArea
              />
            </View>
            <Button title="Continue" size="lg" onPress={onNewSubmit} />
          </TouchableOpacity>
        ) : (
          <View>
            <Text>{'Trip Name'}</Text>
            <Text>{'Trip Description'}</Text>
          </View>
        )}
      </Animated.View>

      {/* <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          gap: 16,
          marginTop: 12,
          padding: 16,
          borderRadius: 18,
          borderCurve: 'continuous',
          boxShadow: '0px 0px 20px -10px rgba(0, 0, 0, 0.16)',
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Helvetica-Now-Display-Bold',
            }}
          >
            Trip Destination
          </Text>
          <MyInput
            onChangeText={() => {}}
            value={''}
            placeholder="Select travel destination"
            label="Travel Destination"
            error={errors.destination?.message}
            icon="chevron-down-outline"
            editable={false}
          />
        </View>
      </View> */}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
