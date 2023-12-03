import React, { useState } from 'react';
import { YStack, Text, XStack, useMedia, Button } from 'tamagui';

export default function OrderDetailPage() {
  const [orderDetails, setOrderDetails] = useState({
    orderCode: '123456',
    status: 'In Progress',
    laundrySteps: ['Washing', 'Cleaning', 'Drying', 'Deliver'],
    timestamp: '2023-12-01 15:30:00',
    deliveryAddress: '123 Main Street, Cityville',
    estimatedDeliveryTime: '2023-12-02 10:00:00',
    selectedStep: null,
  });

  const statusOptions = ['Ongoing', 'Finished', 'Not Yet Taken'];

  const media = useMedia();

  const handleStatusChange = (event) => {
    setOrderDetails({ ...orderDetails, status: event.target.value });
  };

  const handleStepClick = (step) => {
    setOrderDetails({
      ...orderDetails,
      selectedStep: step,
    });
  };

// ...

return (
  <YStack flex={1} p={media.md ? "$5" : "$2"} bg="#ffffff" width={media.md ? "100%" : "auto"}>
    {/* Header */}
    <XStack width="100%" space="$8" align="center" p="$2">
      <Button onClick={() => console.log('Go back')} className="custom-button">&lt;</Button>
      <Text fontSize={media.md ? 24 : 18}>Details Order</Text>
      <Button onClick={() => console.log('More options')} className="custom-button">...</Button>
    </XStack>
    
    {/* Add empty space */}
    <YStack height={media.md ? '20px' : '10px'} />

    {/* Laundry Steps */}
    <YStack width="100%" space="$2" p="$2">
      <XStack space="$8" align="center">
        {orderDetails.laundrySteps.map((step, index) => (
          <XStack key={index} space="$1" align="center">
            <Text
              fontWeight={orderDetails.selectedStep === step ? 'bold' : 'normal'}
              onClick={() => handleStepClick(step)}
              style={{ cursor: 'pointer', color: 'black' }}
            >
              {step}
            </Text>
          </XStack>
        ))}
      </XStack>
      {orderDetails.selectedStep && (
        <YStack p="$2" align="center" justify="center">
          <Text fontWeight="bold">Your clothes are still {orderDetails.selectedStep.toLowerCase()}...</Text>
          <Text>Will be finished soon.</Text>
        </YStack>
      )}
    </YStack>

    {/* Add some space */}
    <YStack height="20px" />

    {/* Order Details */}
    <YStack width="100%" space="$2" p="$2">
      <XStack space="$2" align="center">
        <Text>{`Order Code: ${orderDetails.orderCode}`}</Text>
        <Text>Status:</Text>
        <select value={orderDetails.status} onChange={handleStatusChange}>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </XStack>
      <Text>{`Timestamp: ${orderDetails.timestamp}`}</Text>
      <Text>{`Delivery Address: ${orderDetails.deliveryAddress}`}</Text>
      <Text>{`Estimated Delivery Time: ${orderDetails.estimatedDeliveryTime}`}</Text>
    </YStack>
  </YStack>
);

}
