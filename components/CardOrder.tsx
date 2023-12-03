import { View, H5, Text, YStack, XStack, Separator, Circle } from 'tamagui';
export default function CardOrder() {
  return (
    <XStack
      flex={1}
      justifyContent="center"
      fd="column"
      ai="center"
      bg="white"
      padding="$5"
      gap={8}
      borderRadius={16}>
      <YStack maxWidth="100%" space="$4">
        <XStack jc="space-between" ai="center" width="100%">
          <H5 fontWeight="800" color="black">
            Roumah Laundry
          </H5>
          <View
            borderRadius={24}
            width="$9"
            paddingHorizontal="$2"
            paddingVertical={7}
            bg="#fbc848">
            <Text color="white" fontSize="$3" textAlign="center" fontWeight="bold">
              Ongoing
            </Text>
          </View>
        </XStack>
      </YStack>
      <YStack maxWidth="100%" space="$4">
        <XStack>
          <Text color="#9EA2B0" fontWeight="600">
            August 24,2022/07.25pm
          </Text>
        </XStack>
        <Separator borderColor="#9EA2B0" />
        <XStack width="100%" jc="space-between">
          <XStack ai="center" gap="5">
            <Circle size={14} bc="#34ABEE" />
            <Text fontWeight="700" fontSize={12}>
              Washing
            </Text>
          </XStack>
          <XStack ai="center" gap="5">
            <Circle size={14} bc="#34ABEE" />
            <Text fontWeight="700" fontSize={12}>
              Cleaning
            </Text>
          </XStack>
          <XStack ai="center" gap="5">
            <Circle size={14} bc="#34ABEE" />
            <Text fontWeight="700" fontSize={12}>
              Drying
            </Text>
          </XStack>
          <XStack ai="center" gap="5">
            <Circle size={14} bc="#BABDC8" />
            <Text fontWeight="700" fontSize={12}>
              Deliver
            </Text>
          </XStack>
        </XStack>
      </YStack>
    </XStack>
  );
}
