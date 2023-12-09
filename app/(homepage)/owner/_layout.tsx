import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function HomepageLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: () => <FontAwesome5 name="file-invoice" size={20} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{ tabBarIcon: () => <Ionicons name="chatbox-outline" size={20} color="black" /> }}
      />
      <Tabs.Screen
        name="history"
        options={{ tabBarIcon: () => <MaterialIcons name="history" size={20} color="black" /> }}
      />
    </Tabs>
  );
}

