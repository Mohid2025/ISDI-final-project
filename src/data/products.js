import MinimalLampImage from "../assets/images/MinimalLight.png"
import ComfortChairImage from "../assets/images/ComfortChair.png"
import BluetoothSpeakerImage from "../assets/images/BluetoothSpeaker.png"
import CoffeeMugImage from "../assets/images/CoffeeMug.png"

const products = [
  {
    id: 1,
    name: "Minimal Lamp",
    price: 29.99,
    short_description: "A modern minimalist lamp for your desk.",
    image: MinimalLampImage
  },
  {
    id: 2,
    name: "Comfort Chair",
    price: 109.00,
    short_description: "Comfortable chair for long coding sessions.",
    image: ComfortChairImage
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 49.5,
    short_description: "Portable speaker with great sound.",
    image: BluetoothSpeakerImage
  },
  {
    id: 4,
    name: "Coffee Mug",
    price: 12.25,
    short_description: "Keeps your drink warm while you code.",
    image: CoffeeMugImage
  }
]

export default products
