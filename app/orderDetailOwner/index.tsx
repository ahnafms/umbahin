import React, { useState } from 'react';
import { YStack, Text, XStack, useMedia, Button } from 'tamagui';
import { GiWashingMachine } from "react-icons/gi";
import { MdOutlineDryCleaning } from "react-icons/md";
import { BiSolidDryer } from "react-icons/bi";
import { CiDeliveryTruck } from "react-icons/ci";

class Question extends React.Component {
  render() {
    return (
      <>
        <GiWashingMachine />
        <MdOutlineDryCleaning />
        <BiSolidDryer />
        <CiDeliveryTruck />
      </>
    );
  }

}

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statusOptions = ['Ongoing', 'Finished', 'Not Yet Taken'];

  const media = useMedia();

  const handleStatusChange = (event) => {
    setOrderDetails({ ...orderDetails, status: event.target.value });
  };

  const handleDropdownToggle = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  const handleStepClick = (step) => {
    setOrderDetails({
      ...orderDetails,
      selectedStep: step,
    });
  };

  return (
    <YStack flex={1} p={media.md ? '$5' : '$2'} bg="#ffffff" width={media.md ? '100%' : 'auto'}>
      {/* Header */}
      <XStack width="100%" space="$8" ai="center" p="$2">
        <Button onPress={() => console.log('Go back')} className="custom-button">
          &lt;
        </Button>
        <Text fontSize={media.md ? 24 : 18}>Details Order</Text>
        <Button onPress={() => console.log('More options')} className="custom-button">
          ...
        </Button>
      </XStack>
      {/* Add empty space */}
      <YStack height={media.md ? '20px' : '10px'} />

      {/* Laundry Steps */}
      <YStack width="100%" space="$2" p="$2">
        <XStack space="$8" ai="center">
          {orderDetails.laundrySteps.map((step, index) => (
            <YStack key={index} space="$1" ai="center">
              {step === 'Washing' && (
                <GiWashingMachine style={{ fontSize: '24px', color: orderDetails.selectedStep === step ? 'blue' : 'gray' }} />
              )}
              {step === 'Cleaning' && (
                <MdOutlineDryCleaning style={{ fontSize: '24px', color: orderDetails.selectedStep === step ? 'blue' : 'gray' }} />
              )}
              {step === 'Drying' && (
                <BiSolidDryer style={{ fontSize: '24px', color: orderDetails.selectedStep === step ? 'blue' : 'gray' }} />
              )}
              {step === 'Deliver' && (
                <CiDeliveryTruck style={{ fontSize: '24px', color: orderDetails.selectedStep === step ? 'blue' : 'gray' }} />
              )}
              <Text
                fontWeight={orderDetails.selectedStep === step ? 'bold' : 'normal'}
                onPress={() => handleStepClick(step)}
                style={{ cursor: 'pointer', color: orderDetails.selectedStep === step ? 'black' : 'gray' }}
              >
                {step}
              </Text>
            </YStack>
          ))}
        </XStack>
        {orderDetails.selectedStep && (
         <YStack p="$10" style={{ textAlign: 'center' }} height="100%">
    <Text fontWeight="bold">Your clothes are still {orderDetails.selectedStep.toLowerCase()}...</Text>
    <Text>Will be finished soon.</Text>
  </YStack>
        )}
      </YStack>

      {/* Add some space */}
      <YStack height="20px" />
      <YStack width="100%" space="$2" p="$2">
        <XStack space="$2" ai="center">
          <Text>{`Order Code: ${orderDetails.orderCode}`}</Text>
          <Text>Status:</Text>
          <div className={`custom-dropdown ${isDropdownOpen ? 'open' : ''}`}>
            <select
              value={orderDetails.status}
              onChange={handleStatusChange}
              onFocus={() => handleDropdownToggle(true)}
              onBlur={() => handleDropdownToggle(false)}
              style={{
                borderRadius: '0.5rem',
                backgroundColor:
                  orderDetails.status === 'Ongoing'
                    ? 'yellow'
                    : orderDetails.status === 'Not Yet Taken'
                    ? 'red'
                    : orderDetails.status === 'Finished'
                    ? 'green'
                    : 'inherit', // Set a default background color for unselected options
                color: 'black', // Set text color to ensure visibility
              }}
            >
              {statusOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                  style={{
                    backgroundColor:
                      option === 'Ongoing'
                        ? 'white'
                        : option === 'Not Yet Taken'
                        ? 'white'
                        : option === 'Finished'
                        ? 'white'
                        : 'inherit',
                    color: 'black',
                  }}
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
        </XStack>
        <Text>{`Timestamp: ${orderDetails.timestamp}`}</Text>
        <Text>{`Delivery Address: ${orderDetails.deliveryAddress}`}</Text>
        <Text>{`Estimated Delivery Time: ${orderDetails.estimatedDeliveryTime}`}</Text>
      </YStack>

      {/* Additional component */}
      <Question />
    </YStack>
  );
}
