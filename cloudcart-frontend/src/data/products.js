import headphones from "../assets/images/headphones.jpeg";
import smartwatch from "../assets/images/smartwatch.jpeg";
import backpack from "../assets/images/backpack.jpeg";
import gamingMouse from "../assets/images/gaming-mouse.jpeg";
import mechanicalKeyboard from "../assets/images/mechanical-keyboard.jpeg";
import bluetoothSpeaker from "../assets/images/bluetooth-speaker.jpeg";
import usbCharger from "../assets/images/usb-c-charger.jpeg";
import monitor4k from "../assets/images/4k-monitor.jpeg";
import fitnessTracker from "../assets/images/fitness-tracker.jpeg";
import wirelessEarbuds from "../assets/images/wireless-earbuds.jpeg";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 79.99,
    image: headphones,
    rating:4.5,
    description: "High-quality wireless headphones with noise cancellation.",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 129.99,
    image: smartwatch,
    rating:3.6,
    description: "Smart watch with fitness tracking and notifications.",
  },
  {
    id: 3,
    name: "Laptop Backpack",
    category: "Accessories",
    price: 49.99,
    image: backpack,
    rating:4.9,
    description: "Durable backpack for laptops and daily travel.",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    category: "Gaming",
    price: 39.99,
    image: gamingMouse,
    rating:4.4,
    description: "Ergonomic gaming mouse with fast response time.",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    category: "Gaming",
    price: 89.99,
    image: mechanicalKeyboard,
    rating:5.0,
    description: "RGB mechanical keyboard for gaming and productivity.",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 59.99,
    image: bluetoothSpeaker,
    rating:4.2,
    description: "Portable Bluetooth speaker with powerful sound.",
  },
  {
    id: 7,
    name: "USB-C Charger",
    category: "Electronics",
    price: 24.99,
    image: usbCharger,
    rating:4.2,
    description: "Fast USB-C charger for phones, tablets, and laptops.",
  },
  {
    id: 8,
    name: "4K Monitor",
    category: "Electronics",
    price: 299.99,
    image: monitor4k,
    rating:4.8,
    description: "Ultra HD 4K monitor for work, design, and gaming.",
  },
  {
    id: 9,
    name: "Fitness Tracker",
    category: "Electronics",
    price: 69.99,
    image: fitnessTracker,
    rating:4.9,
    description: "Fitness tracker with heart-rate and sleep monitoring.",
  },
  {
    id: 10,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 99.99,
    image: wirelessEarbuds,
    rating:3.9,
    description: "Compact wireless earbuds with long battery life.",
  },
];

export default products;