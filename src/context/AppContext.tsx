"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// --- Interfaces & Types ---

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  dimensions: string;
  width: number; // in cm
  height: number; // in cm
  depth: number; // in cm
  glassThickness: '5mm' | '8mm' | '10mm';
  ledOption: 'none' | 'white_led' | 'warm_led' | 'rgb_led';
  lockOption: boolean;
  images: string[];
}

export interface CustomSpecs {
  width: number;
  height: number;
  depth: number;
  glassThickness: '5mm' | '8mm' | '10mm';
  ledOption: 'none' | 'white_led' | 'warm_led' | 'rgb_led';
  lockOption: boolean;
  notes: string;
}

export interface CartItem {
  id: string; // Unique identifier (composite for custom items)
  product: Product;
  quantity: number;
  isCustom: boolean;
  customSpecs?: CustomSpecs;
  customPrice?: number;
}

export interface ShippingAddress {
  salonName: string;
  ownerName: string;
  phone: string;
  address: string;
  city: 'dalam_kota' | 'luar_kota';
}

export interface Order {
  id: string;
  type: 'ready_stock' | 'custom_made';
  items?: CartItem[];
  customSpecs?: CustomSpecs;
  totalProductPrice: number;
  deliveryFee: number;
  totalAmount: number;
  dpAmount: number;
  remainingBalance: number;
  paymentStatus: 'unpaid' | 'dp_paid' | 'fully_paid';
  deliveryStatus: 'pending' | 'processing' | 'scheduled' | 'out_for_delivery' | 'installed_and_completed';
  shippingAddress: ShippingAddress;
  createdAt: string;
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product, quantity?: number, isCustom?: boolean, customSpecs?: CustomSpecs, customPrice?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: (type: 'ready_stock' | 'custom_made', address: ShippingAddress, customItem?: CartItem) => Order;
  updateOrderStatus: (orderId: string, paymentStatus: Order['paymentStatus'], deliveryStatus: Order['deliveryStatus']) => void;
  adminApproveCustomOrder: (orderId: string, approvedPrice: number) => void;
  calculateCustomCabinetPrice: (specs: CustomSpecs) => {
    basePrice: number;
    volumeCharge: number;
    ledCharge: number;
    thicknessCharge: number;
    lockCharge: number;
    totalPrice: number;
    volumeM3: number;
    additionalVolumeM3: number;
  };
}

// --- Initial Mock Data ---

const MOCK_PRODUCTS: Product[] = [
  {
    id: "ready-1",
    name: "Aura Glow Classic Cabinet",
    description: "Lemari display kaca premium dengan pencahayaan LED internal yang menonjolkan produk kosmetik atau kecantikan salon Anda secara elegan. Dibuat dengan bingkai kayu mahoni solid berlapis emas metalik dan kaca tempered 5mm yang kokoh.",
    price: 2450000,
    stock: 5,
    dimensions: "100 x 40 x 180 cm",
    width: 100,
    height: 180,
    depth: 40,
    glassThickness: "5mm",
    ledOption: "white_led",
    lockOption: true,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "ready-2",
    name: "Luxe Reflections Max",
    description: "Display kabinet ukuran besar untuk salon eksklusif. Menggunakan kaca tempered 8mm yang ekstra aman untuk menampung botol dan peralatan kecantikan berat. Dilengkapi dengan dual strip LED (Warm/Cool) untuk efek dramatis.",
    price: 4800000,
    stock: 3,
    dimensions: "150 x 45 x 200 cm",
    width: 150,
    height: 200,
    depth: 45,
    glassThickness: "8mm",
    ledOption: "warm_led",
    lockOption: true,
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "ready-3",
    name: "Crystal Radiance Slim",
    description: "Desain ramping vertikal yang sangat hemat ruang, ideal untuk salon kuku, studio sulam alis, atau ruang spa kecil. Dinding belakang dilapisi cermin premium untuk pantulan cahaya yang memaksimalkan estetika ruangan.",
    price: 1950000,
    stock: 8,
    dimensions: "60 x 35 x 190 cm",
    width: 60,
    height: 190,
    depth: 35,
    glassThickness: "5mm",
    ledOption: "white_led",
    lockOption: false,
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "ready-4",
    name: "Royal Opulence Double",
    description: "Mahakarya untuk spa bintang lima dan klinik kecantikan premium. Kabinet pintu ganda dengan ukiran halus estetis salon, kaca tebal 10mm premium, pencahayaan LED RGB warna-warni yang dapat disesuaikan, serta kunci pengaman ganda.",
    price: 7200000,
    stock: 2,
    dimensions: "200 x 50 x 220 cm",
    width: 200,
    height: 220,
    depth: 50,
    glassThickness: "10mm",
    ledOption: "rgb_led",
    lockOption: true,
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=600&auto=format&fit=crop"
    ]
  }
];

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-9821-custom",
    type: "custom_made",
    customSpecs: {
      width: 120,
      height: 190,
      depth: 45,
      glassThickness: "8mm",
      ledOption: "warm_led",
      lockOption: true,
      notes: "Tolong bingkainya diberi warna rose gold mengkilap agar cocok dengan interior salon kami yang bertema Parisian Chic."
    },
    totalProductPrice: 3250000,
    deliveryFee: 100000,
    totalAmount: 3350000,
    dpAmount: 1675000,
    remainingBalance: 1675000,
    paymentStatus: "unpaid", // Awaiting admin approval first
    deliveryStatus: "pending",
    shippingAddress: {
      salonName: "Maison de Beauté Salon & Spa",
      ownerName: "Clara Wijaya",
      phone: "081234567890",
      address: "Ruko Belle Horizon Blok B No. 12, Kelapa Gading",
      city: "dalam_kota"
    },
    createdAt: "2026-07-06T14:30:00Z"
  },
  {
    id: "ORD-5489-stock",
    type: "ready_stock",
    items: [
      {
        id: "ready-1",
        product: MOCK_PRODUCTS[0],
        quantity: 1,
        isCustom: false
      }
    ],
    totalProductPrice: 2450000,
    deliveryFee: 250000,
    totalAmount: 2700000,
    dpAmount: 1350000,
    remainingBalance: 1350000,
    paymentStatus: "dp_paid",
    deliveryStatus: "processing",
    shippingAddress: {
      salonName: "Rosetta Brow Studio",
      ownerName: "Amelia Putri",
      phone: "085678901234",
      address: "Jl. Diponegoro No. 45, Kota Bandung",
      city: "luar_kota"
    },
    createdAt: "2026-07-05T09:15:00Z"
  }
];

// --- Context Provider ---

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("salon_glass_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart", e);
      }
    }
    const savedOrders = localStorage.getItem("salon_glass_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Error loading orders", e);
      }
    }
  }, []);

  // Save cart & orders to localStorage
  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("salon_glass_cart", JSON.stringify(newCart));
  };

  const saveOrdersToStorage = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem("salon_glass_orders", JSON.stringify(newOrders));
  };

  // Pricing formula for custom cabinet
  const calculateCustomCabinetPrice = (specs: CustomSpecs) => {
    const { width, height, depth, glassThickness, ledOption, lockOption } = specs;
    
    // 1. Base Dimensions (100 x 40 x 180 cm) = 0.72 m³
    const baseWidth = 100;
    const baseDepth = 40;
    const baseHeight = 180;
    const basePrice = 1500000;
    const baseVolumeM3 = (baseWidth * baseDepth * baseHeight) / 1000000; // 0.72

    // 2. Custom Volume Calculation
    const volumeM3 = (width * depth * height) / 1000000;
    const additionalVolumeM3 = Math.max(0, volumeM3 - baseVolumeM3);
    
    // Add IDR 200,000 for every 0.1 m³ of additional volume (continuous ratio)
    const volumeCharge = Math.round((additionalVolumeM3 / 0.1) * 200000);

    // 3. LED Lighting charge
    let ledCharge = 0;
    if (ledOption === "white_led" || ledOption === "warm_led") {
      ledCharge = 250000;
    } else if (ledOption === "rgb_led") {
      ledCharge = 400000;
    }

    // 4. Glass Thickness charge
    let thicknessCharge = 0;
    if (glassThickness === "8mm") {
      thicknessCharge = 150000;
    } else if (glassThickness === "10mm") {
      thicknessCharge = 300000;
    }

    // 5. Lock charge
    const lockCharge = lockOption ? 100000 : 0;

    const totalPrice = basePrice + volumeCharge + ledCharge + thicknessCharge + lockCharge;

    return {
      basePrice,
      volumeCharge,
      ledCharge,
      thicknessCharge,
      lockCharge,
      totalPrice,
      volumeM3,
      additionalVolumeM3
    };
  };

  // Add to cart
  const addToCart = (
    product: Product,
    quantity = 1,
    isCustom = false,
    customSpecs?: CustomSpecs,
    customPrice?: number
  ) => {
    // Generate an ID for the cart item
    const cartItemId = isCustom
      ? `custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      : product.id;

    const existingIndex = cart.findIndex((item) => {
      if (isCustom) return false; // Custom items are always treated as unique
      return item.id === product.id;
    });

    let newCart = [...cart];

    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({
        id: cartItemId,
        product,
        quantity,
        isCustom,
        customSpecs,
        customPrice: isCustom ? (customPrice || product.price) : undefined
      });
    }

    saveCartToStorage(newCart);
  };

  // Remove from cart
  const removeFromCart = (cartItemId: string) => {
    const newCart = cart.filter((item) => item.id !== cartItemId);
    saveCartToStorage(newCart);
  };

  // Update quantity
  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    const newCart = cart.map((item) =>
      item.id === cartItemId ? { ...item, quantity } : item
    );
    saveCartToStorage(newCart);
  };

  // Clear cart
  const clearCart = () => {
    saveCartToStorage([]);
  };

  // Create Order
  const createOrder = (
    type: 'ready_stock' | 'custom_made',
    address: ShippingAddress,
    customItem?: CartItem
  ): Order => {
    let totalProductPrice = 0;
    let items: CartItem[] | undefined = undefined;
    let customSpecs: CustomSpecs | undefined = undefined;

    if (type === "ready_stock") {
      items = [...cart];
      totalProductPrice = cart.reduce((acc, item) => {
        const itemPrice = item.isCustom ? (item.customPrice || 0) : item.product.price;
        return acc + itemPrice * item.quantity;
      }, 0);
    } else if (type === "custom_made" && customItem) {
      customSpecs = customItem.customSpecs;
      totalProductPrice = customItem.customPrice || 0;
    }

    const deliveryFee = address.city === "dalam_kota" ? 100000 : 250000;
    const totalAmount = totalProductPrice + deliveryFee;
    const dpAmount = Math.round(totalAmount * 0.5);
    const remainingBalance = totalAmount - dpAmount;

    // Create final order object
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-${type === "custom_made" ? "custom" : "stock"}`,
      type,
      items,
      customSpecs,
      totalProductPrice,
      deliveryFee,
      totalAmount,
      dpAmount,
      remainingBalance,
      // For custom orders: status is 'unpaid' because admin needs to review. 
      // For ready stock: we go straight to 'unpaid' ready for user payment simulator
      paymentStatus: "unpaid", 
      deliveryStatus: "pending",
      shippingAddress: address,
      createdAt: new Date().toISOString()
    };

    const newOrders = [newOrder, ...orders];
    saveOrdersToStorage(newOrders);
    
    if (type === "ready_stock") {
      clearCart();
    }

    return newOrder;
  };

  // Update order status (simulating admin actions or payment success)
  const updateOrderStatus = (
    orderId: string,
    paymentStatus: Order['paymentStatus'],
    deliveryStatus: Order['deliveryStatus']
  ) => {
    const newOrders = orders.map((order) =>
      order.id === orderId ? { ...order, paymentStatus, deliveryStatus } : order
    );
    saveOrdersToStorage(newOrders);
  };

  // Admin approves custom order and locks the price (which can be adjusted by the admin)
  const adminApproveCustomOrder = (orderId: string, approvedPrice: number) => {
    const newOrders = orders.map((order) => {
      if (order.id === orderId) {
        const deliveryFee = order.shippingAddress.city === "dalam_kota" ? 100000 : 250000;
        const totalAmount = approvedPrice + deliveryFee;
        const dpAmount = Math.round(totalAmount * 0.5);
        const remainingBalance = totalAmount - dpAmount;
        
        return {
          ...order,
          totalProductPrice: approvedPrice,
          totalAmount,
          dpAmount,
          remainingBalance,
          paymentStatus: "unpaid" as const, // Ready for DP payment now!
          deliveryStatus: "processing" as const // Set to processing or scheduled as needed
        };
      }
      return order;
    });
    saveOrdersToStorage(newOrders);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        createOrder,
        updateOrderStatus,
        adminApproveCustomOrder,
        calculateCustomCabinetPrice
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
