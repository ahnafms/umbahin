import { useFonts } from 'expo-font';
import { Slot, SplashScreen, router } from 'expo-router';
import React, { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';

import Notifications from '../components/Toaster';
import { getUser } from '../lib/store/user.store';
import config from '../tamagui.config';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'auth',
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    (async () => {
      const user = await getUser();
      // console.log(user.role)
      // if(user.role == "CUSTOMER") router.push('/(homepage)/customer/');
      // else if (user.role == "OWNER") router.push('/(homepage)/owner/');
    })();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <Slot />
      <Notifications />
    </TamaguiProvider>
  );
}
