import { Ionicons } from '@expo/vector-icons';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export const SearchBar = () => {
  return (
    <Pressable style={styles.wrapper}>
      <View style={styles.container}>
        <Ionicons name="search" size={32} style={styles.icon} />
        <View style={styles.searchContainer}>
          <Text style={styles.whereText}>Where to?</Text>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>Anywhere</Text>
            <View style={styles.dot} />
            <Text style={styles.descriptionText}>Anytime</Text>
            <View style={styles.dot} />
            <Text style={styles.descriptionText}>Any budget</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: -30,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 18,
    borderCurve: 'continuous',
    boxShadow: '0px 0px 20px -10px rgba(0, 0, 0, 0.16)',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    marginHorizontal: 18,
    opacity: 0.8,
    color: 'gray',
  },
  whereText: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 18,
    color: 'black',
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  descriptionText: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 14,
    color: 'gray',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'gray',
    opacity: 0.5,
  },
});
