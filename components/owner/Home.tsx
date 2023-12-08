import { Feather } from '@expo/vector-icons';
import CardOrder from '../CardOrder';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { H6, ScrollView, XStack, YStack } from 'tamagui';

export default function HomeOwner() {
  return (
    <ScrollView px={16} paddingTop="$11">
      <XStack flex={1} bg="white" gap={12} padding={12} mb={32} borderRadius={14}>
        <Feather name='search' size={24} color="gray" />
        <Link href="/search/" asChild>
          <Pressable>
            <H6 color="$gray10">
              Find the nearest laundry service
            </H6>
          </Pressable>
        </Link>
      </XStack>
      <YStack flex={1} paddingBottom="$12" flexDirection="column" gap={24} ai="flex-start">
        <CardOrder />
      </YStack>
    </ScrollView>
  );
}
