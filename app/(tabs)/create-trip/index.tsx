import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

export default function CreateTripScreen() {
  const [imageUri, setImageUri] = useState<string>('');
  const DEFAULT_IMAGE = require('@/assets/images/home_header.png');

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Create Trip</Text>

      <View style={styles.imageWrapper}>
        <Image
          source={imageUri ? { uri: imageUri } : DEFAULT_IMAGE}
          resizeMode="cover"
          style={styles.image}
          fadeDuration={0}
        />
        <View style={styles.overlay} />
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={handleSelectImage}
          >
            <Ionicons name="camera-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* trip details */}
      {/* trip name, description, travel destination, trip dates, budget, persons */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Now-Display-Bold',
    textAlign: 'center',
    paddingVertical: 12,
  },

  imageWrapper: {
    height: 250,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
    transform: [{ scale: 1 }],
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconContainer: {
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
  iconWrapper: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 12,
    opacity: 0.8,
  },
});
