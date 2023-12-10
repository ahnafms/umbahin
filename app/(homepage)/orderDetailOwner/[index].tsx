import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { YStack, View, Text, XStack, useMedia, Button, Spinner, Dialog } from 'tamagui';

import { getUser } from '../../../lib/store/user.store';
import Cleaning from '../../../components/DetailsOrder/Cleaning';
import Deliver from '../../../components/DetailsOrder/Deliver';
import Drying from '../../../components/DetailsOrder/Drying';
import Pickup from '../../../components/DetailsOrder/Pickup';
import Washing from '../../../components/DetailsOrder/Washing';
import Status from '../../../components/Status';
import Completed from '../../../components/DetailsOrder/Completed';

import api from '../../../lib/api';
import { Link } from 'expo-router';

export default function OrderDetailPage() {
  const { index } = useLocalSearchParams();
  const [isOwner, setIsOwner] = useState();
  const [orderDetails, setOrderDetails] = useState({
    orderCode: '123456',
    status: 'In Progress',
    laundrySteps: ['Washing', 'Cleaning', 'Drying', 'Deliver'],
    timestamp: '2023-12-01 15:30:00',
    deliveryAddress: '123 Main Street, Cityville',
    estimatedDeliveryTime: '2023-12-02 10:00:00',
    selectedStep: 'Washing',
  });

  const media = useMedia();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdate = async (status) => {
    if (isOwner || status === 'COMPLETE') {
      const data = await api.patch(
        `/order/${index}`,
        { status },
        {
          toastify: true,
          loadingMessage: 'Updating...',
          successMessage: 'Success!',
        }
      ).then(() => setData((prev) => ({ ...prev, status })));
    }
  };

  const [open, setOpen] = useState(false);

  const originalTimestamp = new Date(data?.laundryIn);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate = originalTimestamp.toLocaleString('id-ID', options);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get(`/order/${index}`);
      const user = await getUser()
      if (user.role === 'CUSTOMER') setIsOwner(false);
      setData(data.data.data[0]);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <YStack jc="center" ai="center" flex={1}>
          <Spinner size="large" />
        </YStack>
      ) : (
        <YStack flex={1} p={media.md ? '$5' : '$2'} bg="#ffffff" width={media.md ? '100%' : 'auto'}>
          <Dialog modal open={open}>
            <Dialog.Portal>
              <Dialog.Overlay
                key="overlay"
                animation="quick"
                opacity={0.5}
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
              <Dialog.Content
                mx="$3"
                bordered
                elevate
                key="content"
                animateOnly={['transform', 'opacity']}
                animation={[
                  'quick',
                  {
                    opacity: {
                      overshootClamping: true,
                    },
                  },
                ]}
                enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                gap="$4">
                <Dialog.Title>Complete order</Dialog.Title>
                <Dialog.Description>
                  Make sure your customer already has the order
                </Dialog.Description>
                <XStack gap="$3" jc="center">
                  <Button onPress={() => setOpen(false)} w="50%">
                    Bual
                  </Button>
                  <Button
                    bc="green"
                    w="50%"
                    onPress={() => {
                      if (data.status === 'DELIVER') {
                        handleUpdate('COMPLETE');
                        setOpen(false);
                      }
                    }}>
                    <Text color='white'>
                    Work > Depo
                    </Text>
                    <MaterialIcons color="white" name="attach-money" size={24} />
                  </Button>
                </XStack>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog>
          {/* Header */}
          <XStack width="100%" jc="space-around" ai="center" p="$2" pt="20%">
            <Button
              icon={<AntDesign name="arrowleft" size={20} color="black" />}
              p={0}
              bg="white"
              borderWidth="$1"
              w="$size.4"
              h="$size.4"
              borderColor="#F2F2F2"
              noTextWrap
              onPress={() => router.push('/(homepage)/owner/orders')}
            />
            <Text fontSize={18}>Details Order</Text>
            <Button
              icon={<Entypo name="dots-three-horizontal" size={20} color="black" />}
              onPress={() => setOpen(true)}
              p={0}
              bg="white"
              borderWidth="$1"
              w="$size.4"
              h="$size.4"
              borderColor="#F2F2F2"
              noTextWrap
            />
          </XStack>
          {/* Add empty space */}
          <YStack>
            {data.status === 'PICKUP' && <Pickup />}
            {data.status === 'WASHING' && <Washing />}
            {data.status === 'CLEANING' && <Cleaning />}
            {data.status === 'DRYING' && <Drying />}
            {data.status === 'DELIVER' && <Deliver />}
            {data.status === 'COMPLETE' && <Completed />}
          </YStack>
          {/* Laundry Steps */}
          <XStack jc="center" space="$7" pt="$8">
            {orderDetails.laundrySteps.map((step, index) => (
              <YStack key={index} space="$1" ai="center">
                {step === 'Washing' && (
                  <Pressable onPress={() => handleUpdate('WASHING')}>
                    <YStack gap={12} ai="center" jc="center" position="relative">
                      <View
                        ai="center"
                        w={50}
                        h={50}
                        borderRadius={100}
                        borderColor={
                          ['WASHING', 'DRYING', 'DELIVER', 'CLEANING'].includes(data.status)
                            ? '#34ABEE'
                            : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}
                        borderWidth="$1">
                        <Ionicons
                          name="shirt-outline"
                          size={30}
                          style={{ position: 'absolute', top: 10, zIndex: 0 }}
                          color={
                            ['WASHING', 'DRYING', 'DELIVER', 'CLEANING'].includes(data.status)
                              ? '#34ABEE'
                              : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}
                        />
                        <View>
                          <YStack backgroundColor="white" zIndex={2} p={0} width={30}>
                            <View bc="white" width={30} height={10} pos="absolute" top={30} />
                            <MaterialCommunityIcons
                              name="wave"
                              style={{ position: 'absolute', top: 14 }}
                              size={30}
                              color={
                                ['WASHING', 'DRYING', 'DELIVER', 'CLEANING'].includes(data.status)
                                  ? '#34ABEE'
                                  : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}
                            />
                            <MaterialCommunityIcons
                              name="wave"
                              style={{ position: 'absolute', top: 19 }}
                              size={30}
                              color={
                                ['WASHING', 'DRYING', 'DELIVER', 'CLEANING'].includes(data.status)
                                  ? '#34ABEE'
                                  : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}
                            />
                          </YStack>
                        </View>
                      </View>
                      <Text
                        fontWeight="600"
                        textAlign="center"
                        color={
                          ['WASHING', 'DRYING', 'DELIVER', 'CLEANING'].includes(data.status)
                            ? '#34ABEE'
                            : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}
                      >
                        {step}
                      </Text>
                    </YStack>
                  </Pressable>
                )}
                {step === 'Cleaning' && (
                  <Pressable onPress={() => handleUpdate('CLEANING')}>
                    <YStack ai="center" jc="space-between" gap={12}>
                      <View ai="center" w={50} h={50}>
                        <YStack ai="center" jc="center">
                          <View
                            ai="center"
                            jc="center"
                            flex={1}
                            w={50}
                            h={50}
                            borderColor={
                              ['DRYING', 'DELIVER', 'CLEANING'].includes(data.status)
                                ? '#34ABEE'
                                : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}
                            borderRadius={100}
                            borderWidth="$1">
                            <MaterialCommunityIcons
                              m="auto"
                              name="washing-machine"
                              size={30}
                              color={
                                ['DRYING', 'DELIVER', 'CLEANING'].includes(data.status)
                                  ? '#34ABEE'
                                  : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}
                            />
                          </View>
                        </YStack>
                      </View>
                      <Text
                        textAlign="center"
                        fontWeight="600"
                        color={
                          ['DRYING', 'DELIVER', 'CLEANING'].includes(data.status)
                            ? '#34ABEE'
                            : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'
                        }>
                        {step}
                      </Text>
                    </YStack>
                  </Pressable>
                )}
                {step === 'Drying' && (
                  <Pressable onPress={() => handleUpdate('DRYING')}>
                    <YStack ai="center" jc="space-between" gap={12}>
                      <View ai="center" w={50} h={50}>
                        <YStack ai="center" jc="center">
                          <View
                            ai="center"
                            jc="center"
                            flex={1}
                            w={50}
                            h={50}
                            borderColor={
                              ['DRYING', 'DELIVER'].includes(data.status) ? '#34ABEE' : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}
                            borderRadius={100}
                            borderWidth="$1">
                            <MaterialIcons
                              m="auto"
                              name="dry-cleaning"
                              size={30}
                              color={
                                ['DRYING', 'DELIVER'].includes(data.status) ? '#34ABEE' : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}
                            />
                          </View>
                        </YStack>
                      </View>
                      <Text
                        fontWeight="600"
                        textAlign="center"
                        color={['DRYING', 'DELIVER'].includes(data.status) ? '#34ABEE' : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}>
                        {step}
                      </Text>
                    </YStack>
                  </Pressable>
                )}
                {step === 'Deliver' && (
                  <Pressable onPress={() => handleUpdate('DELIVER')}>
                    <YStack ai="center" jc="space-between" gap={12}>
                      <View ai="center" w={50} h={50}>
                        <YStack ai="center" jc="center">
                          <View
                            ai="center"
                            jc="center"
                            flex={1}
                            w={50}
                            h={50}
                            borderColor={['DELIVER'].includes(data.status) ? '#34ABEE' : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}
                            borderRadius={100}
                            borderWidth="$1">
                            <MaterialCommunityIcons
                              m="auto"
                              name="motorbike"
                              size={30}
                              color={['DELIVER'].includes(data.status) ? '#34ABEE' : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}
                            />
                          </View>
                        </YStack>
                      </View>
                      <Text
                        fontWeight="600"
                        textAlign="center"
                        color={['DELIVER'].includes(data.status) ? '#34ABEE' : ['COMPLETE'].includes(data.status) ? '#61e6bd' : '#B2B5C1'}>
                        {step}
                      </Text>
                    </YStack>
                  </Pressable>
                )}
              </YStack>
            ))}
          </XStack >
          <YStack width="100%" space="$4" p="$2" pt="$7">
            <XStack space="$2" ai="flex-start" jc="flex-start">
              <Text width="50%" fontSize="$4" fontWeight="600" color="#8A8EA1">
                status
              </Text>
              <View w="50%" flex={1} ai="center">
                <Status status={data.status} />
              </View>
            </XStack>
            <XStack space="$2" ai="flex-start" jc="flex-start">
              <Text width="50%" fontSize="$4" fontWeight="600" color="#8A8EA1">
                laundry in
              </Text>
              <Text width="50%" fontSize="$4" fontWeight="600">
                {formattedDate}
              </Text>
            </XStack>
            <XStack space="$2" ai="flex-start" jc="flex-start">
              <Text width="50%" fontSize="$4" fontWeight="600" color="#8A8EA1">
                Delivery address
              </Text>
              <Text width="50%" fontSize="$4" textAlign="left" fontWeight="600">
                Jl. Sempit lebar panjang no 30 gang buntu
              </Text>
            </XStack>
            <XStack space="$2" jc="flex-start" ai="flex-start">
              <Text width="50%" textAlign="left" fontSize="$4" fontWeight="600" color="#8A8EA1">
                Estimated time
              </Text>
              <Text width="50%" fontSize="$4" textAlign="left" fontWeight="600">
                Finish in 2 days
              </Text>
            </XStack>
            <XStack space="$2" ai="flex-end" jc="center">
              <Button bc='#34ABEE' w='100%' h='$3'>
                <Link href={`/(homepage)/orderDetailOwner/barcode/${index}`}>
                  <Text color='white' fontSize="$6">Payment</Text>
                </Link>
              </Button>
            </XStack>
            {/* <Text>{`Timestamp: ${orderDetails.timestamp}`}</Text> */}
            {/* <Text>{`Delivery Address: ${orderDetails.deliveryAddress}`}</Text> */}
            {/* <Text>{`Estimated Delivery Time: ${orderDetails.estimatedDeliveryTime}`}</Text> */}
          </YStack>

          {/* Additional component */}
        </YStack >
      )
      }
    </>
  );
}
