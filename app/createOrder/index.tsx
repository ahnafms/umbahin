import React, { useState } from 'react';
import {
  YStack,
  Text,
  XStack,
  useMedia,
  Form,
  Button,
  Input,
  Label,
  Spacer,
  Theme,
  Image
} from 'tamagui';
import { Entypo } from '@expo/vector-icons';

export default function CreateOrderPage() {
  const media = useMedia();

  const [selectedFeature, setSelectedFeature] = useState('');

  const features = [
    { id: 1, name: 'Cuci Kering' },
    { id: 2, name: 'Cuci Basah' },
    { id: 3, name: 'Cuci Setrika' },
  ];

  const chooseFeature = (featureId: number) => {
    const selectedFeature = features.find((feature) => feature.id === featureId);
    if (selectedFeature) {
      setSelectedFeature(selectedFeature.name);
    }
  };

  const submitOrder = () => {
    // Logic to submit the order
    console.log('Order submitted!');
  };

  return (
    // <YStack>
    //   <Text>Select a feature:</Text>
    //   <XStack>
    //     {features.map((feature) => (
    //       <Button key={feature.id} onPress={() => chooseFeature(feature.id)}>
    //         <Text>{feature.name}</Text>
    //       </Button>
    //     ))}
    //   </XStack>
    //   <Text>Selected feature: {selectedFeature}</Text>
    //   <Button onPress={submitOrder}>
    //     <Text >Submit Order</Text>
    //   </Button>
    // </YStack>
    <Theme name="light">
      <YStack pt="$11" width="100%" height="100%" bg="$gray3">
        <XStack px="$5" py="$3" alignContent='center' justifyContent='center'>
          <Text fontSize={24} fontWeight={700}>
            Roumah Laundry
          </Text>
        </XStack>
        <XStack px="$5" py="$3">
          <XStack flex={1} bg="white" gap={2} padding={12} borderRadius={14} alignContent='center'>
            <Entypo name="location-pin" size={24} color='#34ABEF'/>
            <Text marginStart='$2' fontSize='$6' color='#929292'>Jl. Sempit</Text>
          </XStack>
        </XStack>
        <XStack height='$15' backgroundColor='#222222' mx='$5' borderRadius={10}>
          <Image
            source={{
              uri: 'https://laundry8plm.b-cdn.net/wp-content/uploads/2023/02/apa-itu-laundry.jpg',
            }}
            style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 10 }}
            />
        </XStack>
        <XStack px="$5" py="$3" mt="$5">
          <Text fontSize={20} fontWeight={500}>
            Pilih Layanan
          </Text>
        </XStack>
        <YStack px="$5" py="$3" gap="$2">
          {features.map((feature) => (
            <Button 
              key={feature.id}
              backgroundColor={
                (selectedFeature === feature.name) ? '#34ABEF' : '#ffffff'
              }
              onPress={(focused) => {
                chooseFeature(feature.id)
              }}
              borderColor={
                (selectedFeature === feature.name) ? '#34ABEF' : '#ffffff'
              }>
              <Text
                fontWeight={600}
                color={
                  (selectedFeature === feature.name) ? '#ffffff' : '#000000'
                }>{feature.name}</Text>
            </Button>
          ))}
        </YStack>
        <YStack px="$5" py="$3" mt="$5" height='100%' backgroundColor='#ffffff'>
          <XStack mt="$5">
            <YStack flex={1} gap={2}>
              <Text fontSize={20}>
                Berat
              </Text>
              <Text fontSize={24} fontWeight={700}>
                2 Kg
              </Text>
            </YStack>
            <YStack gap={2}>
              <Text fontSize={20}>
                Total Harga
              </Text>
              <Text fontSize={24} fontWeight={700}>
                Rp. 4000
              </Text>
            </YStack>
          </XStack>
          <YStack py="$3" mt="$5">
          <Button backgroundColor='#34ABEF' onPress={submitOrder}>
            <Text fontWeight={600} fontSize={20} color='#ffffff'>Pesan Sekarang</Text>
          </Button>
        </YStack>
        </YStack>
      </YStack>
    </Theme>
  );
}
