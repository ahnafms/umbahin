import CardOrder from '../CardOrder';
import { ScrollView, YStack } from 'tamagui';

export default function HomeOwner() {
  return (
    <ScrollView px={16} paddingTop="$11">
      <YStack flex={1} paddingBottom="$12" flexDirection="column" gap={24} ai="flex-start">
        <CardOrder />
      </YStack>
    </ScrollView>
  );
}
