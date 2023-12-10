import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Octicons, Fontisto, Foundation } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function HomepageLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#34ABEF',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => <Foundation name="home" size={24} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{ tabBarIcon: () => <MaterialIcons name="shopping-cart" size={24} /> }}
      />
      <Tabs.Screen
        name="history"
        options={{ tabBarIcon: () => <MaterialCommunityIcons name="newspaper-variant-outline" size={24} /> }}
      />
    </Tabs>
  );
}

