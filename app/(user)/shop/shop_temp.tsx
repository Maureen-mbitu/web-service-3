            {/* Promo Cards Section */}
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
                            <button 
                                onClick={() => router.push('/shop')}
                                className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs hover:bg-blue-50 transition-colors shadow-lg"
                            >
                                Shop Now →
                            </button>
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
                            <button 
                                onClick={() => router.push('/shop')}
                                className="bg-white text-cyan-600 px-3 py-1 rounded-full text-xs hover:bg-cyan-50 transition-colors shadow-lg"
                            >
                                Shop Now →
                            </button>
                        </div>
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
                            <button 
                                onClick={() => router.push('/shop')}
                                className="bg-green-700 text-white px-3 py-1 rounded-full text-xs hover:bg-green-800 transition-colors shadow-lg"
                            >
                                Shop Now →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Special Deal Section */}
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
                            <button 
                                onClick={() => router.push('/shop')}
                                className="bg-green-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition"
                            >
                                Shop now →
                            </button>
                        </div>
                        <div className="hidden lg:flex justify-center">
                            <img src="/images/farmer-box.png" alt="Farmer Holding Basket" className="w-64 lg:w-80 object-contain" />
                        </div>
                    </div>
                </div>

                {/* Newest Products Section */}
                <div className="max-w-7xl mx-auto mt-16">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">Newest Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { name: "Green Apples", img: "/images/greenapples.png" },
                            { name: "Chinese Cabbage", img: "/images/chinese-cabbage.png" },
                            { name: "Lettuce", img: "/images/lettuce.png" },
                            { name: "Green Peppers", img: "/images/green-peppers.png" },
                            { name: "Corn", img: "/images/corn.png" },
                        ].map((product) => (
                            <div key={product.name} className="bg-white rounded-xl shadow-sm border p-4 text-left">
                                <img src={product.img} alt={product.name} className="h-32 mx-auto mb-4 object-contain" />
                                <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Vegetables</p>
                                <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                                <div className="flex items-center gap-1">
                                    <p className="text-sm text-gray-800 font-medium">By Mr.food</p>
                                    <div className="flex text-yellow-400">★★★★☆</div>
                                    <span className="text-xs text-gray-700 font-medium">(4)</span>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-green-700 font-bold text-lg">$2</span>
                                    <span className="line-through text-gray-500 text-sm">$3.99</span>
                                    <button 
                                        className="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700 transition-colors font-medium"
                                        onClick={() => router.push('/contact')}
                                    >
                                        Contact
                                    </button>
                                </div>
                            </div>
                        ))
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-[#EDF6ED] py-20 px-4 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-12 text-gray-900">Client Testimonial</h2>
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
                                <div className="text-3xl text-green-600 mb-4">"</div>
                                <p className="text-gray-800 text-sm mb-6 font-medium leading-relaxed">{t.review}</p>
                                <div className="flex items-center gap-4">
                                    <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <p className="font-bold text-gray-900">{t.name}</p>
                                        <p className="text-xs text-gray-700 font-medium">{t.role}</p>
                                    </div>
                                </div>
                                <div className="flex mt-3 gap-1 text-yellow-400 text-sm">
                                    ★★★★★
                                </div>
                            </div>
                        ))
                    </div>
                </div>
            </section>

            {/* Instagram Gallery Section */}
            <section className="mb-9 bg-white py-16 px-4 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">Follow us on Instagram</h2>
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
                    <div className="flex items-center gap-4 text-white">
                        <div className="flex-shrink-0">
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
            <footer className="bg-[#24231d] py-6 sm:py-8 px-4 md:px-8 lg:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6">
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
                                We partner with farmers across Africa to build sustainable food systems through agroecology, creating premium products that support rural communities.
                            </p>
                            <div className="flex items-center gap-3 sm:gap-4 mt-1">
                                <div className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full bg-[#2e7d32]">
                                    <svg fill="#FDFBF6" height="16" width="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.35c-.84.5-1.77.84-2.76 1.03a4.26 4.26 0 0 0-7.26 3.88 12.1 12.1 0 0 1-8.78-4.45 4.25 4.25 0 0 0 1.32 5.67A4.22 4.22 0 0 1 2.8 9v.05a4.26 4.26 0 0 0 3.42 4.18 4.3 4.3 0 0 1-1.93.07 4.26 4.26 0 0 0 3.98 2.96A8.54 8.54 0 0 1 2 18.58 12.07 12.07 0 0 0 8.29 20c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.27 8.27 0 0 0 22.46 6z"/>
                                    </svg>
                                </div>
                                <div className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full bg-[#2e7d32]">
                                    <svg fill="#FDFBF6" height="16" width="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.51 1.5-3.89 3.8-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z"/>
                                    </svg>
                                </div>
                                <div className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full bg-[#2e7d32]">
                                    <svg fill="#FDFBF6" height="16" width="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.14 2.57 7.67 6.2 9.13-.08-.78-.15-1.97.03-2.82.17-.79 1.1-5.04 1.1-5.04s-.28-.57-.28-1.41c0-1.32.77-2.3 1.73-2.3.81 0 1.2.61 1.2 1.34 0 .82-.52 2.05-.79 3.19-.23.97.48 1.76 1.42 1.76 1.71 0 3.03-1.8 3.03-4.39 0-2.3-1.65-3.91-4.01-3.91-2.73 0-4.34 2.05-4.34 4.18 0 .83.32 1.72.72 2.2a.29.29 0 0 1 .07.28c-.07.31-.23.97-.26 1.1-.04.17-.14.21-.31.13-1.17-.54-1.9-2.22-1.9-3.57 0-2.91 2.12-5.58 6.12-5.58 3.21 0 5.71 2.29 5.71 5.36 0 3.18-2 5.74-4.77 5.74-1.1 0-2.14-.57-2.5-1.23l-.68 2.61c-.25.97-.94 2.2-1.41 2.94 1.06.33 2.18.51 3.34.51 5.51 0 9.96-4.45 9.96-9.96S17.51 2.04 12 2.04z"/>
                                    </svg>
                                </div>
                                <div className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full bg-[#2e7d32]">
                                    <svg fill="#FDFBF6" height="16" width="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.75 2C5.13 2 3 4.13 3 6.75v10.5C3 19.87 5.13 22 7.75 22h8.5C18.87 22 21 19.87 21 17.25V6.75C21 4.13 18.87 2 16.25 2h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.25.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-[187.25px] flex flex-col items-start gap-2 lg:mt-18 lg:ml-16">
                            <h3 className="text-[#FDFBF6] font-semibold text-base sm:text-lg ml-0 lg:ml-5 leading-tight">
                                Explore
                            </h3>
                            <div className="flex ml-0 lg:ml-5 items-center gap-1 mt-1 mb-3 sm:mb-4">
                                <div className="w-[35px] h-[2px] bg-[#2e7d32] rounded-sm" />
                                <div className="w-[5px] h-[5px] bg-[#2e7d32] rounded-full" />
                            </div>
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

                        <div className="lg:ml-9 w-full lg:w-[345px] flex flex-col gap-3 lg:mt-18">
                            <h3 className="text-[#FDFBF6] font-semibold text-base sm:text-lg ml-0 lg:ml-5 leading-tight">
                                Contact
                            </h3>
                            <div className="flex ml-0 lg:ml-5 items-center gap-1 mt-1 mb-3 sm:mb-4">
                                <div className="w-[35px] h-[2px] bg-[#2e7d32] rounded-sm" />
                                <div className="w-[5px] h-[5px] bg-[#2e7d32] rounded-full" />
                            </div>
                            <div className="ml-0 lg:ml-5 flex flex-col gap-2 text-[#fdfbf6] text-xs sm:text-sm leading-[22px] font-normal font-sans">
                                <div className="flex items-start gap-2">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                    </svg>
                                    <span>+254 (0) 20 632 4806</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                    <span className="break-all">info@biovisionafricatrust.org</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                    </svg>
                                    <span>Duduville Campus, Kasarani Nairobi, Kenya</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                    </svg>
                                    <span>P.O. Box 12345, Nairobi, Kenya</span>
                                </div>
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