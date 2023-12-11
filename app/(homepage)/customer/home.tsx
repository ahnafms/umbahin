import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { XStack, H6, YStack, Text, Image, Theme, ScrollView } from 'tamagui';

import { getLaundryList } from '../../../lib/store/laundry';

export default function HomeCustomer() {
  const [laundry, setLaundry] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getLaundryList();
      setLaundry(res);
    })();
  }, []);

  return (
    <Theme name="light">
      <YStack pt="$11" width="100%" height="100%" bg="$gray3">
        <XStack px="$5" py="$3">
          <YStack flex={1}>
            <Text fontSize="$5" color="#929292">
              Current Location
            </Text>
            <XStack marginTop="$1">
              <Entypo name="location-pin" size={24} color="#34ABEF" />
              <Text marginStart="$2" fontSize="$6" fontWeight="700">
                Keputih, Surabaya
              </Text>
            </XStack>
          </YStack>
        </XStack>
        <XStack px="$5" py="$3">
          <XStack flex={1} bg="white" gap={12} padding={12} borderRadius={14}>
            <Feather name="search" size={24} color="gray" />
            <Link href="/search/" asChild>
              <Pressable>
                <H6 color="$gray10">Find the nearest laundry</H6>
              </Pressable>
            </Link>
          </XStack>
        </XStack>
        <XStack px="$5" py="$3">
          <XStack
            width="100%"
            px="$4"
            py="$4"
            backgroundColor="#1499E3"
            borderRadius="$5"
            shadowColor="#1388C9"
            shadowOffset={{ width: 0, height: 10 }}
            shadowOpacity={0.2}
            shadowRadius={10}>
            <YStack width="60%">
              <Text color="#F2F2F2" fontWeight="300">
                Jaya Makmur Laundry
              </Text>
              <Text marginTop="$4" color="#F2F2F2" fontSize="$7" fontWeight="500">
                Your clothes will finish in 1 Days
              </Text>

              <Link href="/(homepage)/customer/orders" asChild>
                <Pressable>
                  <Text
                    marginTop="$4"
                    color="#F2F2F2"
                    fontSize="$5"
                    fontWeight="500"
                    textDecorationLine="underline">
                    View Your Orders
                  </Text>
                </Pressable>
              </Link>
            </YStack>
            <YStack flex={1} alignItems="center" justifyContent="center">
              <MaterialIcons name="local-laundry-service" size={128} color="white" />
            </YStack>
          </XStack>
        </XStack>

        <XStack px="$5" marginTop="$3">
          <YStack flex={1}>
            <Text fontSize="$5" fontWeight="700">
              Nearest laundry
            </Text>
          </YStack>
          <YStack>
            <Text fontSize="$5" fontWeight="700" color="#34ABEF" textAlign="right">
              See More
            </Text>
          </YStack>
        </XStack>

        <XStack>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack px="$5" py="$3" marginTop="$2" gap="$3">
              {laundry &&
                laundry.map((l, idx) => (
                  <CardService
                    key={idx}
                    url={ImageService[idx % ImageService.length]}
                    name={l.name}
                    id={l.id}
                  />
                ))}
            </XStack>
          </ScrollView>
        </XStack>
      </YStack>
    </Theme>
  );
}

const ImageService = [
  'https://www.flokq.com/blog/wp-content/uploads/2020/06/juditta-1024x683.jpg',
  'https://www.flokq.com/blog/wp-content/uploads/2020/06/clop1-1024x1024.jpg',
  'https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_880/https://www.flokq.com/blog/wp-content/uploads/2022/06/permintaan-jasa-laundry-meningkat-antarafoto.jpg',
  'https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_600/https://www.flokq.com/blog/wp-content/uploads/2022/06/Memilih-Laundry-Kiloan-Jakarta-Barat-Dengan-Pelayanan-Terbaik.jpg',
  'https://assets.terkini.id/static/media/2023/05/terkiniid_jasa-laundry-terbaik-696x385.jpg',
  'https://laundry.or.id/wp-content/uploads/2018/03/lor-laundry-hemat-50-persen.jpg',
];
const CardService = ({
  url,
  name,
  distance = 200,
  id
}: {
  url: string;
  name: string;
  distance?: number;
  id : string
}) => {
  return (
    <YStack
      flex={1}
      flexDirection="column"
      justifyContent="space-between"
      borderRadius="$5"
      width="$15"
      padding={4}
      backgroundColor="#ffffff">
      <Link href={"/(homepage)/createOrder/" + id} asChild>
        <Pressable>
          <XStack width="100%" height="$12">
            <Image
              source={{
                uri: url,
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 5,
                overflow: 'hidden',
              }}
            />
          </XStack>
          <YStack px="$2" paddingVertical="$2">
            <Text fontWeight="700" fontSize="$5">
              {name}
            </Text>
            <XStack py="$2">
              <XStack flex={1} gap="$1" alignItems="center">
                <Entypo name="location-pin" size={17} color="black" />
                <Text fontSize="$3" fontWeight="500" color="#929292">
                  {distance} m
                </Text>
              </XStack>
              {/* <XStack>
              <Text fontSize="$3" fontWeight="600">
                Rp. 4000
              </Text>
              <Text fontSize="$3" fontWeight="600" color="#929292">
                /kg
              </Text>
            </XStack> */}
            </XStack>
          </YStack>
        </Pressable>
      </Link>
    </YStack>
  );
};
