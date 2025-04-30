import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/ScreenHeader';
import { useAuthStore } from '@/lib/store';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const DEFAULT_IMAGE = require('@/assets/images/home_header.png');

  const { user, signOut } = useAuthStore();

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
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.profileInitials}>
              <Text style={styles.initialsText}>AB</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user?.name || 'Ante Bucan'}
              </Text>
              <Text style={styles.profileEmail}>
                {user?.email || 'rs7d2jschv@privaterelay.appleid.com'}
              </Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>GENERAL</Text>

          <View style={styles.menuSection}>
            {settingsItem('folder-outline', 'Default Goal', 'Work', true)}
            {settingsItem('calendar-outline', 'Today')}
            {settingsItem('grid-outline', 'Habits')}
            {settingsItem('timer-outline', 'Focus Timer')}
            {settingsItem('moon-outline', 'Dark Mode', 'System')}
            {settingsItem('apps-outline', 'App Icon')}
          </View>

          <Text style={styles.sectionTitle}>CALENDARS</Text>

          <View style={styles.menuSection}>
            {settingsItem('calendar-outline', 'Default')}
            {settingsItem('calendar-outline', 'Other')}
            {settingsItem('calendar-outline', 'Subscribed Calendars')}
          </View>

          <View style={styles.menuSection}>
            {settingsItem('notifications-outline', 'Alerts & Reminders')}
          </View>

          <Text style={styles.sectionTitle}>FEEDBACK</Text>

          <View style={styles.menuSection}>
            {/* Add feedback options here */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function settingsItem(
  iconName: string,
  label: string,
  value?: string,
  hasToggle?: boolean,
) {
  return (
    <TouchableOpacity style={styles.settingsItem}>
      <View style={styles.settingsItemLeft}>
        <Ionicons
          name={iconName as any}
          size={24}
          color="#007AFF"
          style={styles.settingsIcon}
        />
        <Text style={styles.settingsLabel}>{label}</Text>
      </View>
      <View style={styles.settingsItemRight}>
        {value && <Text style={styles.settingsValue}>{value}</Text>}
        {hasToggle && (
          <View style={styles.toggle}>
            <View style={styles.toggleOn} />
          </View>
        )}
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 40,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileInitials: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  initialsText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#8E8E93',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    marginRight: 16,
    color: '#007AFF',
  },
  settingsLabel: {
    color: '#000',
    fontSize: 16,
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsValue: {
    color: '#8E8E93',
    fontSize: 16,
    marginRight: 8,
  },
  toggle: {
    width: 40,
    height: 24,
    backgroundColor: '#34C759',
    borderRadius: 12,
    marginRight: 8,
    padding: 2,
    justifyContent: 'center',
  },
  toggleOn: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5EA',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 4,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});
