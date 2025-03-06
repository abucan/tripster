import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { FeaturesList } from '@/components/FeatureList';
import { LogoIcon } from '@/components/logo/LogoIcon';
import { SearchBar } from '@/components/SearchBar';

export default function HomeScreen() {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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

        <SearchBar />
        <FeaturesList />
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: '#F7F7F7',
  },
  scrollContainer: {
    flex: 1,
    position: 'relative',
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
