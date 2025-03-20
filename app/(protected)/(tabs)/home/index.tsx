import { useState } from 'react';
import { BlurView } from 'expo-blur';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { FeaturesList } from '@/components/FeatureList';
import { LogoIcon } from '@/components/logo/LogoIcon';
import { SearchBar } from '@/components/SearchBar';
import { TripCardList } from '@/components/TripCardList';
import { useTripStore } from '@/lib/tripStore';

export default function HomeScreen() {
  const { upcomingTrip } = useTripStore();
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('@/assets/images/home_header.png')}
          resizeMode="cover"
          style={styles.image}
          fadeDuration={0}
        />
        <View style={styles.overlay} />
        <View style={[styles.logo]}>
          <View style={styles.welcomeView}>
            <LogoIcon />
            <Text style={styles.welcomeText}>
              {String('Hi, Ante').slice(0, 20) + ' 👋'}
            </Text>
          </View>
        </View>
      </View>

      <SearchBar
        isSearchBarExpanded={isSearchBarExpanded}
        setIsSearchBarExpanded={setIsSearchBarExpanded}
      />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <FeaturesList />
        <TripCardList
          trips={upcomingTrip}
          type="upcoming"
          title="Upcoming Trip"
          cta={true}
          ctaText="See all"
        />
      </ScrollView>
      {isSearchBarExpanded && (
        <BlurView
          tint="extraLight"
          intensity={100}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
        />
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    position: 'relative',
    marginTop: 24,
  },
  imageWrapper: {
    height: 250,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1 }],
  },
  logo: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  welcomeView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 26,
    color: 'white',
  },
  featureItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  feature: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: '0px 0px 20px -10px rgba(0, 0, 0, 0.16)',
  },
});
