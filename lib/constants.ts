export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
export const APP_NAME = 'Biovision Africa Trust';

// Fallback data when APIs fail
export const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Green Apples",
    description: "Fresh organic green apples from our certified farmers",
    price: 2.99,
    originalPrice: 3.99,
    image: "/images/greenapples.png",
    category: "Fruits",
    seller: "Mr.food",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    tags: ["Organic", "Fresh", "Healthy"]
  },
  {
    id: 2,
    name: "Chinese Cabbage",
    description: "Crisp and fresh Chinese cabbage, perfect for salads and stir-fries",
    price: 1.99,
    originalPrice: 2.99,
    image: "/images/chinese-cabbage.png",
    category: "Vegetables",
    seller: "Mr.food",
    rating: 4.2,
    reviews: 89,
    inStock: true,
    tags: ["Organic", "Fresh", "Vegetarian"]
  },
  {
    id: 3,
    name: "Lettuce",
    description: "Fresh organic lettuce leaves for your healthy meals",
    price: 1.49,
    originalPrice: 2.49,
    image: "/images/lettuces.png",
    category: "Vegetables",
    seller: "Mr.food",
    rating: 4.3,
    reviews: 156,
    inStock: true,
    tags: ["Organic", "Fresh", "Salad"]
  },
  {
    id: 4,
    name: "Green Peppers",
    description: "Vibrant green peppers packed with vitamins and flavor",
    price: 2.49,
    originalPrice: 3.49,
    image: "/images/pepper.png",
    category: "Vegetables",
    seller: "Mr.food",
    rating: 4.1,
    reviews: 67,
    inStock: true,
    tags: ["Organic", "Fresh", "Vitamins"]
  },
  {
    id: 5,
    name: "Corn",
    description: "Sweet organic corn, perfect for grilling or boiling",
    price: 3.99,
    originalPrice: 4.99,
    image: "/images/corn.png",
    category: "Vegetables",
    seller: "Mr.food",
    rating: 4.6,
    reviews: 203,
    inStock: true,
    tags: ["Organic", "Sweet", "Grilling"]
  },
  {
    id: 6,
    name: "Oranges",
    description: "Juicy and sweet oranges rich in vitamin C",
    price: 3.49,
    originalPrice: 4.49,
    image: "/images/orange.png",
    category: "Fruits",
    seller: "Mr.food",
    rating: 4.4,
    reviews: 145,
    inStock: true,
    tags: ["Organic", "Vitamin C", "Juicy"]
  },
  {
    id: 7,
    name: "Eggplant",
    description: "Fresh purple eggplant, perfect for Mediterranean dishes",
    price: 2.99,
    originalPrice: 3.99,
    image: "/images/eggplant.png",
    category: "Vegetables",
    seller: "Mr.food",
    rating: 4.0,
    reviews: 78,
    inStock: true,
    tags: ["Organic", "Mediterranean", "Healthy"]
  },
  {
    id: 8,
    name: "Okra",
    description: "Fresh okra pods, great for soups and stews",
    price: 2.29,
    originalPrice: 3.29,
    image: "/images/okra.png",
    category: "Vegetables",
    seller: "Mr.food",
    rating: 3.9,
    reviews: 56,
    inStock: false,
    tags: ["Organic", "Soups", "Traditional"]
  },
  {
    id: 9,
    name: "Tomatoes",
    description: "Ripe red tomatoes, perfect for sauces and salads",
    price: 2.79,
    originalPrice: 3.79,
    image: "/images/tomato.png",
    category: "Vegetables",
    seller: "Mr.food",
    rating: 4.5,
    reviews: 234,
    inStock: true,
    tags: ["Organic", "Fresh", "Versatile"]
  },
  {
    id: 10,
    name: "Potatoes",
    description: "Fresh farm potatoes, perfect for all your cooking needs",
    price: 1.99,
    originalPrice: 2.99,
    image: "/images/potato.png",
    category: "Vegetables",
    seller: "Mr.food",
    rating: 4.2,
    reviews: 189,
    inStock: true,
    tags: ["Organic", "Versatile", "Staple"]
  },
  {
    id: 11,
    name: "Cauliflower",
    description: "Fresh white cauliflower, great for healthy meals",
    price: 3.29,
    originalPrice: 4.29,
    image: "/images/cauliflower.png",
    category: "Vegetables",
    seller: "Mr.food",
    rating: 4.1,
    reviews: 92,
    inStock: true,
    tags: ["Organic", "Healthy", "Low-carb"]
  }
];

export const FALLBACK_CATEGORIES = [
  "All",
  "Fruits",
  "Vegetables",
  "Grains",
  "Herbs",
  "Dairy",
  "Meat"
];

export const FALLBACK_SURVEYS = [
  {
    id: 1,
    title: "Farmer Resource Feedback",
    description: "Help us better understand your experience with digital AE/EOA training.",
    duration: "3-4 minutes",
    responses: 156,
    status: "ongoing"
  },
  {
    id: 2,
    title: "Consumer Awareness Survey",
    description: "Share your thoughts on organic product awareness in your community.",
    duration: "5-6 minutes", 
    responses: 89,
    status: "ongoing"
  },
  {
    id: 3,
    title: "Market Access Feedback",
    description: "Tell us about your experience accessing markets for your produce.",
    duration: "4-5 minutes",
    responses: 203,
    status: "ongoing"
  },
  {
    id: 4,
    title: "Training Program Evaluation",
    description: "Evaluate the effectiveness of our recent training programs.",
    duration: "3-4 minutes",
    responses: 178,
    status: "ongoing"
  },
  {
    id: 5,
    title: "Technology Adoption Survey", 
    description: "Help us understand how farmers are adopting new technologies.",
    duration: "6-7 minutes",
    responses: 134,
    status: "ongoing"
  },
  {
    id: 6,
    title: "Community Impact Assessment",
    description: "Share how our programs have impacted your community.",
    duration: "4-5 minutes",
    responses: 267,
    status: "ongoing"
  },
  {
    id: 7,
    title: "Annual Satisfaction Survey",
    description: "Your overall satisfaction with our services and programs.",
    duration: "8-10 minutes",
    responses: 543,
    status: "closed"
  },
  {
    id: 8,
    title: "Product Quality Assessment",
    description: "Rate the quality of products from our certified farmers.",
    duration: "3-4 minutes",
    responses: 387,
    status: "closed"
  }
];

export const FALLBACK_OUTLETS = [
  {
    id: 1,
    name: "Nairobi Organic Market",
    address: "Waiyaki Way, Westlands, Nairobi, Kenya",
    phone: "+254 712 345 678",
    email: "info@nairobiorganic.co.ke",
    coordinates: { lat: -1.2636, lng: 36.7893 },
    hours: "Monday - Saturday: 8:00 AM - 6:00 PM, Sunday: 9:00 AM - 4:00 PM",
    services: ["Products", "Consultation", "Delivery"],
    manager: "Sarah Wanjiku",
    image: "/images/outlet.png",
    rating: 4.5,
    reviews: 127,
    region: "Nairobi",
    type: "Market"
  },
  {
    id: 2,
    name: "Meru Agroecology Center",
    address: "Meru-Nanyuki Road, Meru County, Kenya",
    phone: "+254 723 456 789",
    email: "contact@meruagro.org",
    coordinates: { lat: 0.0469, lng: 37.6560 },
    hours: "Monday - Friday: 7:30 AM - 5:30 PM, Saturday: 8:00 AM - 2:00 PM",
    services: ["Training", "Products", "Research", "Support"],
    manager: "James Muriuki",
    image: "/images/training-session.png",
    rating: 4.8,
    reviews: 89,
    region: "Meru",
    type: "Center"
  },
  {
    id: 3,
    name: "Kisumu Farmer's Hub",
    address: "Kakamega-Kisumu Road, Kisumu, Kenya",
    phone: "+254 734 567 890",
    email: "hub@kisumufarmer.com",
    coordinates: { lat: -0.1022, lng: 34.7617 },
    hours: "Daily: 6:00 AM - 7:00 PM",
    services: ["Products", "Consultation", "Training", "Delivery"],
    manager: "Grace Otieno",
    image: "/images/sunset.png",
    rating: 4.2,
    reviews: 156,
    region: "Kisumu",
    type: "Hub"
  },
  {
    id: 4,
    name: "Nakuru Sustainable Farms",
    address: "Nakuru-Naivasha Highway, Nakuru County, Kenya",
    phone: "+254 745 678 901",
    email: "info@nakurusustainable.ke",
    coordinates: { lat: -0.3031, lng: 36.0800 },
    hours: "Monday - Saturday: 8:00 AM - 6:00 PM",
    services: ["Products", "Research", "Support"],
    manager: "Peter Kimani",
    image: "/images/garden-space.png",
    rating: 4.6,
    reviews: 98,
    region: "Nakuru",
    type: "Farm"
  },
  {
    id: 5,
    name: "Eldoret Organic Outlet",
    address: "Uganda Road, Eldoret, Uasin Gishu County, Kenya",
    phone: "+254 756 789 012",
    email: "sales@eldoretorganic.co.ke",
    coordinates: { lat: 0.5143, lng: 35.2697 },
    hours: "Monday - Friday: 8:30 AM - 5:00 PM, Saturday: 9:00 AM - 3:00 PM",
    services: ["Products", "Delivery", "Consultation"],
    manager: "Mary Chebet",
    image: "/images/woman.png",
    rating: 4.3,
    reviews: 76,
    region: "Eldoret",
    type: "Outlet"
  }
];

export const FALLBACK_EVENTS = [
  {
    id: 1,
    title: "Agroecology Training Workshop",
    description: "Hands-on training for sustainable farming practices using agroecological principles. Learn from experienced farmers and agricultural experts.",
    date: "2025-01-25",
    time: "9:00 AM",
    location: "Nairobi Agricultural Training Center",
    category: "Training",
    featured: true,
    currentAttendees: 45,
    maxAttendees: 60,
    price: 0,
    image: "/images/training-session.png"
  },
  {
    id: 2,
    title: "Organic Certification Workshop",
    description: "Learn about organic certification requirements and processes. Perfect for farmers looking to transition to certified organic production.",
    date: "2025-02-10",
    time: "10:00 AM",
    location: "Meru Community Hall",
    category: "Workshop",
    featured: false,
    currentAttendees: 32,
    maxAttendees: 50,
    price: 500,
    image: "/images/woman.png"
  },
  {
    id: 3,
    title: "Sustainable Farming Conference",
    description: "Join leading experts in sustainable agriculture for a comprehensive conference on the future of farming in Africa.",
    date: "2025-02-20",
    time: "8:00 AM",
    location: "Kisumu Conference Center",
    category: "Conference",
    featured: true,
    currentAttendees: 150,
    maxAttendees: 200,
    price: 2500,
    image: "/images/sunset.png"
  },
  {
    id: 4,
    title: "Composting and Soil Health",
    description: "Learn effective composting techniques and soil health management for improved crop yields.",
    date: "2025-02-28",
    time: "2:00 PM",
    location: "Nakuru Farmers Center",
    category: "Training",
    featured: false,
    currentAttendees: 25,
    maxAttendees: 40,
    price: 0,
    image: "/images/garden-space.png"
  },
  {
    id: 5,
    title: "Market Access for Smallholders",
    description: "Strategies and practical tips for smallholder farmers to access profitable markets for their organic produce.",
    date: "2025-03-05",
    time: "11:00 AM",
    location: "Eldoret Market Center",
    category: "Workshop",
    featured: false,
    currentAttendees: 60,
    maxAttendees: 60,
    price: 300,
    image: "/images/woman.png"
  }
];
