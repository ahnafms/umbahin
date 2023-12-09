import { View, Text } from 'tamagui';

export default function Status({ status }) {
  return (
    <View
      borderRadius={24}
      width="$9"
      paddingHorizontal="$2"
      paddingVertical={7}
      bg={status === 'COMPLETE' ? '#61E7BE' : '#fbc848'}>
      <Text color="white" fontSize="$3" textAlign="center" fontWeight="bold">
        {status === 'COMPLETE' ? 'Completed' : 'Ongoing'}
      </Text>
    </View>
  );
}
