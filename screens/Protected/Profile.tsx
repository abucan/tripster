import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/lib/store';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const DEFAULT_IMAGE = require('@/assets/images/home_header.png');

  const { user, signOut } = useAuthStore();
  console.log(user);

  return (
    <View
      style={[
        styles.safeArea,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeader title="Profile" />

          <View style={styles.profileSection}>
            <Image source={DEFAULT_IMAGE} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>Brooklyn Simmons</Text>
              <Text style={styles.username}>@bioxlyn</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.settingTitle}>Settings</Text>

          <View style={styles.menu}>
            {menuItem('card-outline', 'My Trips')}
            {menuItem('heart-outline', 'My Favorite')}
            {menuItem('shield-checkmark-outline', 'Security')}
            {menuItem('notifications-outline', 'Notification')}
            {menuItem('language-outline', 'Languages')}
            {menuItem('help-circle-outline', 'Help and Support')}
            {menuItem('log-out-outline', 'Logout', signOut)}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function menuItem(iconName: string, label: string, action?: () => void) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={action}>
      <Ionicons name={iconName as any} size={24} style={styles.menuIcon} />
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    marginHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Now-Display-Bold',
  },
  username: {
    fontSize: 14,
    fontFamily: 'Helvetica-Now-Display-Regular',
    color: 'gray',
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Now-Display-Medium',
    color: 'gray',
    marginBottom: 12,
  },
  menu: {
    // backgroundColor: 'white',
    // borderRadius: 10,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#313030d',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 18,
    fontFamily: 'Helvetica-Now-Display-Light',
  },
});
