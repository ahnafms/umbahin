import { View, Text } from 'tamagui';

export default function Status({ status }) {
  return (
    <View borderRadius={24} width="$9" paddingHorizontal="$2" paddingVertical={7} bg="#fbc848">
      <Text color="white" fontSize="$3" textAlign="center" fontWeight="bold">
        Ongoing
      </Text>
    </View>
  );
}
