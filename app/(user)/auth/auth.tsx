
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AuthPage() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.phoneNumber.trim()) {
      console.log(`${isSignIn ? 'Signing in' : 'Signing up'} with:`, formData);
      setTimeout(() => {
        router.push('/');
      }, 500);
    } else {
      alert('Please enter your phone number');
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="/images/background2.png"
          alt="Background"
          fill
          className="object-cover brightness-100 contrast-110"
          priority
        />
      </div>

      {/* Africa Map Overlay - Hidden on mobile, positioned responsively on larger screens */}
      <div
        className={`absolute top-0 h-full w-[35%] lg:w-[40%] xl:w-[45%] z-10 pointer-events-none hidden lg:block transition-all duration-300 ${
          isSignIn ? 'left-0 ml-4 xl:ml-20' : 'right-0 mr-4 xl:mr-20'
        }`}
      >
        <Image
          src="/images/africa2.png"
          alt="Africa Map"
          fill
          className={`object-contain mix-blend-multiply brightness-100 contrast-125 ${
            isSignIn ? 'object-left' : 'object-right'
          }`}
        />
      </div>

      {/* Form Container - Responsive positioning */}
      <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className={`w-full transition-all duration-300 ${
            isSignIn
              ? 'lg:ml-auto lg:mr-4 xl:mr-20 lg:max-w-md xl:max-w-lg'
              : 'lg:mr-auto lg:ml-4 xl:ml-20 lg:max-w-md xl:max-w-lg'
          } max-w-sm sm:max-w-md`}
        >
          <div className="bg-white/85 sm:bg-white/80 backdrop-blur-lg border border-white/50 rounded-xl p-6 sm:p-8 shadow-2xl space-y-4 z-20">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {isSignIn ? 'Sign In' : 'Join us today'}
            </h1>

            <p className="text-gray-700 text-sm leading-relaxed">
              {isSignIn
                ? 'Enter your phone number to sign in to your account'
                : 'Empowering communities through agroecology. Start by entering your phone number.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && (
                <>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="text-xs text-gray-700 block mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="i.e. Davon"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="text-xs text-gray-700 block mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="i.e. Lean"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs text-gray-700 block mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="i.e. davon.lean@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="text-xs text-gray-700 block mb-1"
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      placeholder="i.e. Farmer"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-xs text-gray-700 block mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="text-xs text-gray-700 block mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                    />
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="text-xs text-gray-700 block mb-1"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <div className="flex items-center px-2 py-2 border border-gray-300 bg-white rounded-md text-sm space-x-1.5 shrink-0">
                    <Image
                      src="/images/flag.png"
                      alt="Kenya Flag"
                      width={20}
                      height={14}
                      className="rounded-sm"
                    />
                    <span className="text-gray-800">+254</span>
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="0712 345 678"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                </div>
              </div>

              {isSignIn && (
                <div className="flex items-center space-x-2 text-xs text-gray-700">
                  <input type="checkbox" id="remember" className="h-4 w-4" />
                  <label htmlFor="remember">Remember me</label>
                </div>
              )}

              <p className="text-xs text-gray-600 italic">
                We'll never share your number. Standard SMS rates may apply.
              </p>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 sm:py-2 rounded-md transition duration-200"
              >
                Send OTP
              </button>

              <p className="text-xs text-gray-700">
                {isSignIn ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignIn(false)}
                      className="text-green-600 hover:underline"
                    >
                      Create free account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignIn(true)}
                      className="text-green-600 hover:underline"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </p>

              <p className="text-[11px] text-gray-500 leading-relaxed">
                By continuing you accept our{' '}
                <a href="#" className="text-green-600 hover:underline">
                  Terms of Service
                </a>
                . Also learn how we process your data in our{' '}
                <a href="#" className="text-green-600 hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="#" className="text-green-600 hover:underline">
                  Cookies policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


//           isSignIn ? 'left-0 ml-4 xl:ml-20' : 'right-0 mr-4 xl:mr-20'
//         }`}
//       >
//         <Image
//           src="/images/africa2.png"
//           alt="Africa Map"
//           fill
//           className={`object-contain mix-blend-multiply brightness-100 contrast-125 ${
//             isSignIn ? 'object-left' : 'object-right'
//           }`}
//         />
//       </div>

//       {/* Form Container - Responsive positioning */}
//       <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div
//           className={`w-full transition-all duration-300 ${
//             isSignIn
//               ? 'lg:ml-auto lg:mr-4 xl:mr-20 lg:max-w-md xl:max-w-lg'
//               : 'lg:mr-auto lg:ml-4 xl:ml-20 lg:max-w-md xl:max-w-lg'
//           } max-w-sm sm:max-w-md`}
//         >
//           <div className="bg-white/85 sm:bg-white/80 backdrop-blur-lg border border-white/50 rounded-xl p-6 sm:p-8 shadow-2xl space-y-4 z-20">
//             <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
//               {isSignIn ? 'Sign In' : 'Join us today'}
//             </h1>

//             <p className="text-gray-700 text-sm leading-relaxed">
//               {isSignIn
//                 ? 'Enter your phone number to sign in to your account'
//                 : 'Empowering communities through agroecology. Start by entering your phone number.'}
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {!isSignIn && (
//                 <div>
//                   <label
//                     htmlFor="fullName"
//                     className="text-xs text-gray-700 block mb-1"
//                   >
//                     First & Last Name
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     id="fullName"
//                     placeholder="i.e. Davon Lean"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
//                   />
//                 </div>
//               )}

//               <div>
//                 <label
//                   htmlFor="phoneNumber"
//                   className="text-xs text-gray-700 block mb-1"
//                 >
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex space-x-2">
//                   <div className="flex items-center px-2 py-2 border border-gray-300 bg-white rounded-md text-sm space-x-1.5 shrink-0">
//                     <Image
//                       src="/images/flag.png"
//                       alt="Kenya Flag"
//                       width={20}
//                       height={14}
//                       className="rounded-sm"
//                     />
//                     <span className="text-gray-800">+254</span>
//                   </div>
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     id="phoneNumber"
//                     placeholder="0712 345 678"
//                     value={formData.phoneNumber}
//                     onChange={handleInputChange}
//                     className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
//                   />
//                 </div>
//               </div>

//               {isSignIn && (
//                 <div className="flex items-center space-x-2 text-xs text-gray-700">
//                   <input type="checkbox" id="remember" className="h-4 w-4" />
//                   <label htmlFor="remember">Remember me</label>
//                 </div>
//               )}

//               <p className="text-xs text-gray-600 italic">
//                 We'll never share your number. Standard SMS rates may apply.
//               </p>

//               <button
//                 type="submit"
//                 className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 sm:py-2 rounded-md transition duration-200"
//               >
//                 Send OTP
//               </button>

//               <p className="text-xs text-gray-700">
//                 {isSignIn ? (
//                   <>
//                     Don't have an account?{' '}
//                     <button
//                       type="button"
//                       onClick={() => setIsSignIn(false)}
//                       className="text-green-600 hover:underline"
//                     >
//                       Create free account
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     Already have an account?{' '}
//                     <button
//                       type="button"
//                       onClick={() => setIsSignIn(true)}
//                       className="text-green-600 hover:underline"
//                     >
//                       Sign In
//                     </button>
//                   </>
//                 )}
//               </p>

//               <p className="text-[11px] text-gray-500 leading-relaxed">
//                 By continuing you accept our{' '}
//                 <a href="#" className="text-green-600 hover:underline">
//                   Terms of Service
//                 </a>
//                 . Also learn how we process your data in our{' '}
//                 <a href="#" className="text-green-600 hover:underline">
//                   Privacy Policy
//                 </a>{' '}
//                 and{' '}
//                 <a href="#" className="text-green-600 hover:underline">
//                   Cookies policy
//                 </a>
//                 .
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }