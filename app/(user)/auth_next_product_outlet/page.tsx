"use client";

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building, CheckCircle, AlertCircle } from 'lucide-react';
import { authApi } from '@/lib/auth-api';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        const response = await authApi.signIn({
          email: formData.email,
          password: formData.password,
        });
        
        // Store token and redirect
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Always redirect to admin dashboard
        window.location.href = 'http://139.59.165.92:3000/admin';
      } else {
        const response = await authApi.signUp({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          password: formData.password,
        });
        
        setSuccess('Account created successfully! Please sign in.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Image */}
      <img
        src="/images/africa.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover "
      />
      <div className="absolute inset-0 bg-black/30 -z-10"></div>
      
      <div className="w-full flex items-center justify-center">
        {/* Right Side - Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-black/20 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
            
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8 text-white">
              <img
                src="/images/greenlogo.png"
                alt="Biovision Africa Trust"
                className="h-12 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-white">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-white/80 mt-2">
                {isLogin ? 'Sign in to your account' : 'Join our farming community'}
              </p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block text-center mb-8 text-white">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Create Your Account'}
              </h2>
              <p className="text-white/80">
                {isLogin ? 'Sign in to continue your journey' : 'Start your agroecology journey today'}
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-full p-1 mb-8">
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all text-gray-600 ${
                  !isLogin 
                    ? 'bg-white text-green-600 shadow-sm' 
                    : 'hover:text-gray-900'
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all text-gray-600 ${
                  isLogin 
                    ? 'bg-white text-green-600 shadow-sm' 
                    : 'hover:text-gray-900'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 text-sm">{success}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Fields - Always show for Sign Up, first in layout */}
              {!isLogin && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required={!isLogin}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder:text-white/60"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required={!isLogin}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder:text-white/60"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder:text-white/60"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Phone & Organization - Only for Sign Up */}
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required={!isLogin}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder:text-white/60"
                      placeholder="+254 xxx xxx xxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Role *
                    </label>
                    <select
                      name="role"
                      required={!isLogin}
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white"
                    >
                      <option value="">Select your role</option>
                      <option value="content_manager">Content Manager</option>
                      <option value="producer">Producer</option>
                      <option value="organizer">Organizer</option>
                      <option value="analyst">Analyst</option>
                      <option value="researcher">Researcher</option>
                      <option value="consumer">Consumer</option>
                      <option value="outlet_manager">Outlet Manager</option>
                    </select>
                  </div>
                </>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder:text-white/60"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password - Only for Sign Up */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder:text-white/60"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Checkboxes - Only for Sign Up */}
              {!isLogin && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      required={!isLogin}
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label className="text-sm text-white/80">
                      I agree to the <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 hover:underline">Privacy Policy</a> *
                    </label>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label className="text-sm text-white/80">
                      Subscribe to our newsletter for farming tips and updates
                    </label>
                  </div>
                </div>
              )}

              {/* Forgot Password - Only for Sign In */}
              {isLogin && (
                <div className="text-right">
                  <a href="#" className="text-sm text-green-400 hover:underline">
                    Forgot your password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-black/20 backdrop-blur-sm text-white/80 rounded-full">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2">Google</span>
                </button>

                <button className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-white/80">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-green-400 hover:underline font-medium"
                >
                  {isLogin ? 'Sign up here' : 'Sign in here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}