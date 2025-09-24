"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, Heart, ChevronDown, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  images: string[];
  sku: string;
}

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>('features');

  useEffect(() => {
    // Reset image index when product changes
    setCurrentImageIndex(0);
  }, [product]);

  if (!product) {
    return null;
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? section : section);
  };

  // Use fallback images if product images are not available
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : ['/images/lettuce.png', '/images/carrot.png', '/images/okra.png', '/images/mangoes.png'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <button
                onClick={onClose}
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors mb-6"
              >
                <ArrowLeft size={20} />
                <span>Back to products</span>
              </button>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <Image
                  src={productImages[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : productImages.length - 1))}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex space-x-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index ? 'border-green-500' : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentImageIndex(prev => (prev < productImages.length - 1 ? prev + 1 : 0))}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{product.reviews} Reviews</span>
                  </div>
                  <span className="text-sm text-gray-500">Sku: {product.sku}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors flex-1">
                  Contact Seller
                </button>
                <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                  <Heart className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="space-y-2">
                {/* Key Features */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleSection('features')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">Key Features</span>
                    <ChevronDown className={`w-5 h-5 transform transition-transform ${expandedSection === 'features' ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSection === 'features' && (
                    <div className="px-4 pb-4 text-gray-700">
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Rich in essential vitamins and minerals</li>
                        <li>100% Fresh and organic</li>
                        <li>Locally sourced from certified farms</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Storage Details */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleSection('storage')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">Storage Details</span>
                    <ChevronDown className={`w-5 h-5 transform transition-transform ${expandedSection === 'storage' ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSection === 'storage' && (
                    <div className="px-4 pb-4 text-gray-700">
                      <p>Store in a cool, dry place. Refrigerate after opening.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t">
                <div className="mb-2">
                  <span className="text-sm font-semibold text-gray-700">Category: </span>
                  <Link href={`/shop?category=${product.category}`} className="text-sm text-green-600 hover:underline">
                    {product.category}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}