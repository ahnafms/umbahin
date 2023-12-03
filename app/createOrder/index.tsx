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
} from 'tamagui';

export default function CreateOrderPage() {
  const media = useMedia();

  // Dummy data for the list of items
  const initialItems = [
    { name: 'T-Shirt', price: 15, quantity: 2 },
    { name: 'Jeans', price: 30, quantity: 1 },
    { name: 'Socks', price: 5, quantity: 3 },
  ];

  const categories = ['Baju', 'Celana', 'Outer'];

  const [order, setOrder] = useState(initialItems);
  const [totalItems, setTotalItems] = useState(initialItems.length);
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  const addItem = () => {
    if (selectedCategory) {
      const newItem = { name: selectedCategory, price: 20, quantity: 1 };
      setOrder([...order, newItem]);
      setTotalItems(totalItems + 1);
    }
  };

  const increaseQuantity = (index) => {
    const updatedOrder = [...order];
    updatedOrder[index].quantity += 1;
    setOrder(updatedOrder);
  };

  const decreaseQuantity = (index) => {
    const updatedOrder = [...order];
    if (updatedOrder[index].quantity > 1) {
      updatedOrder[index].quantity -= 1;
      setOrder(updatedOrder);
    } else {
      // If quantity is 1, remove the item
      updatedOrder.splice(index, 1);
      setOrder(updatedOrder);
      setTotalItems(totalItems - 1);
    }
  };

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <XStack flex={1} ai="center" px="$5" bg="#ffffff">
      <YStack width="100%" space="$4" align="center">
        <Text fontWeight="700" fontSize={media.md ? 36 : 18}>
          Roumah Laundry
        </Text>

        <XStack width="100%" space="$3">
          <Form flex={1} width={media.md ? '50%' : '70%'} style={{ minWidth: 200, maxWidth: media.md ? '50%' : '70%' }}>
            <YStack space="$2" width="90%">
              <Label color="black" htmlFor="locationInput">
                Location
              </Label>
              <Input
                color="black"
                backgroundColor="white"
                id="locationInput"
                placeholder="Enter your location"
              />
            </YStack>
          </Form>

          <Form flex={1} width={media.md ? '50%' : '70%'} style={{ minWidth: 200, maxWidth: media.md ? '50%' : '70%' }}>
            <YStack space="$2" width="75%">
              <Label color="black" htmlFor="ratingInput">
                Rating
              </Label>
              <select
                id="ratingInput"
                onChange={(e) => setRating(Number(e.target.value))}
                value={rating}
                style={{ width: '100%', padding: 10 }}
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </YStack>
          </Form>
        </XStack>

        {/* Add Category Dropdown */}
        <YStack width="100%" space="$2">
          <Form flex={1} width={media.md ? '50%' : '100%'} style={{ minWidth: 200, maxWidth: media.md ? '50%' : '100%' }}>
            <YStack space="$2" width="100%">
              <Label color="black" htmlFor="categoryInput">
                Category
              </Label>
              <select
                id="categoryInput"
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
                style={{ width: '100%', padding: 10 }}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </YStack>
          </Form>
          <Button onClick={addItem} disabled={!selectedCategory}>
            Add Category
          </Button>
        </YStack>

        {/* Order List */}
        <YStack width="100%" space="$2">
          {order.map((item, index) => (
            <YStack key={index} space="$2" width="100%">
              <Text>{item.name}</Text>
              <Text>{`Price: $${item.price}`}</Text>
              <XStack width="100%">
                <div onClick={() => decreaseQuantity(index)} style={{ cursor: 'pointer' }}>
                  <Text color="red">-</Text>
                </div>
                <Spacer />
                <Text>{`Quantity: ${item.quantity}`}</Text>
                <Spacer />
                <div onClick={() => increaseQuantity(index)} style={{ cursor: 'pointer' }}>
                  <Text color="green">+</Text>
                </div>
              </XStack>
            </YStack>
          ))}
        </YStack>

        {/* Total Items and Total Price */}
        <YStack space="$2" width="100%">
          <Text>{`Total Items: ${totalItems}`}</Text>
          <Text>{`Total Price: $${calculateTotal()}`}</Text>
        </YStack>

        {/* Checkout Button */}
        <Form width="100%" onSubmit={() => console.log('Checkout clicked')}>
          <Form.Trigger asChild>
            <Button>Checkout</Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </XStack>
  );
}
