import HomeOwner from '../../../components/owner/Home';
import { YStack } from 'tamagui';

export default function TabTwoScreen() {
  return (
    <YStack
      backgroundColor="#EDEFF2"
      flex={1}
      alignItems="flex-start"
      justifyContent="flex-start"
      gap="$4">
      <HomeOwner />
    </YStack>
  );
}
