import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { YStack, View, useMedia, Text } from 'tamagui';

export default function Completed() {
  const translateY = useRef(new Animated.Value(0)).current;

  const media = useMedia();

  const moveToTop = () => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: 15,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      moveToTop();
    });
  };

  useEffect(() => {
    moveToTop();
  }, []);
  return (
    <YStack ai="center" pt={20} flexDirection="column" gap={20} height={media.md ? '20px' : '10px'}>
      <YStack ai="center" jc="center" position="relative">
        <View bg="#F5F8FA" w={200} h={200} jc="center" ai="center" borderRadius={100}>
          <Animated.View style={{ transform: [{ translateY }] }}>
            <View ai="center" jc="center" pb={16} flex={1} w={200} h={200} borderRadius={100}>
              <AntDesign name="checkcircleo" size={125} bg="#F5F8FA" color="#34ABEE" />
            </View>
          </Animated.View>
        </View>
      </YStack>
      <View>
        <Text fontWeight="500">Order has completed.</Text>
        <Text fontWeight="500" textAlign="center">
          Say what?
        </Text>
      </View>
    </YStack>
  );
}
