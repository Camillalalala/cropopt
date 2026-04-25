import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/supabase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function registerForPushNotifications(): Promise<string | null> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('disease-alerts', {
      name: 'Disease Alerts',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  const { status } = existing === 'granted'
    ? { status: existing }
    : await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    console.log('Push notification permission denied');
    return null;
  }

  try {
    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  } catch (e) {
    console.warn('Could not get push token:', e);
    return null;
  }
}

export async function saveDeviceToken(
  pushToken: string,
  lat: number,
  lng: number,
): Promise<void> {
  const { error } = await supabase.from('devices').upsert(
    { push_token: pushToken, latitude: lat, longitude: lng },
    { onConflict: 'push_token' },
  );
  if (error) console.warn('Failed to save device token:', error.message);
}
