'use client'

import { useState, useEffect } from "react"
import { Search, ShoppingCart, Pill, AmbulanceIcon as FirstAid, Stethoscope, Thermometer, Heart, Droplets, Tablets, Syringe } from "lucide-react"

// Types for our data structures
interface Medicine {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface CartItem extends Medicine {
  quantity: number
}

// Expanded medicine data
const medicineData: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol",
    description: "Pain relief and fever reduction",
    price: 5.99,
    image: "/api/placeholder/200/200",
    category: "Pain Relief"
  },
{
    id: "2",
    name: "Amoxicillin",
    description: "Antibiotic for bacterial infections",
    price: 12.99,
    image: "/api/placeholder/200/200",
    category: "Antibiotics"
  },
  {
    id: "3",
    name: "Ibuprofen",
    description: "Anti-inflammatory pain reliever",
    price: 7.99,
    image: "/api/placeholder/200/200",
    category: "Pain Relief"
  },
  {
    id: "4",
    name: "Loratadine",
    description: "Antihistamine for allergies",
    price: 8.99,
    image: "/api/placeholder/200/200",
    category: "Allergy"
  },
  {
    id: "5",
    name: "Omeprazole",
    description: "Acid reflux and heartburn relief",
    price: 15.99,
    image: "/api/placeholder/200/200",
    category: "Digestive Health"
  },
  {
    id: "6",
    name: "Aspirin",
    description: "Pain relief and blood thinner",
    price: 6.99,
    image: "/api/placeholder/200/200",
    category: "Pain Relief"
  },
  {
    id: "7",
    name: "Cetirizine",
    description: "24-hour allergy relief",
    price: 9.99,
    image: "/api/placeholder/200/200",
    category: "Allergy"
  },
  {
    id: "8",
    name: "Metformin",
    description: "Diabetes management medication",
    price: 18.99,
    image: "/api/placeholder/200/200",
    category: "Diabetes"
  },
  {
    id: "9",
    name: "Sertraline",
    description: "Antidepressant medication",
    price: 25.99,
    image: "/api/placeholder/200/200",
    category: "Mental Health"
  },
  {
    id: "10",
    name: "Vitamin D3",
    description: "Bone health supplement",
    price: 11.99,
    image: "/api/placeholder/200/200",
    category: "Vitamins"
  },
  {
    id: "11",
    name: "Multivitamin Complex",
    description: "Daily essential vitamins",
    price: 14.99,
    image: "/api/placeholder/200/200",
    category: "Vitamins"
  },
  {
    id: "12",
    name: "Zinc Supplement",
    description: "Immune system support",
    price: 8.99,
    image: "/api/placeholder/200/200",
    category: "Vitamins"
  },
  {
    id: "13",
    name: "Magnesium Citrate",
    description: "Muscle and nerve support",
    price: 12.99,
    image: "/api/placeholder/200/200",
    category: "Minerals"
  },
  {
    id: "14",
    name: "Fish Oil Omega-3",
    description: "Heart and brain health",
    price: 16.99,
    image: "/api/placeholder/200/200",
    category: "Supplements"
  },
  {
    id: "15",
    name: "Probiotics",
    description: "Digestive health support",
    price: 19.99,
    image: "/api/placeholder/200/200",
    category: "Digestive Health"
  },
  {
    id: "16",
    name: "Melatonin",
    description: "Sleep support supplement",
    price: 10.99,
    image: "/api/placeholder/200/200",
    category: "Sleep Aid"
  },
  {
    id: "17",
    name: "Iron Supplement",
    description: "Anemia prevention",
    price: 13.99,
    image: "/api/placeholder/200/200",
    category: "Minerals"
  },
  {
    id: "18",
    name: "Calcium + D3",
    description: "Bone strength formula",
    price: 15.99,
    image: "/api/placeholder/200/200",
    category: "Minerals"
  },
  {
    id: "19",
    name: "B-Complex",
    description: "Energy and metabolism support",
    price: 17.99,
    image: "/api/placeholder/200/200",
    category: "Vitamins"
  },
  {
    id: "20",
    name: "Glucosamine",
    description: "Joint health supplement",
    price: 21.99,
    image: "/api/placeholder/200/200",
    category: "Joint Health"
  }
]

// Floating Icon Component
function FloatingIcon({ 
  Icon, 
  className, 
  animationDelay 
}: { 
  Icon: any
  className: string
  animationDelay: string 
}) {
  return (
    <div 
      className={`absolute ${className} animate-float opacity-20`}
      style={{ 
        animation: `float 20s ease-in-out infinite`,
        animationDelay 
      }}
    >
      <Icon className="w-8 h-8" />
    </div>
  )
}

// Cart Component
function Cart({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem, 
  onCheckout 
}: { 
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onRemoveItem: (id: string) => void
  onCheckout: () => void
}) {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 p-6 transform transition-transform duration-300">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        {items.length > 0 ? (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between animate-fadeIn"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-6">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105"
              >
                Place Order
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        )}
      </div>
    </>
  )
}

export default function PharmacyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [medicines, setMedicines] = useState<Medicine[]>(medicineData)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Filter medicines based on search query
  useEffect(() => {
    const filtered = medicineData.filter((medicine) => 
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setMedicines(filtered)
  }, [searchQuery])

  // Add to cart function
  const addToCart = (medicine: Medicine) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === medicine.id)
      if (existingItem) {
        return prevCart.map((item) => 
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...medicine, quantity: 1 }]
    })
  }

  // Remove from cart function
  const removeFromCart = (medicineId: string) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== medicineId))
  }

  // Checkout function
  const handleCheckout = () => {
    alert('Thank you for your order! This is a demo application.')
    setCart([])
    setIsCartOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Animated Floating Icons */}
      <div className="fixed w-full h-full pointer-events-none z-0">
        <FloatingIcon Icon={Pill} className="top-20 left-10 text-blue-400" animationDelay="0s" />
        <FloatingIcon Icon={FirstAid} className="top-40 right-20 text-red-400" animationDelay="2s" />
        <FloatingIcon Icon={Stethoscope} className="bottom-40 left-1/4 text-green-400" animationDelay="4s" />
        <FloatingIcon Icon={Heart} className="top-1/3 left-1/3 text-pink-400" animationDelay="6s" />
        <FloatingIcon Icon={Thermometer} className="bottom-1/4 right-1/4 text-purple-400" animationDelay="8s" />
        <FloatingIcon Icon={Droplets} className="top-1/4 right-1/3 text-cyan-400" animationDelay="10s" />
        <FloatingIcon Icon={Tablets} className="bottom-1/3 left-20 text-indigo-400" animationDelay="12s" />
        <FloatingIcon Icon={Syringe} className="top-2/3 right-40 text-teal-400" animationDelay="14s" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 transform hover:scale-105 transition-transform">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for medicines by name, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-lg"
            />
          </div>
        </div>

        {/* Medicine Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {medicines.map((medicine, index) => (
            <div
              key={medicine.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={medicine.image}
                alt={medicine.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-blue-500 font-medium mb-2 inline-block">
                  {medicine.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{medicine.name}</h3>
                <p className="text-gray-600 mb-4">{medicine.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">${medicine.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(medicine)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all transform hover:scale-110"
        >
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm animate-bounce">
              {cart.length}
            </span>
          )}
        </button>

        {/* Cart Component */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
        />
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
