import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('@/assets/images/home_header.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.locationBadge}>
              <Text style={styles.locationText}>COLOSSEO, ROME, ITALY</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Gigantic Colosseo</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.ratingLine} />
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>

          <View style={styles.tabsContainer}>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
              <Text style={[styles.tabText, styles.activeTabText]}>
                UTILITIES
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>REVIEW</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>DESTINATION</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={24} color="#007AFF" />
              <Text style={styles.statValue}>3 hours</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={24} color="#007AFF" />
              <Text style={styles.statValue}>20 people</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="walk-outline" size={24} color="#007AFF" />
              <Text style={styles.statValue}>2 weeks</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Colosseum, great amphitheater built in Rome under the Flavian
              emperors. Unlike earlier amphitheaters, the Colosseum is a
              freestanding structure...
            </Text>
            <TouchableOpacity>
              <Text style={styles.readMoreText}>Read more</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.sectionTitle}>LOCATION</Text>
            <View style={styles.mapContainer}>
              <Image
                source={require('@/assets/images/icon.png')}
                style={styles.mapImage}
                resizeMode="cover"
              />
              <View style={styles.mapOverlay}>
                <View style={styles.userAvatars}>
                  <Image
                    source={require('@/assets/images/icon.png')}
                    style={styles.avatarImage}
                  />
                  <Image
                    source={require('@/assets/images/icon.png')}
                    style={[styles.avatarImage, styles.avatarOverlap]}
                  />
                  <Image
                    source={require('@/assets/images/icon.png')}
                    style={[styles.avatarImage, styles.avatarOverlap]}
                  />
                </View>
                <View style={styles.locationInfo}>
                  <Ionicons name="location" size={18} color="#FF3B30" />
                  <Text style={styles.locationName}>Italy</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    height: 240,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationBadge: {
    position: 'absolute',
    top: 16,
    left: 64,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 60,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ratingContainer: {
    width: 60,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
  ratingLine: {
    width: '70%',
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#007AFF',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    marginTop: 8,
    fontSize: 14,
    color: '#000000',
  },
  descriptionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#3C3C43',
  },
  readMoreText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  locationContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 12,
  },
  mapContainer: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  userAvatars: {
    flexDirection: 'row',
  },
  avatarImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarOverlap: {
    marginLeft: -12,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationName: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
});
