import { useEffect, useState } from 'react';
import { YStack, H6, ScrollView, Text } from 'tamagui';

import CardOrder from '../../components/CardOrder';
import { getStore } from '../../lib/store';

export default function TabTwoScreen() {
  return (
    <YStack
      backgroundColor="#EDEFF2"
      flex={1}
      alignItems="flex-start"
      justifyContent="flex-start"
      gap="$4">
      <ScrollView px={16} paddingTop="$11">
        <H6 paddingBottom="$5" fontWeight="900" color="#969AAB">
          Current Location
        </H6>
        <YStack flex={1} paddingBottom="$12" flexDirection="column" gap="24" ai="flex-start">
          <CardOrder />
        </YStack>
      </ScrollView>
    </YStack>
  );
}
