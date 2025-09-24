"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Box, DollarSign, GraduationCap, Headphones, Heart, Leaf, ShieldCheck, Smile, Sprout, Truck, Users, Star, MessageCircle, ChevronLeft, ChevronRight, ChevronDown, Filter, Phone, ArrowLeft } from "lucide-react";
import { productApi } from "../../../lib/api";
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES } from "../../../lib/constants";
import { Header } from "../../../components/Header";
import ProductDetailModal from "../../../components/ProductDetailModal";
export default function Shop() {
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(['All']);
    const [priceRange, setPriceRange] = useState([50, 1500]);
    const [selectedRating, setSelectedRating] = useState('4.0 & up');
    const [selectedTags, setSelectedTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // API state
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sync filters with URL parameters
    const router = useRouter();
    const searchParams = useSearchParams();

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await productApi.getAll({
                    category: selectedCategories.includes('All') ? undefined : selectedCategories[0],
                    page: currentPage,
                    limit: 12
                });
                setProducts(response.products || response.data || []);
            } catch (err) {
                setError('Failed to fetch products, using fallback data');
                console.error('Error fetching products:', err);
                // Use fallback data when API fails
                let fallbackProducts = [...FALLBACK_PRODUCTS];
                
                // Apply category filter to fallback data
                if (!selectedCategories.includes('All')) {
                    fallbackProducts = fallbackProducts.filter(product => 
                        selectedCategories.includes(product.category)
                    );
                }
                
                // Apply pagination to fallback data (but show more products per page for better fallback experience)
                const startIndex = (currentPage - 1) * 12;
                const endIndex = startIndex + 12;
                fallbackProducts = fallbackProducts.slice(startIndex, endIndex);
                
                // If we have fewer products after filtering, show all fallback products to ensure we have at least 10
                if (fallbackProducts.length < 10 && currentPage === 1) {
                  fallbackProducts = [...FALLBACK_PRODUCTS];
                }
                
                setProducts(fallbackProducts);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategories, currentPage]);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productApi.getCategories();
                setCategories(response.categories || response.data || FALLBACK_CATEGORIES);
            } catch (err) {
                console.error('Error fetching categories:', err);
                // Use fallback categories when API fails
                setCategories(FALLBACK_CATEGORIES);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
        if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
        if (selectedRating) params.set("rating", selectedRating);
        if (priceRange) params.set("price", `${priceRange[0]}-${priceRange[1]}`);
        params.set("page", currentPage.toString());
        router.replace(`/shop?${params.toString()}`);
    }, [selectedCategories, selectedTags, selectedRating, priceRange, currentPage, router]);
    
    const navigationItems = [
        { name: "Home", href: "/" },
        { name: "Mission", href: "/mission" },
        { name: "Shop", href: "/shop" },
        { name: "Resources", href: "/resources" },
        { name: "Outlets", href: "/outlets" },
        { name: "Surveys", href: "/surveys" },
        { name: "Events", href: "/events" },
        { name: "Contacts", href: "/contact" },
    ];
    // Function to scroll to Featured Products section
    const scrollToFeaturedProducts = () => {
        const featuredSection = document.getElementById('featured-products');
        if (featuredSection) {
            featuredSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Categories will be loaded from API

    const popularTags = [
        'Healthy', 'Low fat', 'Vegetarian', 'Kid foods', 'Vitamins', 'Bread',
        'Meat', 'Snacks', 'Tiffin', 'Launch', 'Dinner', 'Breakfast', 'Fruit'
    ];

    const onSaleProducts = [
        { name: 'Green Apple', price: 2, originalPrice: 3.99, seller: 'Mr.food', rating: 4, image: '🍏', category: 'Vegetables' },
        { name: 'Oranges', price: 2, originalPrice: 3.99, seller: 'Mr.food', rating: 4, image: '🍊', category: 'Fruits' },
        { name: 'Lettuce', price: 2, originalPrice: 3.99, seller: 'Mr.food', rating: 4, image: '🥬', category: 'Vegetables' }
    ];
    
    // Products will be loaded from API

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star 
                    key={i} 
                    size={12} 
                    className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                />
            );
        }
        return stars;
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories(prev => 
            prev.includes(categoryId) 
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleTagClick = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleShowAllProducts = () => {
        setShowAllProducts(true);
    };

    const handleBackToShop = () => {
        setShowAllProducts(false);
    };

    const handleContactClick = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // All Products Page Component
    if (showAllProducts) {
        return (
            <div className="mt-24 min-h-screen bg-gray-50">
                {/* Fixed Navbar */}




                {/* Header with breadcrumb and back button */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-4">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm space-x-2">
                                <span>🏠</span>
                                <ChevronRight size={16} />
                                <span>Shop</span>
                                <ChevronRight size={16} />
                                <span className="text-green-400">All Products</span>
                            </div>
                            {/* Back to Shop Button */}
                            <button 
                                onClick={handleBackToShop}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Back to Shop
                            </button>

                            {/* Filters and React URL Parameters */}
                            {/* Show current filters as chips */}
                            <div className="flex items-center gap-2 ml-6">
                                {selectedCategories.length > 0 && selectedCategories.map(cat => (
                                    <span key={cat} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                        {cat}
                                    </span>
                                ))}
                                {selectedTags.length > 0 && selectedTags.map(tag => (
                                    <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                        {tag}
                                    </span>
                                ))}
                                {selectedRating && (
                                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                                        {selectedRating}
                                    </span>
                                )}
                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                    ${priceRange[0]} - ${priceRange[1]}
                                </span>
                            </div>
                            {/* Update URL on filter change */}
                            {/* Add useEffect for syncing filters to URL */}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex gap-6">
                        {/* Sidebar */}
                        <div className="w-80 space-y-6">
                            {/* Filter Button */}
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600">
                                <Filter size={16} />
                                Filter
                            </button>

                            {/* All Categories */}
                            <div className="bg-white rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium">All Categories</h3>
                                    <ChevronDown size={16} />
                                </div>
                                <div className="space-y-3">
                                    {categories.map((category) => (
                                        <label key={category} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCategoryChange(category)}
                                                className="w-4 h-4 text-green-500 rounded border-gray-300 focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="bg-white rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium">Price</h3>
                                    <ChevronDown size={16} />
                                </div>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="range"
                                            min="50"
                                            max="1500"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <span>Price: {priceRange[0]} — {priceRange[1]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="bg-white rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium">Rating</h3>
                                    <ChevronDown size={16} />
                                </div>
                                <div className="space-y-3">
                                    {['5.0', '4.0 & up', '3.0 & up', '2.0 & up', '1.0 & up'].map((rating) => (
                                        <label key={rating} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedRating === rating}
                                                onChange={() => setSelectedRating(rating)}
                                                className="w-4 h-4 text-green-500 rounded"
                                            />
                                            <div className="flex items-center space-x-1">
                                                {renderStars(parseFloat(rating))}
                                                <span className="text-sm text-gray-700 ml-2">{rating}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Popular Tags */}
                            <div className="bg-white rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium">Popular Tag</h3>
                                    <ChevronDown size={16} />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {popularTags.map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => handleTagClick(tag)}
                                            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                                                selectedTags.includes(tag)
                                                    ? 'bg-green-500 text-white border-green-500'
                                                    : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Discount Banner */}
                            <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-lg p-4 text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="text-2xl font-bold">79% Discount</div>
                                    <div className="text-sm opacity-90">on your first order</div>
                                    <button className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium mt-3 hover:bg-gray-100 flex items-center gap-2">
                                        Shop Now
                                        <span>→</span>
                                    </button>
                                </div>
                                <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mb-10"></div>
                            </div>

                            {/* On Sale */}
                            <div className="bg-white rounded-lg p-4">
                                <h3 className="font-medium mb-4">On Sale</h3>
                                <div className="space-y-3">
                                    {onSaleProducts.map((product, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-2 border border-green-200 rounded-lg">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <span className="text-lg">{product.image}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-500">{product.category}</div>
                                                <div className="font-medium text-sm">{product.name}</div>
                                                <div className="text-xs text-gray-500">By {product.seller}</div>
                                                <div className="flex items-center space-x-1">
                                                    {renderStars(product.rating)}
                                                    <span className="text-xs text-gray-500">({product.rating})</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-green-600 font-semibold">${product.price}</div>
                                                <div className="text-xs text-gray-400 line-through">${product.originalPrice}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Top Bar */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-sm text-gray-600">Sort by:</div>
                                    <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                                        <option>Latest</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Rating</option>
                                    </select>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <span className="font-semibold">52</span> Results Found
                                </div>
                            </div>

                            {/* Products Grid */}
                            {loading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                                </div>
                            ) : error ? (
                                <div className="text-center py-12">
                                    <p className="text-red-500">{error}</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    {products.map((product) => (
                                        <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
                                            <div className="bg-gray-50 rounded-lg h-32 flex items-center justify-center mb-3">
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name}
                                                    className="w-full h-full object-cover rounded-lg"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.nextElementSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="w-full h-full bg-green-100 rounded-lg items-center justify-center text-green-600 text-2xl font-bold" style={{display: 'none'}}>
                                                    {product.name.charAt(0)}
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="text-xs text-gray-500">{product.category}</div>
                                                <h3 className="font-medium text-gray-900">{product.name}</h3>
                                                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                                                
                                                <div className="flex items-center gap-1">
                                                    {renderStars(Math.floor(product.rating))}
                                                    <span className="text-xs text-gray-500">({product.reviews})</span>
                                                </div>
                                                
                                                <div className="text-xs text-gray-500">
                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                                        product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-semibold text-green-600">${product.price}</span>
                                                </div>

                                                <button 
                                                    className="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={!product.inStock}
                                                    onClick={() => product.inStock && handleContactClick(product)}
                                                >
                                                    <Phone size={14} />
                                                    {product.inStock ? 'Contact' : 'Out of Stock'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="mb-11 flex justify-center items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                {[1, 2, 3, 4, 5].map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                                            currentPage === page
                                                ? 'bg-green-500 text-white'
                                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <span className="text-gray-400">...</span>
                                
                                <button className="w-8 h-8 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50">
                                    21
                                </button>

                                <button
                                    onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
                                    disabled={currentPage === 5}
                                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <section className="bg-[#2C2A29] py-16 px-4 md:px-8 lg:px-12 -mt-16">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Left side - Newsletter info */}
                        <div className="flex items-center gap-4 text-white">
                            <div className="flex-shrink-0">
                                {/* Email icon */}
                                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold mb-2">
                                    Join the Movement
                                </h3>
                                <p className="text-gray-300 text-sm md:text-base">
                                    Get updates on AE/EOA events, stories, outlets, and resources that empower African farmers.
                                </p>
                            </div>
                        </div>

                        {/* Right side - Email signup form */}
                        <div className="flex w-full md:w-auto min-w-80">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 px-4 py-3 text-gray-900 bg-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                            />
                            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-r-full font-medium text-sm transition-colors duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="bg-[#24231D] py-16 px-4 md:px-8 lg:px-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                            
                            {/* Company Info */}
                            <div className="lg:col-span-1">
                                {/* Logo */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0">
                                            <img
                                                src="https://api.builder.io/api/v1/image/assets/TEMP/5376572c943bbbbf555a8e8d2b23c9146eee9067?width=335"
                                                alt="Biovision Africa Trust"
                                                className="h-16 object-contain filter brightness-0 invert"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <h4 className="text-xl font-bold text-white mb-4">
                                    Growing Africa's Future Through Sustainable Agriculture
                                </h4>
                                <p className="text-white font-bold text-base leading-relaxed mb-6">
                                    We partner with farmers across Africa to build sustainable food systems through agroecology, creating premium products that support rural communities.
                                </p>
                                
                                {/* Social Media Links */}
                                <div className="flex gap-3">
                                    <button className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                        </svg>
                                    </button>
                                    <button className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </button>
                                    <button className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.332 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.756-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                                        </svg>
                                    </button>
                                    <button className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Explore Links */}
                            <div>
                                <h5 className="text-lg font-semibold text-white mb-6">Explore</h5>
                                <ul className="space-y-4">
                                    <li><a href="#" className="text-white font-bold hover:text-gray-300 transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Our Mission</a></li>
                                    <li><a href="#" className="text-white font-bold hover:text-gray-300 transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Shop</a></li>
                                    <li><a href="#" className="text-white font-bold hover:text-gray-300 transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Learn</a></li>
                                    <li><a href="#" className="text-white font-bold hover:text-gray-300 transition-colors duration-300 flex items-center"><span className="mr-2">•</span> FAQs</a></li>
                                    <li><a href="#" className="text-white font-bold hover:text-gray-300 transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Press & Media</a></li>
                                    <li><a href="#" className="text-white font-bold hover:text-gray-300 transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Career</a></li>
                                    <li><a href="#" className="text-white font-bold hover:text-gray-300 transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Become a Partner</a></li>
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h5 className="text-lg font-semibold text-white mb-6">Contact</h5>
                                <div className="space-y-4 text-white font-bold">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>+254 (0) 20 632 4806</span>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>info@biovisionafricatrust.org</span>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <p>Duduville Campus, Kasarani Nairobi, Kenya</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <p>P.O. Box 12345, Nairobi, Kenya</p>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-2 space-y-1 text-sm">
                                        <p><span className="text-white font-bold">Monday - Friday:</span> 8:00 AM - 5:00 PM EAT</p>
                                        <p><span className="text-white font-bold">Saturday:</span> 9:00 AM - 1:00 PM EAT</p>
                                        <p><span className="text-white font-bold">Sunday:</span> Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-yellow-500 text-sm font-medium">
                                © 2025 BioVision Africa Trust. All Rights Reserved.
                            </p>
                            <div className="flex gap-4 text-sm">
                                <a href="#" className="text-yellow-500 hover:text-white transition-colors duration-300">Terms of Use</a>
                                <span className="text-gray-600">|</span>
                                <a href="#" className="text-yellow-500 hover:text-white transition-colors duration-300">Privacy Policy</a>
                                <span className="text-gray-600">|</span>
                                <a href="#" className="text-yellow-500 hover:text-white transition-colors duration-300">Cookie Policy</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

    // Main Shop Page Component
    return (
        <div className="bg-[#fdfbf6] relative min-h-screen w-full overflow-x-hidden">
            {/* Header */}
            <Header />

            {isModalOpen && (
                <ProductDetailModal product={selectedProduct} onClose={() => setIsModalOpen(false)} />
            )}

      
        
            <section className=" mt-12 bg-[#D6E1D6] py-20 px-4 md:px-12 relative overflow-visible">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    
                    {/* LEFT SIDE: Text */}
                    <div className="ml-4">
                        <p className=" text-sm text-[#2E7D32] font-semibold uppercase">Welcome to Shopery</p>
                        <h1 className=" text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Fresh & Healthy <br />
                            Organic Products
                        </h1>
                        <p className="text-lg text-gray-700 mt-2">
                            Certified organic products from <br /> Africa's most innovative farmers
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Free shipping on all your order. we deliver, you enjoy
                        </p>
                         <button 
                            onClick={scrollToFeaturedProducts}
                            className="mt-4 bg-[#2E7D32] text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-[#256829] transition"
                        >
                            Shop Now
                        </button>
                    </div>

                    {/* RIGHT SIDE: Image */}
                    <div className="flex justify-end items-center h-full w-full">
                        <img
                            src="/images/vegetables.png"
                            alt="Organic Vegetables Basket"
                            className="w-full h-auto object-contain lg:max-h-[400px]"
                        />
                    </div>
                </div>

                {/* BOTTOM ICONS */}
                <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 w-full px-4 z-10">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-xl shadow-xl py-6 px-6">
                        
                        <div className="flex items-start gap-3">
                            <Truck className="w-6 h-6 mt-1 text-green-700" />
                            <div>
                                <p className="font-semibold">Free Shipping</p>
                                <p className="text-sm text-gray-500">Free shipping on all your order</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Headphones className="w-6 h-6 mt-1 text-green-700" />
                            <div>
                                <p className="font-semibold">Customer Support 24/7</p>
                                <p className="text-sm text-gray-500">Instant access to Support</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <ShieldCheck className="w-6 h-6 mt-1 text-green-700" />
                            <div>
                                <p className="font-semibold">100% Secure Payment</p>
                                <p className="text-sm text-gray-500">We ensure your money is safe</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Box className="w-6 h-6 mt-1 text-green-700" />
                            <div>
                                <p className="font-semibold">Money-Back Guarantee</p>
                                <p className="text-sm text-gray-500">30 Days Money-Back Guarantee</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section id="featured-products" className="bg-white -mt-2 pt-32  px-4 md:px-12">
    <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
        Featured Products
    </h2>

                {/* Main Products Grid */}
                <div className=" max-w-7xl mx-auto overflow-x scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                    {[
                        { name: "Green Apples", img: "/images/greenapples.png" },
                        { name: "Chinese Cabbage", img: "/images/chinese-cabbage.png" },
                        { name: "Lettuce", img: "/images/lettuces.png" },
                        { name: "Green Peppers", img: "/images/pepper.png" },
                        { name: "Corn", img: "/images/corn.png" },
                    ].map((product) => (
                        <div
                            key={product.name}
                            className="bg-white rounded-xl shadow-lg p-4 text-center"
                        >
                            <img
                                src={product.img}
                                alt={product.name}
                                className="h-32 mx-auto mb-4 object-contain"
                            />
                            {/* Bottom info area with subtle background */}
                            <div className="bg-[#FFF9F2] rounded-b-xl p-3 text-left">
                                <p className="text-xs text-gray-400 mb-1">Vegetables</p>
                                <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-700 font-semibold mb-1">By Mr.food</p>
                                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                                    ★★★★☆ <span className="text-gray-500 text-xs">(4)</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-green-700 font-bold text-lg">$2</span>
                                    <span className="line-through text-gray-400 text-sm">$3.99</span>
                                    <button 
                                        className="border border-green-600 text-green-600 px-3 py-1 rounded-full text-sm hover:bg-green-600 hover:text-white transition-colors"
                                        onClick={() => handleContactClick(product)}
                                    >
                                        Contact
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>

                {/* Secondary Categories */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Hot Deals */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Hot Deals</h4>
                        {[
                            { name: "Green Apple", image: "/images/greenapples.png" },
                            { name: "Oranges", image: "/images/orange.png" },
                            { name: "Lettuce", image: "/images/lettuce.png" },

                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between border border-green-500 rounded-xl p-2 mb-3"
                            >
                                <img src={item.image} alt={item.name} className="w-12 h-12" />
                                <div className="flex-1 ml-2 bg-[#FDFBF6]">
                                    <p className="text-xs text-gray-500">Vegetables</p>
                                    <p className="font-semibold text-sm">{item.name}</p>
                                    <p className="text-xs text-gray-500">By Mr.food</p>
                                </div>
                                <div className="text-right bg-[#FDFBF6]">
                                    <span className="text-green-700 font-semibold text-sm">$2</span><br />
                                    <span className="text-gray-400 line-through text-xs">$3.99</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Best Seller */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Best Seller</h4>
                        {[
                            { name: "Eggplant", image: "/images/eggplant.png" },
                            { name: "Okra", image: "/images/okra.png" },
                            { name: "Tomatoes", image: "/images/tomato.png" },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between border  border-green-500 rounded-xl p-2 mb-3"
                            >
                                <img src={item.image} alt={item.name} className="w-12 h-12" />
                                <div className="flex-1 ml-2 bg-[#FDFBF6]">
                                    <p className="text-xs text-gray-500">Vegetables</p>
                                    <p className="font-semibold text-sm">{item.name}</p>
                                    <p className="text-xs text-gray-500">By Mr.food</p>
                                </div>
                                <div className="text-right bg-[#FDFBF6]">
                                    <span className="text-green-700 font-semibold text-sm">$2</span><br />
                                    <span className="text-gray-400 line-through text-xs">$3.99</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Top Rated */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Top Rated</h4>
                        {[
                            { name: "Potatoes", image: "/images/potato.png" },
                            { name: "Corn", image: "/images/corn.png" },
                            { name: "Cauliflower", image: "/images/cauliflower.png" },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between border border-green-500 rounded-xl p-2 mb-3"
                            >
                                <img src={item.image} alt={item.name} className="w-12 h-12" />
                                <div className="flex-1 ml-2 bg-[#FDFBF6]">
                                    <p className="text-xs text-gray-500">Vegetables</p>
                                    <p className="font-semibold text-sm">{item.name}</p>
                                    <p className="text-xs text-gray-500">By Mr.food</p>
                                </div>
                                <div className="text-right bg-[#FDFBF6]">
                                    <span className="text-green-700 font-semibold text-sm">$2</span><br />
                                    <span className="text-gray-400 line-through text-xs">$3.99</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div 
                        className="rounded-xl mt-9 text-center p-6 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat min-h-[200px]"
                        style={{ 
                            backgroundImage: "url('/images/promo-bag.png')",
                            backgroundColor: '#F4F8F4'
                        }}
                    >
                        <p className="mt-[-149] text-xs text-gray-700 font-medium">SUMMER SALE</p>
                        <h3 className="text-2xl font-bold text-green-800 mb-2 drop-shadow-sm">75% off</h3>
                        <button className="bg-white text-green-800 px-6 py-2 rounded-full text-sm hover:bg-green-800 shadow-md">
                            Shop Now →
                        </button>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <button 
                        onClick={handleShowAllProducts}
                        className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold text-lg"
                    >
                        Shop All Products
                    </button>
                </div>
            </section>

            {/* ✅ Promo Cards Section */}
 <section className="bg-white py-16 px-4 md:px-12">
   <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
     {/* Promo Card 1 - Fresh Cow Milk */}
     <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg text-left shadow-md relative overflow-hidden h-36"
         style={{
           backgroundImage: "url('/images/milk.png')",
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>

      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-white mb-0.5 drop-shadow-lg">100% Fresh<br/>Cow Milk</h3>
        <p className="text-xs text-white mb-2 drop-shadow-md">Starting at $14.99</p>
        <button className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs hover:bg-blue-50 transition-colors shadow-lg">
          Shop Now →
        </button>
      </div>
      <div className="absolute right-2 top-2 w-12 h-12 bg-white rounded-full flex items-center justify-center z-10">
        <div className="w-8 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
          <div className="w-6 h-8 bg-gradient-to-b from-white to-gray-100 rounded-lg relative">
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 opacity-10 z-5">
        <div className="w-full h-full bg-white rounded-full transform translate-x-4 -translate-y-4"></div>
      </div>
    </div>

    {/* Promo Card 2 - Water & Soft Drinks */}
    <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-4 rounded-lg text-left shadow-md relative overflow-hidden h-36"
         style={{
           backgroundImage: "url('/images/soda.png')",
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>

      <div className="text-right relative z-10">
        <h3 className="text-xs font-semibold text-black mb-0.5 drop-shadow-lg">DRINK SALE</h3>
        <p className="text-sm font-bold text-black mb-2 drop-shadow-md">Water &<br/>Soft Drink</p>
        <button className="bg-white text-cyan-600 px-3 py-1 rounded-full text-xs hover:bg-cyan-50 transition-colors shadow-lg">
          Shop Now →
        </button>
      </div>
      <div className="absolute right-3 bottom-2 w-10 h-14 z-10">
        <div className="w-full h-full bg-gradient-to-b from-amber-900 to-amber-800 rounded-lg relative shadow-lg">
          <div className="absolute top-0 left-0 right-0 h-2 bg-amber-700 rounded-t-lg"></div>
          <div className="absolute inset-1 bg-gradient-to-b from-amber-600 to-amber-900 rounded opacity-80"></div>
          <div className="absolute top-0.5 left-0.5 right-0.5 h-1 bg-gradient-to-r from-white to-transparent rounded opacity-30"></div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-4 bg-white opacity-10 transform -skew-x-12 z-5"></div>
    </div>

    {/* Promo Card 3 - Quick Breakfast */}
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-lg text-left shadow-md relative overflow-hidden border h-36"
         style={{
           backgroundImage: "url('/images/breakfast.png')",
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>

      <div className="relative z-10">
        <h3 className="text-xs font-semibold text-gray-800 mb-0.5 drop-shadow-sm">100% ORGANIC</h3>
        <p className="text-sm font-bold text-gray-800 mb-2 drop-shadow-sm">Quick<br/>Breakfast</p>
        <button className="bg-green-700 text-white px-3 py-1 rounded-full text-xs hover:bg-green-800 transition-colors shadow-lg">
          Shop Now →
        </button>
      </div>
      <div className="absolute right-2 bottom-2 flex gap-1 z-10">
         <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-sm"></div>
         <div className="w-4 h-4 bg-amber-600 rounded-full shadow-sm"></div>
         <div className="w-4 h-4 bg-yellow-600 rounded-full shadow-sm"></div>
       </div>
       <div className="absolute right-2 top-8 flex gap-1 z-10">
         <div className="w-3 h-3 bg-amber-800 rounded-full shadow-sm"></div>
         <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
       </div>
       <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-yellow-200 to-transparent opacity-30 rounded-full transform translate-x-2 -translate-y-2 z-5"></div>
     </div>
   </div>

   {/* ✅ Special Deal Section */}
   <div className="bg-[#EAF5EA] py-12 px-4 md:px-12 rounded-xl">
     <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
       <div className="flex justify-center">
         <img src="/images/vegetables.png" alt="Special Deal" className="w-64 sm:w-80 lg:w-96 object-contain" />
       </div>
       <div className="text-center lg:text-left flex-1">
         <p className="text-sm text-gray-500 uppercase font-medium">Best Deals</p>
         <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
           Our Special Products Deal of the Month
         </h2>
         <div className="flex justify-center lg:justify-start gap-4 text-center mb-6">
           {["00", "02", "18", "46"].map((value, index) => (
            <div key={index}>
              <p className="text-2xl md:text-3xl font-bold text-green-700">{value}</p>
              <p className="text-xs text-gray-600 uppercase">
                {["Days", "Hours", "Mins", "Secs"][index]}
              </p>
            </div>
          ))}
        </div>
         <button className="bg-green-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition">
           Shop now →
         </button>
       </div>
       <div className="hidden lg:flex justify-center">
         <img src="/images/farmer-box.png" alt="Farmer Holding Basket" className="w-64 lg:w-80 object-contain" />
       </div>
     </div>
   </div>

   {/* ✅ Newest Products Section */}
   <div className="max-w-7xl mx-auto mt-16">
    <h2 className="text-2xl md:text-3xl font-bold mb-8">Newest Products</h2>
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
       {[
        { name: "Green Apples", img: "/images/greenapples.png" },
        { name: "Chinese Cabbage", img: "/images/chinese-cabbage.png" },
        { name: "Lettuce", img: "/images/lettuce.png" },
        { name: "Green Peppers", img: "/images/green-peppers.png" },
        { name: "Corn", img: "/images/corn.png" },
      ].map((product) => (
        <div key={product.name} className=" rounded-xl shadow-sm border p-4 text-left">
          <img src={product.img} alt={product.name} className="h-32 mx-auto mb-4 object-contain" />
          <p className="text-xs text-gray-500">Vegetables</p>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <div className="flex items-center gap-1">
            <p className="text-sm text-gray-600">By Mr.food</p>
            <div className="flex text-yellow-400">★★★★☆</div>
            <span className="text-xs text-gray-500">(4)</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-green-700 font-bold text-lg">$2</span>
            <span className="line-through text-gray-400 text-sm">$3.99</span>
            <button 
              className="border border-green-600 text-green-600 px-3 py-1 rounded-full text-sm hover:bg-green-600 hover:text-white transition-colors"
              onClick={() => handleContactClick(product)}
            >
              Contact
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
{/* ✅ Testimonials + Instagram Section */}
<section className="bg-[#EDF6ED] py-20 px-4 md:px-12">
  <div className="max-w-7xl mx-auto">
    {/* Section Title */}
    <h2 className="text-2xl md:text-3xl font-bold mb-12">Client Testimonial</h2>

    {/* Testimonial Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          name: "Robert Fox",
          role: "Customer",
          img: "/images/robert.png",
          review: "Pellentesque eu nibh eget mauris congue mattis nec ut tellus. Praesent imperdiet nulla nec magna dapibus, nec iaculis velit molestie.",
        },
        {
          name: "Dianne Russel",
          role: "Customer",
          img: "/images/dianne.png",
          review: "Pellentesque eu nibh eget mauris congue mattis nec ut tellus. Praesent imperdiet nulla nec magna dapibus, nec iaculis velit molestie.",
        },
        {
          name: "Eleanor Pena",
          role: "Customer",
          img: "/images/eleanor.png",
          review: "Pellentesque eu nibh eget mauris congue mattis nec ut tellus. Praesent imperdiet nulla nec magna dapibus, nec iaculis velit molestie.",
        },
      ].map((t, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm relative">
          <div className="text-3xl text-green-600 mb-4">“</div>
          <p className="text-gray-700 text-sm mb-6">{t.review}</p>
          <div className="flex items-center gap-4">
            <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-xs text-gray-500">{t.role}</p>
            </div>
          </div>
          <div className="flex mt-3 gap-1 text-yellow-400 text-sm">
            ★★★★★
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

 {/* ✅ Instagram Gallery Section */}
 <section className="mb-9 bg-white py-16 px-4 md:px-12">
   <div className="max-w-7xl mx-auto">
     <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Follow us on Instagram</h2>
     <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
       {[
        "/images/tomatoes.png",
        "/images/green-leaf.png",
        "/images/leaf-closeup.png",
        "/images/pepper.png",
        "/images/coconut.png",
        "/images/fruits.png",
      ].map((src, i) => (
        <img key={i} src={src} alt={`insta-${i}`} className="rounded-lg w-full h-24 md:h-32 object-cover" />
      ))}
    </div>
  </div>
</section>

 
      {/* Newsletter Section */}
      <section className="bg-[#2c2a29] py-16 px-4 md:px-8 lg:px-12 -mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left side - Newsletter info */}
          <div className="flex items-center gap-4 text-white">
            <div className="flex-shrink-0">
              {/* Email icon */}
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Join the Movement
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Get updates on AE/EOA events, stories, outlets, and resources that empower African farmers.
              </p>
            </div>
          </div>

          {/* Right side - Email signup form */}
          <div className="flex w-full md:w-auto min-w-80">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 text-gray-900 bg-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-r-full font-medium text-sm transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      
     {/* ✅ Footer Section */}
<footer className="bg-[#24231d] py-6 sm:py-8 px-4 md:px-8 lg:px-12">
    <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6">
            
            {/* ✅ Left Section - Logo and Description */}
<div className="w-full lg:w-[421px] flex flex-col items-start gap-3">
  <img 
    src="https://api.builder.io/api/v1/image/assets/TEMP/a516e3e257957bba69588e0c195041412cec5913?width=494" 
    alt="Biovision Africa Trust" 
    className="w-[180px] sm:w-[220px] h-auto object-contain"
  />

  <h3 className="text-[#fdfbf6] text-base sm:text-lg font-bold leading-6">
    Growing Africa's Future Through <br/>Sustainable Agriculture
  </h3>

  <p className="text-[#fdfbf6] text-xs sm:text-sm font-normal leading-[22px]">
    We partner with farmers across Africa to build sustainable food
    systems through agroecology, creating premium 
    products that
    support rural communities.
  </p>

  {/* ✅ Social Media Icons */}
  <div className="flex items-center gap-3 sm:gap-4 mt-1">
     {/* Twitter */}
    <div className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="16" width="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.35c-.84.5-1.77.84-2.76 1.03a4.26 4.26 0 0 0-7.26 3.88 12.1 12.1 0 0 1-8.78-4.45 4.25 4.25 0 0 0 1.32 5.67A4.22 4.22 0 0 1 2.8 9v.05a4.26 4.26 0 0 0 3.42 4.18 4.3 4.3 0 0 1-1.93.07 4.26 4.26 0 0 0 3.98 2.96A8.54 8.54 0 0 1 2 18.58 12.07 12.07 0 0 0 8.29 20c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.27 8.27 0 0 0 22.46 6z"/>
      </svg>
    </div>

    {/* Facebook */}
    <div className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="16" width="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.51 1.5-3.89 3.8-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z"/>
      </svg>
    </div>

    {/* Pinterest */}
    <div className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="16" width="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.14 2.57 7.67 6.2 9.13-.08-.78-.15-1.97.03-2.82.17-.79 1.1-5.04 1.1-5.04s-.28-.57-.28-1.41c0-1.32.77-2.3 1.73-2.3.81 0 1.2.61 1.2 1.34 0 .82-.52 2.05-.79 3.19-.23.97.48 1.76 1.42 1.76 1.71 0 3.03-1.8 3.03-4.39 0-2.3-1.65-3.91-4.01-3.91-2.73 0-4.34 2.05-4.34 4.18 0 .83.32 1.72.72 2.2a.29.29 0 0 1 .07.28c-.07.31-.23.97-.26 1.1-.04.17-.14.21-.31.13-1.17-.54-1.9-2.22-1.9-3.57 0-2.91 2.12-5.58 6.12-5.58 3.21 0 5.71 2.29 5.71 5.36 0 3.18-2 5.74-4.77 5.74-1.1 0-2.14-.57-2.5-1.23l-.68 2.61c-.25.97-.94 2.2-1.41 2.94 1.06.33 2.18.51 3.34.51 5.51 0 9.96-4.45 9.96-9.96S17.51 2.04 12 2.04z"/>
      </svg>
    </div>

    {/* Instagram */}
    <div className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="16" width="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.75 2C5.13 2 3 4.13 3 6.75v10.5C3 19.87 5.13 22 7.75 22h8.5C18.87 22 21 19.87 21 17.25V6.75C21 4.13 18.87 2 16.25 2h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.25.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
      </svg>
    </div>

  </div>
</div>

{/* ✅ Middle Section - Explore Links */}
<div className="w-full lg:w-[187.25px] flex flex-col items-start gap-2 lg:mt-18 lg:ml-16">
  <h3 className="text-[#FDFBF6] font-semibold text-base sm:text-lg ml-0 lg:ml-5 leading-tight">
    Explore
  </h3>
  
  {/* Green underline with dot */}
  <div className="flex ml-0 lg:ml-5 items-center gap-1 mt-1 mb-3 sm:mb-4">
    <div className="w-[35px] h-[2px] bg-[#2e7d32] rounded-sm" />
    <div className="w-[5px] h-[5px] bg-[#2e7d32] rounded-full" />
  </div>
  
  {/* Links */}
  <div className="ml-0 lg:ml-4 flex flex-col items-start gap-2 w-full">
    {[
      { text: "Our Mission", icon: "🚀" },
      { text: "Sustainability Reports", icon: "🚀" },
      { text: "Become a Partner", icon: "🚀" },
      { text: "Press & Media", icon: "🚀" },
      { text: "Careers", icon: "🚀" },
      { text: "FAQs", icon: "🚀" }
    ].map((item, index) => (
      <a href="#" key={index} className="flex items-center gap-2 text-[#FDFBF6] text-xs sm:text-sm leading-[22px] hover:text-gray-300 transition-colors">
        <span className="text-[#FDFBF6] filter brightness-0 invert">{item.icon}</span>
        <span>{item.text}</span>
      </a>
    ))}
  </div>
</div>

            {/* ✅ Right Section - Contact Information */}
<div className="lg:ml-9 w-full lg:w-[345px] flex flex-col gap-3 lg:mt-18">
  <h3 className="text-[#FDFBF6] font-semibold text-base sm:text-lg ml-0 lg:ml-5 leading-tight">
    Contact
  </h3>

  {/* Green underline with dot */}
  <div className="flex ml-0 lg:ml-5 items-center gap-1 mt-1 mb-3 sm:mb-4">
    <div className="w-[35px] h-[2px] bg-[#2e7d32] rounded-sm" />
    <div className="w-[5px] h-[5px] bg-[#2e7d32] rounded-full" />
  </div>

  <div className="ml-0 lg:ml-5 flex flex-col gap-2 text-[#fdfbf6] text-xs sm:text-sm leading-[22px] font-normal font-sans">

    {/* Phone */}
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
      <span>+254 (0) 20 632 4806</span>
    </div>

    {/* Email */}
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
      <span className="break-all">info@biovisionafricatrust.org</span>
    </div>
    {/* More Filters Example */}
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 01-2 0v-2a1 1 0 012 0v.93A8.001 8.001 0 0120 12c0-4.41-3.59-8-8-8S4 7.59 4 12c0 3.53 2.29 6.53 5.5 7.61z"/>
      </svg>
      <span>Filter: Organic Only</span>
    </div>
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M7 10l5 5 5-5H7z"/>
      </svg>
      <span>Filter: In Stock</span>
    </div>
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c2.54 0 4.71 1.61 5.5 4.09C13.79 4.61 15.96 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <span>Filter: Favorites</span>
    </div>

    {/* Address */}
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      <span>Duduville Campus, Kasarani Nairobi, Kenya</span>
    </div>

    {/* P.O. Box */}
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      <span>P.O. Box 12345, Nairobi, Kenya</span>
    </div>

    {/* Hours */}
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      <div>
        <div>Monday - Friday: 8:00 AM - 5:00 PM EAT</div>
        <div>Saturday: 9:00 AM - 1:00 PM EAT</div>
        <div>Sunday: Closed</div>
      </div>
    </div>

  </div>
</div>

        </div>
      </div>
    </footer>

    {/* Bottom Section */}
    {/* Updated Bottom Section - Full Width */}
    {/* Bottom Section - Full Width Outside Container */}
    <div className="w-full bg-[#2c2a29] border-t border-gray-700 pt-4 sm:pt-6 pb-4 sm:pb-6">
      <div className="max-w-9xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <p className="ml-0 sm:ml-3 text-yellow-500 text-xs font-medium text-center sm:text-left">
          © 2025 BioVision Africa Trust. All Rights Reserved.
        </p>
        <div className="mr-0 sm:mr-9 flex gap-2 sm:gap-3 text-xs">
          <a href="#" className="text-yellow-500 hover:text-white transition-colors duration-300">Terms of Use</a>
          <span className="text-gray-600">|</span>
          <a href="#" className="text-yellow-500 hover:text-white transition-colors duration-300">Privacy Policy</a>
          <span className="text-gray-600">|</span>
          <a href="#" className="text-yellow-500 hover:text-white transition-colors duration-300">Cookie Policy</a>
        </div>
      </div>
    </div>
    </div>
  );
}
