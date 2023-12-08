import { XStack, YStack, Card, Text, Button, Image, Separator, Theme, ScrollView } from 'tamagui';
import { IoLocationSharp } from "react-icons/io5";
import { CiSearch, CiBellOn } from "react-icons/ci";
import { Stack } from 'expo-router';

// Homepage
export default function Homepage() {
  return (
    <Theme name="light">
      <YStack>
        <XStack px="$5" marginTop="$7">
          <YStack flex={1}>
            <Text fontSize='$5' color='#929292'>Current Location</Text>
            <XStack marginTop='$1'>
              <IoLocationSharp size={24} color='#34ABEF'/>
              <Text marginStart='$2' fontSize='$6' fontWeight="700">Semarang, East Java</Text>
            </XStack>
          </YStack>
          <YStack borderColor='#e5e5e5' borderWidth='1px' borderRadius='$5' padding='$2'>
            <CiBellOn size={30}/>
          </YStack>
        </XStack>

        <XStack px="$5" py="$3" marginTop="$4">
          <XStack flex={1} alignItems="center" bg='#ffffff' borderRadius='$5' py='$3' px='$5'>
            <CiSearch size={24}/>
            <Text fontSize='$5' marginStart='$4' color='#9A9A9A' fontWeight='500'>Find the nearest laundromat</Text>
          </XStack>
        </XStack>

        <XStack px="$5" py="$3" marginTop="$1">
        <XStack width='100%' px="$4" py="$4" backgroundColor='#1499E3' borderRadius='$5' shadowColor='#1388C9' shadowOffset={{ width: 0, height: 10 }} shadowOpacity={0.2} shadowRadius={10}>
            <YStack width='60%'>
              <Text color='#F2F2F2' fontWeight='300'>Roumah Laundry</Text>
              <Text marginTop='$4' color='#F2F2F2' fontSize='$7' fontWeight='500'>Your clothes will finish in 1 Days</Text>
              {/* Underline text */}
              <Text marginTop='$4' color='#F2F2F2' fontSize='$5' fontWeight='500' textDecorationLine='underline'>View Details</Text>
            </YStack>
            <YStack flex={1} alignItems='center' justifyContent='center'>
              <Image source={{ uri: 'https://www.svgrepo.com/show/287753/laundry-washer.svg' }} width='100px' height='100px' />
            </YStack>
          </XStack>
        </XStack>
        
        <XStack px="$5" marginTop="$3">
          <YStack flex={1}>
            <Text fontSize='$5' fontWeight='700'>Nearest laundry</Text>
          </YStack>
          <YStack>
            <Text fontSize='$5' fontWeight='700' color="#34ABEF" textAlign='right'>See More</Text>
          </YStack>
        </XStack>

        <ScrollView horizontal>
          <XStack px="$5" py="$3" marginTop="$2" gap="$3">
            <YStack borderRadius="$5" padding={4} backgroundColor="#ffffff">
              <XStack width="$13" height="$10">
                <Image
                  source={{
                    uri: '/assets/card.jpg'
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 5,
                    overflow: 'hidden'
                  }} />
              </XStack>
              <YStack px="$2" paddingTop="$2">
                <Text fontWeight="700" fontSize="$5">Roumah Laundry</Text>
                <XStack py="$2">
                  <XStack flex={1} gap="$1" alignItems='center'>
                    <IoLocationSharp size={17} color='#34ABEF'/>
                    <Text fontSize="$3" fontWeight="500" color="#929292">250 m</Text>
                  </XStack>
                  <XStack>
                    <Text fontSize="$3" fontWeight="600">Rp. 4000</Text>
                    <Text fontSize="$3" fontWeight="600" color="#929292">/kg</Text>
                  </XStack>
                </XStack>
              </YStack>
            </YStack>
            <YStack borderRadius="$5" padding={4} backgroundColor="#ffffff">
              <XStack width="$13" height="$10">
                <Image
                  source={{
                    uri: '/assets/card.jpg'
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 5,
                    overflow: 'hidden'
                  }} />
              </XStack>
              <YStack px="$2" paddingTop="$2">
                <Text fontWeight="700" fontSize="$5">Roumah Laundry</Text>
                <XStack py="$2">
                  <XStack flex={1} gap="$1" alignItems='center'>
                    <IoLocationSharp size={17} color='#34ABEF'/>
                    <Text fontSize="$3" fontWeight="500" color="#929292">250 m</Text>
                  </XStack>
                  <XStack>
                    <Text fontSize="$3" fontWeight="600">Rp. 4000</Text>
                    <Text fontSize="$3" fontWeight="600" color="#929292">/kg</Text>
                  </XStack>
                </XStack>
              </YStack>
            </YStack>
            <YStack borderRadius="$5" padding={4} backgroundColor="#ffffff">
              <XStack width="$13" height="$10">
                <Image
                  source={{
                    uri: '/assets/card.jpg'
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 5,
                    overflow: 'hidden'
                  }} />
              </XStack>
              <YStack px="$2" paddingTop="$2">
                <Text fontWeight="700" fontSize="$5">Roumah Laundry</Text>
                <XStack py="$2">
                  <XStack flex={1} gap="$1" alignItems='center'>
                    <IoLocationSharp size={17} color='#34ABEF'/>
                    <Text fontSize="$3" fontWeight="500" color="#929292">250 m</Text>
                  </XStack>
                  <XStack>
                    <Text fontSize="$3" fontWeight="600">Rp. 4000</Text>
                    <Text fontSize="$3" fontWeight="600" color="#929292">/kg</Text>
                  </XStack>
                </XStack>
              </YStack>
            </YStack>
          </XStack>
        </ScrollView>
      </YStack>
    </Theme>
  );
}