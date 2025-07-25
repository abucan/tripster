import { useRef, useState } from 'react';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { Button } from '@/components/Button';
import { ChooseAuthSheet } from '@/components/ChooseAuthSheet';
import { Slide } from '@/components/Slide';
import { Slides } from '@/constants/Slides';
import { colors } from '@/constants/theme';
import { useTheme } from '@/lib/theme';
import BottomSheet from '@gorhom/bottom-sheet';

export default function Index() {
  const { theme } = useTheme();

  const swiper = useRef<Swiper>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const isLastSlide = slideIndex === Slides.length - 1;

  // refs
  const authSheetRef = useRef<BottomSheet>(null);

  const handleSlideChange = (index: number) => {
    setSlideIndex(index);
  };

  const handleNextPress = () => {
    if (isLastSlide) {
      authSheetRef.current?.expand();
    } else {
      swiper.current?.scrollBy(1);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme === 'light' ? '#F7F7F7' : '#121212' },
      ]}
    >
      <View style={styles.container}>
        <Swiper
          ref={swiper}
          loop={false}
          showsPagination={false}
          activeDotColor={colors.light.brand}
          onIndexChanged={handleSlideChange}
        >
          {Slides.map((slide) => (
            <Slide key={slide.id} {...slide} />
          ))}
        </Swiper>
      </View>

      <View style={styles.footer}>
        <Button
          key={isLastSlide ? 'last' : 'continue'}
          title={isLastSlide ? 'Get Started' : 'Continue'}
          variant="default"
          size="lg"
          onPress={handleNextPress}
          shouldAnimate={true}
        />
        <Button
          title="Skip"
          variant="link"
          size="lg"
          onPress={() => swiper.current?.scrollTo(Slides.length - 1)}
        />
      </View>

      <ChooseAuthSheet
        bottomSheetRef={authSheetRef as any}
        onClose={() => authSheetRef.current?.close()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  skipText: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 16,
    color: '#6b7280',
  },
});
