import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { YStack, Spinner, Text, XStack, useMedia, Form, Button, Input, Label } from 'tamagui';

export default function Page() {
  const media = useMedia();
  const [status, setStatus] = useState('off');

  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);
  return (
    <XStack flex={1} ai="center" px="$5" bg="#ffffff">
      <YStack space="$6" width="100%">
        <YStack space="$2" height={100}>
          <Text fontWeight="700" fontSize={media.md ? 36 : 18} marginBottom={10}>
            Register
          </Text>
          <Text fontSize={20}>Create new account for you</Text>
        </YStack>
        <YStack space="$1" width="100%">
          <Form onSubmit={() => setStatus('submitting')}>
            <YStack space="$2" height={100}>
              <Label color="black" htmlFor="name">
                Name
              </Label>
              <Input color="black" backgroundColor="white" id="name" placeholder="name" />
            </YStack>
            <YStack space="$2" height={100}>
              <Label color="black" htmlFor="email">
                Email
              </Label>
              <Input color="black" backgroundColor="white" id="email" placeholder="email" />
            </YStack>
            <YStack space="$2" height={100}>
              <Label color="black" htmlFor="password">
                Password
              </Label>
              <Input
                secureTextEntry
                color="black"
                backgroundColor="white"
                id="password"
                placeholder="password"
              />
            </YStack>
            <Text textAlign="right">Forget your password?</Text>
            <Form.Trigger marginTop="$4" asChild disabled={status !== 'off'}>
              <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}>
                Register
              </Button>
            </Form.Trigger>
          </Form>
        </YStack>
      </YStack>
      <XStack
        gap={5}
        paddingTop={40}
        position="absolute"
        left={0}
        right={0}
        bottom="$10"
        justifyContent="center"
        alignItems="center">
        <Text>Don't have an account?</Text>
        <Pressable onPress={() => router.push('/')}>
          <Text fontWeight="bold">Login</Text>
        </Pressable>
      </XStack>
    </XStack>
  );
}
