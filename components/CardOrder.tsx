import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { H5, Text, YStack, XStack, Separator, Circle } from 'tamagui';

import Status from './Status';

export default function CardOrder({ id, status, name, laundryIn }) {
  const date = new Date(laundryIn);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate = date.toLocaleString('id-ID', options);

  return (
    <Pressable onPress={() => router.push(`/orderDetailOwner/${id}`)}>
      <XStack
        justifyContent="center"
        fd="column"
        ai="center"
        bg="white"
        paddingHorizontal={20}
        paddingVertical={20}
        gap={8}
        borderRadius={16}>
        <YStack maxWidth="100%" space="$4">
          <XStack jc="space-between" ai="center" width="100%">
            <H5 fontWeight="800" color="black">
              {name}
            </H5>
            <Status />
          </XStack>
        </YStack>
        <YStack maxWidth="100%" space="$4">
          <XStack>
            <Text color="#9EA2B0" fontWeight="600">
              {formattedDate}
            </Text>
          </XStack>
          <Separator borderColor="#9EA2B0" />
          <XStack width="100%" jc="space-between">
            <YStack ai="center" gap={10}>
              <Circle
                size={14}
                bc={
                  status === ('PICKUP' || 'WASHING' || 'CLEANING' || 'DRYING' || 'DELIVER')
                    ? '#34ABEE'
                    : '#BABDC8'
                }
              />
              <Text fontWeight="700" fontSize={12}>
                Pickup
              </Text>
            </YStack>
            <YStack ai="center" gap={10}>
              <Circle
                size={14}
                bc={
                  status === ('WASHING' || 'CLEANING' || 'DRYING' || 'DELIVER')
                    ? '#34ABEE'
                    : '#BABDC8'
                }
              />
              <Text fontWeight="700" fontSize={12}>
                Washing
              </Text>
            </YStack>
            <YStack ai="center" gap={10}>
              <Circle
                size={14}
                bc={status === ('CLEANING' || 'DRYING' || 'DELIVER') ? '#34ABEE' : '#BABDC8'}
              />
              <Text fontWeight="700" fontSize={12}>
                Cleaning
              </Text>
            </YStack>
            <YStack ai="center" gap={10}>
              <Circle size={14} bc={status === ('DRYING' || 'DELIVER') ? '#34ABEE' : '#BABDC8'} />
              <Text fontWeight="700" fontSize={12}>
                Drying
              </Text>
            </YStack>
            <YStack ai="center" gap={10}>
              <Circle size={14} bc={status === 'DELIVER' ? '#34ABEE' : '#BABDC8'} />
              <Text fontWeight="700" fontSize={12}>
                Deliver
              </Text>
            </YStack>
          </XStack>
        </YStack>
      </XStack>
    </Pressable>
  );
}
