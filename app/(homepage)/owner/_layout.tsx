import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function HomepageLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#34ABEF',
        tabBarInactiveTintColor: '#929292',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="shopping-cart" size={24} color={focused ? '#34ABEF' : '#929292'} />
          ),
          title: 'Orders',
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              size={24}
              color={focused ? '#34ABEF' : '#929292'}
            />
          ),
          title: 'History',
        }}
      />
    </Tabs>
  );
}
