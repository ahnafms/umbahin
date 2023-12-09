import HomeOwner from '../../../components/owner/Home';
import { YStack } from 'tamagui';

export default function IndexOwner() {
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
