import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { YStack, View, Circle, useMedia, Text } from 'tamagui';

export default function Washing() {
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
    <YStack
      ai="center"
      pt={20}
      flexDirection="column"
      gap={220}
      height={media.md ? '20px' : '10px'}>
      <YStack ai="center" jc="center" position="relative">
        <Circle size={200} zIndex={-1} position="absolute" bc="#F5F8FA" top="50%" />
        <View ai="center" top={225 / 8}>
          <Ionicons
            name="shirt-outline"
            size={100}
            style={{ position: 'absolute', top: 10, zIndex: 0 }}
            color="#34ABEE"
          />
          <Animated.View style={{ transform: [{ translateY }] }}>
            <YStack backgroundColor="white" zIndex={2} p={0} width={125}>
              <View bc="#F5F8FA" width={125} height={45} pos="absolute" top={70} />
              <MaterialCommunityIcons
                name="wave"
                style={{ position: 'absolute', top: 10 }}
                size={125}
                color="#34ABEE"
              />
              <MaterialCommunityIcons
                name="wave"
                style={{ position: 'absolute', top: 32 }}
                size={125}
                color="#34ABEE"
              />
            </YStack>
          </Animated.View>
        </View>
      </YStack>
      <View>
        <Text fontWeight="500">Your clothes are still washed.</Text>
        <Text fontWeight="500" textAlign="center">
          will be finished soon
        </Text>
      </View>
    </YStack>
  );
}
