import { Smartphone,Gamepad,Headphones,Camera,Watch, Laptop } from 'lucide-react'

interface DataType {
  title: string;
  href: string;
  icon: React.ReactNode;
}
export const menuItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
  { name: "Blog", link: "/blog" }
];



// 68fcb3a6-ff18-8325-a395-e7935b9e710e chatGPT
// 68fc8986-61ac-8329-9c42-78af28327734

export const footerLinks = [
  {
    title: "Services",
    links: [
      "Bonus Program",
      "Gift cards",
      "Credit and payment",
      "Service contracts",
      "Non-cash account",
      "Payment"
    ]
  },
  {
    title: "Assistance to the buyer",
    links: [
      "Find an order",
      "Terms of delivery",
      "Exchange and return of goods",
      "Guarantee",
      "Frequently asked questions",
      "Terms of use of the site"
    ]
  }
]

export const categoriesData: DataType[] = [
  { title: "Phone", href: `/category/phone`, icon: <Smartphone /> },
  { title: "Smart Device", href: `/category/Smart Device`, icon: <Watch /> },
  { title: "Cameras", href: `/category/Cameras`, icon: <Camera /> },
  { title: "Headphones", href: `/category/Headphones`, icon: <Headphones /> },
  { title: "Computer", href: `/category/computer`, icon: <Laptop /> },
  { title: "Consoles", href: `/category/Consoles`, icon: <Gamepad /> },
  { title: "Earpod", href: `/category/Earpod`, icon: <Gamepad /> },
  { title: "VR", href: `/category/VR`, icon: <Gamepad /> },
  { title: "Keyboard", href: `/category/Keyboard`, icon: <Gamepad /> },
  { title: "Mouse", href: `/category/Mouse`, icon: <Gamepad /> },

];
    

export const productType = [
  { id: "new", name: "New Arrival" },
  { id: "bestseller", name: "Bestseller" },
  { id: "featured", name: "Featured Products" },
];
export const brandLists =['Apple', 'Samsung', 'Xiaomi', 'OnePlus', 'Oppo', 'Huawei', 'Google','Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI','Sony', 'Bose', 'Sennheiser', 'Beats', 'Audio-Technica', 'JBL', 'Jabra'];
export const batteryList = ['3200 mAh', '4000 mAh', '4500 mAh', '5000 mAh','4880 mAh', '5400 mAh', '4815 mAh', '4700 mAh', '3100 mAh', '4400 mAh',];
export const screenSize = ['5.4 inches', '6.1 inches', '6.3 inches', '6.5 inches', '6.7 inches', '6.9 inches'];
export const memoryList = ['64GB', '128GB', '256GB', '512GB', '1TB'];
export const protectionClass = ['IP53', 'IP54', 'IP67', 'IP68'];
export const screenType = ['OLED', 'AMOLED', 'LCD', 'Retina', 'Dynamic AMOLED'];