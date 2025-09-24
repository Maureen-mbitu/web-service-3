"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef } from "react";
import { BookOpen, Clock, DollarSign, GraduationCap, Heart, Leaf, MessageSquare, Smile, Sprout, Users, X, ArrowLeft, Star, CheckCircle, AlertCircle } from "lucide-react";

// Define types
interface Survey {
    id: number;
    title: string;
    description: string;
    duration: string;
    responses: number;
    status: 'ongoing' | 'closed';
}

interface SurveyResponses {
    usage: string;
    satisfaction: string;
    experience: string | number;
    recommendation: string | number;
    interaction: string | number;
    questions: (string | number)[];
}

interface SurveyCardProps {
    survey: Survey;
    isOngoing?: boolean;
}

export default function Surveys() {
    const [currentPage, setCurrentPage] = useState('surveys');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState("");
    const [heroSearchQuery, setHeroSearchQuery] = useState("");
    const [showSurveyModal, setShowSurveyModal] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("ongoing");
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showValidationError, setShowValidationError] = useState(false);
    const [surveyResponses, setSurveyResponses] = useState<SurveyResponses>({
        usage: '',
        satisfaction: '',
        experience: '',
        recommendation: '',
        interaction: '',
        questions: ['', '', '', '', '']
    });
    
    const allSurveysRef = useRef<HTMLElement>(null);

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

    // Sample survey data
    const ongoingSurveys: Survey[] = [
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
        }
    ];

    const allSurveys: Survey[] = [
        ...ongoingSurveys,
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
        },
        {
            id: 9,
            title: "Partnership Feedback",
            description: "Feedback on our partnership programs and collaborations.",
            duration: "5-6 minutes",
            responses: 298,
            status: "closed"
        },
        {
            id: 10,
            title: "Website Usability Study",
            description: "Help us improve your experience on our platform.",
            duration: "4-5 minutes",
            responses: 421,
            status: "closed"
        }
    ];

    // Filter surveys based on search query and current filter
    const getFilteredSurveys = () => {
        let surveysToFilter = [];
        
        if (currentFilter === "all") {
            surveysToFilter = allSurveys;
        } else if (currentFilter === "ongoing") {
            surveysToFilter = ongoingSurveys;
        } else if (currentFilter === "closed") {
            surveysToFilter = allSurveys.filter(survey => survey.status === "closed");
        }

        const searchTerm = heroSearchQuery.toLowerCase();
        if (searchTerm) {
            return surveysToFilter.filter(survey => 
                survey.title.toLowerCase().includes(searchTerm) ||
                survey.description.toLowerCase().includes(searchTerm)
            );
        }

        return surveysToFilter;
    };

    // Validation function
    const validateSurveyResponses = () => {
        const errors: string[] = [];
        
        if (!surveyResponses.usage) {
            errors.push("Please select how often you use our product/service");
        }
        
        if (!surveyResponses.satisfaction) {
            errors.push("Please rate your satisfaction with our product");
        }
        
        if (!surveyResponses.experience) {
            errors.push("Please rate your experience with our product");
        }
        
        if (!surveyResponses.recommendation) {
            errors.push("Please rate how likely you would recommend our product");
        }
        
        if (!surveyResponses.interaction) {
            errors.push("Please rate how easy it was to interact with our company");
        }
        
        // Check if all additional questions are answered
        const unansweredQuestions = surveyResponses.questions.filter((q, index) => !q);
        if (unansweredQuestions.length > 0) {
            errors.push(`Please answer all additional questions (${unansweredQuestions.length} remaining)`);
        }
        
        return errors;
    };

    // Survey Modal Functions
    const openSurveyModal = () => {
        setShowSurveyModal(true);
        setValidationErrors([]);
        setShowValidationError(false);
        // Reset responses
        setSurveyResponses({
            usage: '',
            satisfaction: '',
            experience: '',
            recommendation: '',
            interaction: '',
            questions: ['', '', '', '', '']
        });
    };

    const closeSurveyModal = () => {
        setShowSurveyModal(false);
        setValidationErrors([]);
        setShowValidationError(false);
    };

    const handleResponseChange = (field: keyof SurveyResponses, value: string | number) => {
        setSurveyResponses(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear validation errors when user starts filling
        if (validationErrors.length > 0) {
            setValidationErrors([]);
            setShowValidationError(false);
        }
    };

    const handleQuestionResponse = (questionIndex: number, value: string | number) => {
        setSurveyResponses(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => i === questionIndex ? value : q)
        }));
        
        // Clear validation errors when user starts filling
        if (validationErrors.length > 0) {
            setValidationErrors([]);
            setShowValidationError(false);
        }
    };

    const submitSurvey = () => {
        const errors = validateSurveyResponses();
        
        if (errors.length > 0) {
            setValidationErrors(errors);
            setShowValidationError(true);
            // Scroll to top of modal to show error
            const modalElement = document.querySelector('.survey-modal-content');
            if (modalElement) {
                modalElement.scrollTop = 0;
            }
            return;
        }
        
        // Handle survey submission
        console.log('Survey submitted:', surveyResponses);
        closeSurveyModal();
        setShowSuccessPopup(true);
    };

    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    const takeAnotherSurvey = () => {
        setShowSuccessPopup(false);
        openSurveyModal();
    };

    const SurveyCard = ({ survey, isOngoing = false }: SurveyCardProps) => (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isOngoing
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                        >
                            {isOngoing ? "Ongoing" : "Closed"}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {survey.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{survey.description}</p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{survey.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{survey.responses} responses</span>
                    </div>
                </div>

                {isOngoing && (
                    <button 
                        onClick={() => router.push('/auth_next_product_outlet')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                        Take Survey
                    </button>
                )}
            </div>
        </div>
    );

    // Success Popup Component
    const SuccessPopup = () => {
        if (!showSuccessPopup) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 backdrop-blur-md bg-black/20"></div>
                
                <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl">
                    <div className="p-8 text-center">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Thanks for Sharing Your Insights!
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Your feedback has been received. Teams and You're helping improve access to better farming tools across Africa!
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={takeAnotherSurvey}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
                            >
                                Take Another Survey
                            </button>
                            <button
                                onClick={closeSuccessPopup}
                                className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-full font-medium transition-colors duration-200"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // One-page Survey Modal Component
    const SurveyModal = () => {
        if (!showSurveyModal) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Blurred background overlay */}
                <div className="absolute inset-0 backdrop-blur-md bg-white/30"></div>
                
                <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl survey-modal-content">
                    <div className="p-8">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Satisfaction Survey</h2>
                                <p className="text-gray-600">Your feedback is valuable and will help us shape future products and experiences. This survey will take approximately 4 minutes to complete.</p>
                                <p className="text-sm text-red-600 mt-2 font-medium">* All fields are required</p>
                            </div>
                            <button
                                onClick={closeSurveyModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Validation Error Alert */}
                        {showValidationError && validationErrors.length > 0 && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-medium text-red-800 mb-2">
                                            Please complete all required fields:
                                        </h3>
                                        <ul className="text-sm text-red-700 space-y-1">
                                            {validationErrors.map((error, index) => (
                                                <li key={index} className="flex items-start gap-1">
                                                    <span className="text-red-600">•</span>
                                                    <span>{error}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* All Questions in One Page */}
                        <div className="space-y-10">
                            {/* Question 1 */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        How often do you use our product/service? <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleResponseChange('usage', option)}
                                                className={`px-4 py-2 rounded-full border transition-colors ${
                                                    surveyResponses.usage === option
                                                        ? 'bg-green-600 text-white border-green-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                                }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        How satisfied are you with our product? <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        {[
                                            { emoji: '😭', label: 'Very Dissatisfied' },
                                            { emoji: '😟', label: 'Dissatisfied' },
                                            { emoji: '😐', label: 'Neutral' },
                                            { emoji: '😊', label: 'Satisfied' },
                                            { emoji: '😍', label: 'Very Satisfied' }
                                        ].map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleResponseChange('satisfaction', option.label)}
                                                className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                                                    surveyResponses.satisfaction === option.label
                                                        ? 'bg-green-50 border-green-400'
                                                        : 'bg-white border-gray-200 hover:border-green-300'
                                                }`}
                                            >
                                                <span className="text-2xl mb-1">{option.emoji}</span>
                                                <span className="text-xs text-gray-600">{option.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Question 2 */}
                            <div className="space-y-6 border-t pt-8">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        How would you rate your experience with our product? <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => handleResponseChange('experience', star)}
                                                className="p-1"
                                            >
                                                <Star
                                                    className={`w-8 h-8 ${
                                                        star <= Number(surveyResponses.experience || 0)
                                                            ? 'text-yellow-400 fill-current'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        On the scale of 1-10, how likely would you recommend our product to others? <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => handleResponseChange('recommendation', num)}
                                                className={`w-10 h-10 rounded-full border transition-colors ${
                                                    Number(surveyResponses.recommendation) === num
                                                        ? 'bg-green-600 text-white border-green-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                                }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Question 3 */}
                            <div className="space-y-6 border-t pt-8">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Based on your experience, how easy or difficult was it to interact with our company? <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => handleResponseChange('interaction', num)}
                                                className={`px-4 py-2 rounded-full border transition-colors ${
                                                    Number(surveyResponses.interaction) === num
                                                        ? 'bg-green-600 text-white border-green-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                                }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                                        <span>Very difficult</span>
                                        <span>Very easy</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Additional Questions <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="space-y-4">
                                        {['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'].map((question, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className="font-medium">{question}</span>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map((rating) => (
                                                        <button
                                                            key={rating}
                                                            onClick={() => handleQuestionResponse(index, rating)}
                                                            className={`w-8 h-8 rounded-full border text-sm transition-colors ${
                                                                Number(surveyResponses.questions[index]) === rating
                                                                    ? 'bg-green-600 text-white border-green-600'
                                                                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                                            }`}
                                                        >
                                                            {rating}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                                            <span>Strongly Disagree</span>
                                            <span>Strongly Agree</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end items-center gap-3 mt-10 pt-6 border-t">
                            <button
                                onClick={closeSurveyModal}
                                className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-2 rounded-full font-medium transition-colors"
                            >
                                Save Draft
                            </button>
                            <button
                                onClick={submitSurvey}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#fdfbf6] text-gray-800">
            <div className="fixed inset-0 bg-black/40" />

            {/* Fixed Navbar */}
            {/* Fixed Navbar */}
            {/* Fixed Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-white/10">
  <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-20 md:h-24">
    {/* Logo */}
    <div className="flex-shrink-0">
      <img
        src="/images/greenlogo.png"
        alt="Biovision Africa Trust"
        className="h-12 md:h-14 object-contain"
      />
    </div>

    

    {/* Desktop Navigation */}
    <nav className="hidden lg:flex items-center space-x-2">
      {navigationItems.map((item, index) => (
        <div key={item.name} className="flex items-center">
          <Link
            href={item.href}
            className={`text-sm font-semibold px-2 transition ${
              currentPage === item.name.toLowerCase()
                ? "text-[#2E7D32]"
                : "text-[#1A1A1A] hover:text-[#2E7D32]"
            }`}
          >
            {item.name}
          </Link>
          {index < navigationItems.length - 1 && (
            <span className="h-6 w-px bg-black/20 mx-2" />

          )}
        </div>
      ))}
    </nav>

    {/* Hamburger button */}
    <div className="block lg:hidden">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="text-green-500 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              mobileMenuOpen
                ? "M6 18L18 6M6 6l12 12" // X icon
                : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
            }
          />
        </svg>
      </button>
    </div>

    {/* Search + Sign Up */}
    <div className="hidden md:flex items-center gap-4">
      {/* Search with circular button */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full border border-green-500 flex items-center justify-center cursor-pointer hover:bg-green-100/10 transition">

          <svg 
            className="w-5 h-5 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
      </div>
      
      {/* Sign Up Button */}
      <Link href="/auth_next_product_outlet" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition">
        Sign Up
      </Link>
      
      {/* Language Selector */}
      <div className="flex items-center gap-1 text-green-500 cursor-pointer">
  <span className="text-sm font-medium">EN</span>
  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</div>

    </div>
  </div>

  {/* Mobile Menu Panel */}
  {mobileMenuOpen && (
    <div className="block lg:hidden px-4 pt-4 pb-6 bg-black/80 backdrop-blur-sm border-t border-white/10">
      <nav className="space-y-3">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block text-sm font-semibold ${
              currentPage === item.name.toLowerCase()
                ? "text-green-400"
                : "text-white hover:text-green-300"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      
      {/* Mobile Search and Sign Up */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <Link href="/auth_next_product_outlet" className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium">
          Sign Up
        </Link>
      </div>
    </div>
  )}
</header>

            {/* Survey Modal */}
            <SurveyModal />

            {/* Success Popup */}
            <SuccessPopup />

            {/* Main Content */}
            <main className={`relative z-10 pt-24 ${showSurveyModal || showSuccessPopup ? 'blur-sm' : ''}`}>
                {/* Hero Section */}
                <section className="bg-gray-50 py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Your Voice Shapes the<br />
                            <span className="text-green-600">Future of Agroecology</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Take part in quick surveys to share your thoughts, improve our resources, and
                            strengthen our network.
                        </p>
                        
                        {/* Filter Tags and Search */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            {/* Filter buttons in a container with border */}
                            <div className="flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                                <button 
                                    onClick={() => setCurrentFilter("all")}
                                    className={`px-4 py-2 rounded-full text-sm transition ml-1 ${
                                        currentFilter === "all" 
                                            ? "bg-green-600 text-white hover:bg-green-700" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    All
                                </button>
                                <button 
                                    onClick={() => setCurrentFilter("ongoing")}
                                    className={`px-4 py-2 rounded-full text-sm transition ml-1 ${
                                        currentFilter === "ongoing" 
                                            ? "bg-green-600 text-white hover:bg-green-700" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Ongoing
                                </button>
                                <button 
                                    onClick={() => setCurrentFilter("closed")}
                                    className={`px-4 py-2 rounded-full text-sm transition ml-1 ${
                                        currentFilter === "closed" 
                                            ? "bg-green-600 text-white hover:bg-green-700" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Completed
                                </button>
                            </div>
                             {/* Search input */}
                             <div className="relative">
                                 <input
                                    type="text"
                                    placeholder="Search surveys..."
                                    value={heroSearchQuery}
                                    onChange={(e) => setHeroSearchQuery(e.target.value)}
                                    className="pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white w-64"
                                />
                                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            
                            {/* Filter icon */}
                            <button className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                            </button>
                        </div>

                        {/* Search Results Info */}
                        {heroSearchQuery && (
                            <div className="mb-4 text-sm text-gray-600">
                                Showing {getFilteredSurveys().length} results for "{heroSearchQuery}"
                            </div>
                        )}
                    </div>
                </section>

                {/* Filtered Surveys Section */}
                <section className="bg-white py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            {currentFilter === "all" ? "All Surveys" : 
                             currentFilter === "ongoing" ? "Ongoing Surveys" : "Completed Surveys"}
                        </h2>
                        
                        {getFilteredSurveys().length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No surveys found</h3>
                                <p className="text-gray-600">
                                    {heroSearchQuery 
                                        ? `No surveys match your search "${heroSearchQuery}"`
                                        : `No ${currentFilter} surveys available at the moment`
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {getFilteredSurveys().map((survey) => (
                                    <SurveyCard key={survey.id} survey={survey} isOngoing={survey.status === 'ongoing'} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-white py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-green-600 px-8 py-12 text-center rounded-xl">
                            <h2 className="text-2xl font-bold mb-4 text-white">Your Story Could Inspire Thousands</h2>
                            <p className="text-white mb-6">
                                Have you started your agroecology journey? Share your experience and become part
                                of a growing movement across Africa.
                            </p>
                            <button className="bg-white text-green-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition">
                                Share your Story
                            </button>
                        </div>
                    </div>
                </section>
            </main>

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

      
     {/* ✅ Footer Section */}
<footer className="bg-[#24231D] py-8 px-4 md:px-8 lg:px-12">
    <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
            
            {/* ✅ Left Section - Logo and Description */}
<div className="w-full lg:w-[421px] flex flex-col items-start gap-3">
  <img 
    src="https://api.builder.io/api/v1/image/assets/TEMP/a516e3e257957bba69588e0c195041412cec5913?width=494" 
    alt="Biovision Africa Trust" 
    className="w-[220px] h-auto object-contain"
  />

  <h3 className="text-[#fdfbf6] text-lg font-bold leading-6">
    Growing Africa's Future Through <br/>Sustainable Agriculture
  </h3>

  <p className="text-[#fdfbf6] text-sm font-normal leading-[22px]">
    We partner with farmers across Africa to build sustainable<br/> food
    systems through agroecology, creating premium <br/>
    products that
    support rural communities.
  </p>

  {/* ✅ Social Media Icons */}
  <div className="flex items-center gap-4 mt-1">
     {/* Twitter */}
    <div className="flex w-10 h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.35c-.84.5-1.77.84-2.76 1.03a4.26 4.26 0 0 0-7.26 3.88 12.1 12.1 0 0 1-8.78-4.45 4.25 4.25 0 0 0 1.32 5.67A4.22 4.22 0 0 1 2.8 9v.05a4.26 4.26 0 0 0 3.42 4.18 4.3 4.3 0 0 1-1.93.07 4.26 4.26 0 0 0 3.98 2.96A8.54 8.54 0 0 1 2 18.58 12.07 12.07 0 0 0 8.29 20c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.27 8.27 0 0 0 22.46 6z"/>
      </svg>
    </div>

    {/* Facebook */}
     {/* Facebook */}
    <div className="flex w-10 h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.51 1.5-3.89 3.8-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z"/>
      </svg>
    </div>

    {/* Pinterest */}
    <div className="flex w-10 h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.14 2.57 7.67 6.2 9.13-.08-.78-.15-1.97.03-2.82.17-.79 1.1-5.04 1.1-5.04s-.28-.57-.28-1.41c0-1.32.77-2.3 1.73-2.3.81 0 1.2.61 1.2 1.34 0 .82-.52 2.05-.79 3.19-.23.97.48 1.76 1.42 1.76 1.71 0 3.03-1.8 3.03-4.39 0-2.3-1.65-3.91-4.01-3.91-2.73 0-4.34 2.05-4.34 4.18 0 .83.32 1.72.72 2.2a.29.29 0 0 1 .07.28c-.07.31-.23.97-.26 1.1-.04.17-.14.21-.31.13-1.17-.54-1.9-2.22-1.9-3.57 0-2.91 2.12-5.58 6.12-5.58 3.21 0 5.71 2.29 5.71 5.36 0 3.18-2 5.74-4.77 5.74-1.1 0-2.14-.57-2.5-1.23l-.68 2.61c-.25.97-.94 2.2-1.41 2.94 1.06.33 2.18.51 3.34.51 5.51 0 9.96-4.45 9.96-9.96S17.51 2.04 12 2.04z"/>
      </svg>
    </div>

    {/* Instagram */}
    <div className="flex w-10 h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.75 2C5.13 2 3 4.13 3 6.75v10.5C3 19.87 5.13 22 7.75 22h8.5C18.87 22 21 19.87 21 17.25V6.75C21 4.13 18.87 2 16.25 2h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.25.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
      </svg>
    </div>

  </div>
</div>

{/* ✅ Middle Section - Explore Links */}
<div className="w-full lg:w-[187.25px] flex flex-col items-start gap-2 mt-18 ml-16">
  <h3 className="text-[#FDFBF6] font-semibold text-lg ml-5 leading-tight">
    Explore
  </h3>
  
  {/* Green underline with dot */}
  <div className="flex ml-5 items-center gap-1 mt-1 mb-4">
    <div className="w-[35px] h-[2px] bg-[#2e7d32] rounded-sm" />
    <div className="w-[5px] h-[5px] bg-[#2e7d32] rounded-full" />
  </div>
  
  {/* Links */}
  <div className="ml-4 flex flex-col items-start gap-2 w-full">
    {[
      { text: "Our Mission", icon: "🚀" },
      { text: "Sustainability Reports", icon: "🚀" },
      { text: "Become a Partner", icon: "🚀" },
      { text: "Press & Media", icon: "🚀" },
      { text: "Careers", icon: "🚀" },
      { text: "FAQs", icon: "🚀" }
    ].map((item, index) => (
      <div key={index} className="flex items-center gap-2 text-[#FDFBF6] text-sm leading-[22px]">
        <span className="text-[#FDFBF6] filter brightness-0 invert">{item.icon}</span>
        <span>{item.text}</span>
      </div>
    ))}
  </div>
</div>

            {/* ✅ Right Section - Contact Information */}
<div className="ml-9 w-full lg:w-[345px] flex flex-col gap-3 mt-18">
  <h3 className="text-[#FDFBF6] font-semibold text-lg ml-5 leading-tight">
    Contact
  </h3>

  {/* Green underline with dot */}
  <div className="flex ml-5 items-center gap-1 mt-1 mb-4">
    <div className="w-[35px] h-[2px] bg-[#2e7d32] rounded-sm" />
    <div className="w-[5px] h-[5px] bg-[#2e7d32] rounded-full" />
  </div>

  <div className="ml-5 flex flex-col gap-2 text-[#fdfbf6] text-sm leading-[22px] font-normal font-sans">

    {/* Phone */}
    <div className="flex items-start gap-2">
      <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
      <span>+254 (0) 20 632 4806</span>
    </div>

    {/* Email */}
    <div className="flex items-start gap-2">
      <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
      <span>info@biovisionafricatrust.org</span>
    </div>

    {/* Address */}
    <div className="flex items-start gap-2">
      <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      <span>Duduville Campus, Kasarani Nairobi, Kenya</span>
    </div>

    {/* P.O. Box */}
    <div className="flex items-start gap-2">
      <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      <span>P.O. Box 12345, Nairobi, Kenya</span>
    </div>

    {/* Hours */}
    <div className="flex items-start gap-2">
      <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
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
        <div className="w-full bg-[#2C2A29] border-t border-gray-700 pt-6 pb-6 ">
            <div className="max-w-9xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className=" ml-3 text-yellow-500 text-xs font-medium">
                    © 2025 BioVision Africa Trust. All Rights Reserved.
                </p>
                <div className="mr-9 flex gap-3 text-xs">
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




"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef } from "react";
import { BookOpen, Clock, DollarSign, GraduationCap, Heart, Leaf, MessageSquare, Smile, Sprout, Users, X, ArrowLeft, Star, CheckCircle, AlertCircle } from "lucide-react";

// Define types
interface Survey {
    id: number;
    title: string;
    description: string;
    duration: string;
    responses: number;
    status: 'ongoing' | 'closed';
}

interface SurveyResponses {
    usage: string;
    satisfaction: string;
    experience: string | number;
    recommendation: string | number;
    interaction: string | number;
    questions: (string | number)[];
}

interface SurveyCardProps {
    survey: Survey;
    isOngoing?: boolean;
}

export default function Surveys() {
    const [currentPage, setCurrentPage] = useState('surveys');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState("");
    const [heroSearchQuery, setHeroSearchQuery] = useState("");
    const [showSurveyModal, setShowSurveyModal] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("ongoing");
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showValidationError, setShowValidationError] = useState(false);
    const [surveyResponses, setSurveyResponses] = useState<SurveyResponses>({
        usage: '',
        satisfaction: '',
        experience: '',
        recommendation: '',
        interaction: '',
        questions: ['', '', '', '', '']
    });
    
    const allSurveysRef = useRef<HTMLElement>(null);

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

    // Sample survey data
    const ongoingSurveys: Survey[] = [
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
        }
    ];

    const allSurveys: Survey[] = [
        ...ongoingSurveys,
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
        },
        {
            id: 9,
            title: "Partnership Feedback",
            description: "Feedback on our partnership programs and collaborations.",
            duration: "5-6 minutes",
            responses: 298,
            status: "closed"
        },
        {
            id: 10,
            title: "Website Usability Study",
            description: "Help us improve your experience on our platform.",
            duration: "4-5 minutes",
            responses: 421,
            status: "closed"
        }
    ];

    // Filter surveys based on search query and current filter
    const getFilteredSurveys = () => {
        let surveysToFilter = [];
        
        if (currentFilter === "all") {
            surveysToFilter = allSurveys;
        } else if (currentFilter === "ongoing") {
            surveysToFilter = ongoingSurveys;
        } else if (currentFilter === "closed") {
            surveysToFilter = allSurveys.filter(survey => survey.status === "closed");
        }

        const searchTerm = heroSearchQuery.toLowerCase();
        if (searchTerm) {
            return surveysToFilter.filter(survey => 
                survey.title.toLowerCase().includes(searchTerm) ||
                survey.description.toLowerCase().includes(searchTerm)
            );
        }

        return surveysToFilter;
    };

    // Validation function
    const validateSurveyResponses = () => {
        const errors: string[] = [];
        
        if (!surveyResponses.usage) {
            errors.push("Please select how often you use our product/service");
        }
        
        if (!surveyResponses.satisfaction) {
            errors.push("Please rate your satisfaction with our product");
        }
        
        if (!surveyResponses.experience) {
            errors.push("Please rate your experience with our product");
        }
        
        if (!surveyResponses.recommendation) {
            errors.push("Please rate how likely you would recommend our product");
        }
        
        if (!surveyResponses.interaction) {
            errors.push("Please rate how easy it was to interact with our company");
        }
        
        // Check if all additional questions are answered
        const unansweredQuestions = surveyResponses.questions.filter((q, index) => !q);
        if (unansweredQuestions.length > 0) {
            errors.push(`Please answer all additional questions (${unansweredQuestions.length} remaining)`);
        }
        
        return errors;
    };

    // Survey Modal Functions
    const openSurveyModal = () => {
        setShowSurveyModal(true);
        setValidationErrors([]);
        setShowValidationError(false);
        // Reset responses
        setSurveyResponses({
            usage: '',
            satisfaction: '',
            experience: '',
            recommendation: '',
            interaction: '',
            questions: ['', '', '', '', '']
        });
    };

    const closeSurveyModal = () => {
        setShowSurveyModal(false);
        setValidationErrors([]);
        setShowValidationError(false);
    };

    const handleResponseChange = (field: keyof SurveyResponses, value: string | number) => {
        setSurveyResponses(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear validation errors when user starts filling
        if (validationErrors.length > 0) {
            setValidationErrors([]);
            setShowValidationError(false);
        }
    };

    const handleQuestionResponse = (questionIndex: number, value: string | number) => {
        setSurveyResponses(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => i === questionIndex ? value : q)
        }));
        
        // Clear validation errors when user starts filling
        if (validationErrors.length > 0) {
            setValidationErrors([]);
            setShowValidationError(false);
        }
    };

    const submitSurvey = () => {
        const errors = validateSurveyResponses();
        
        if (errors.length > 0) {
            setValidationErrors(errors);
            setShowValidationError(true);
            // Scroll to top of modal to show error
            const modalElement = document.querySelector('.survey-modal-content');
            if (modalElement) {
                modalElement.scrollTop = 0;
            }
            return;
        }
        
        // Handle survey submission
        console.log('Survey submitted:', surveyResponses);
        closeSurveyModal();
        setShowSuccessPopup(true);
    };

    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    const takeAnotherSurvey = () => {
        setShowSuccessPopup(false);
        openSurveyModal();
    };

    const SurveyCard = ({ survey, isOngoing = false }: SurveyCardProps) => (
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isOngoing
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                        >
                            {isOngoing ? "Ongoing" : "Closed"}
                        </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        {survey.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{survey.description}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{survey.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{survey.responses} responses</span>
                    </div>
                </div>

                {isOngoing && (
                    <button 
                        onClick={openSurveyModal}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 self-start sm:self-auto"
                    >
                        Take Survey
                    </button>
                )}
            </div>
        </div>
    );

    // Success Popup Component
    const SuccessPopup = () => {
        if (!showSuccessPopup) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 backdrop-blur-md bg-black/20"></div>
                
                <div className="relative bg-white rounded-2xl max-w-sm sm:max-w-md w-full shadow-2xl">
                    <div className="p-6 sm:p-8 text-center">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                            Thanks for Sharing Your Insights!
                        </h2>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                            Your feedback has been received. Teams and You're helping improve access to better farming tools across Africa!
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={takeAnotherSurvey}
                                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
                            >
                                Take Another Survey
                            </button>
                            <button
                                onClick={closeSuccessPopup}
                                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-full font-medium transition-colors duration-200"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // One-page Survey Modal Component
    const SurveyModal = () => {
        if (!showSurveyModal) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Blurred background overlay */}
                <div className="absolute inset-0 backdrop-blur-md bg-white/30"></div>
                
                <div className="relative bg-white rounded-2xl max-w-sm sm:max-w-2xl lg:max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl survey-modal-content">
                    <div className="p-4 sm:p-6 lg:p-8">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6 sm:mb-8">
                            <div className="flex-1 pr-4">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Customer Satisfaction Survey</h2>
                                <p className="text-sm sm:text-base text-gray-600">Your feedback is valuable and will help us shape future products and experiences. This survey will take approximately 4 minutes to complete.</p>
                                <p className="text-xs sm:text-sm text-red-600 mt-2 font-medium">* All fields are required</p>
                            </div>
                            <button
                                onClick={closeSurveyModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* Validation Error Alert */}
                        {showValidationError && validationErrors.length > 0 && (
                            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-medium text-red-800 mb-2">
                                            Please complete all required fields:
                                        </h3>
                                        <ul className="text-xs sm:text-sm text-red-700 space-y-1">
                                            {validationErrors.map((error, index) => (
                                                <li key={index} className="flex items-start gap-1">
                                                    <span className="text-red-600">•</span>
                                                    <span>{error}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* All Questions in One Page */}
                        <div className="space-y-8 sm:space-y-10">
                            {/* Question 1 */}
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                                        How often do you use our product/service? <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        {['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleResponseChange('usage', option)}
                                                className={`px-3 sm:px-4 py-2 rounded-full border transition-colors text-sm ${
                                                    surveyResponses.usage === option
                                                        ? 'bg-green-600 text-white border-green-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                                }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                                        How satisfied are you with our product? <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
                                        {[
                                            { emoji: '😭', label: 'Very Dissatisfied' },
                                            { emoji: '😟', label: 'Dissatisfied' },
                                            { emoji: '😐', label: 'Neutral' },
                                            { emoji: '😊', label: 'Satisfied' },
                                            { emoji: '😍', label: 'Very Satisfied' }
                                        ].map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleResponseChange('satisfaction', option.label)}
                                                className={`flex flex-col items-center p-2 sm:p-3 rounded-lg border transition-colors ${
                                                    surveyResponses.satisfaction === option.label
                                                        ? 'bg-green-50 border-green-400'
                                                        : 'bg-white border-gray-200 hover:border-green-300'
                                                }`}
                                            >
                                                <span className="text-xl sm:text-2xl mb-1">{option.emoji}</span>
                                                <span className="text-xs text-gray-600 text-center">{option.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Question 2 */}
                            <div className="space-y-4 sm:space-y-6 border-t pt-6 sm:pt-8">
                                <div>
                                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                                        How would you rate your experience with our product? <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="flex justify-center gap-1 sm:gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => handleResponseChange('experience', star)}
                                                className="p-1"
                                            >
                                                <Star
                                                    className={`w-6 h-6 sm:w-8 sm:h-8 ${
                                                        star <= Number(surveyResponses.experience || 0)
                                                            ? 'text-yellow-400 fill-current'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                                        On the scale of 1-10, how likely would you recommend our product to others? <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => handleResponseChange('recommendation', num)}
                                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border transition-colors text-sm ${
                                                    Number(surveyResponses.recommendation) === num
                                                        ? 'bg-green-600 text-white border-green-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                                }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Question 3 */}
                            <div className="space-y-4 sm:space-y-6 border-t pt-6 sm:pt-8">
                                <div>
                                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                                        Based on your experience, how easy or difficult was it to interact with our company? <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="flex justify-center gap-1 sm:gap-2 flex-wrap">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => handleResponseChange('interaction', num)}
                                                className={`px-3 sm:px-4 py-2 rounded-full border transition-colors text-sm ${
                                                    Number(surveyResponses.interaction) === num
                                                        ? 'bg-green-600 text-white border-green-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                                }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-2">
                                        <span>Very difficult</span>
                                        <span>Very easy</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                                        Additional Questions <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="space-y-3 sm:space-y-4">
                                        {['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'].map((question, index) => (
                                            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                                                <span className="font-medium text-sm sm:text-base">{question}</span>
                                                <div className="flex gap-1 sm:gap-2 justify-center sm:justify-end">
                                                    {[1, 2, 3, 4, 5].map((rating) => (
                                                        <button
                                                            key={rating}
                                                            onClick={() => handleQuestionResponse(index, rating)}
                                                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border text-xs sm:text-sm transition-colors ${
                                                                Number(surveyResponses.questions[index]) === rating
                                                                    ? 'bg-green-600 text-white border-green-600'
                                                                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                                            }`}
                                                        >
                                                            {rating}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                                            <span>Strongly Disagree</span>
                                            <span>Strongly Agree</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 mt-8 sm:mt-10 pt-4 sm:pt-6 border-t">
                            <button
                                onClick={closeSurveyModal}
                                className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-2 rounded-full font-medium transition-colors order-2 sm:order-1"
                            >
                                Save Draft
                            </button>
                            <button
                                onClick={submitSurvey}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors order-1 sm:order-2"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* <div className="fixed inset-0 bg-black/40" /> */}

           

            {/* Survey Modal */}
            <SurveyModal />

            {/* Success Popup */}
            <SuccessPopup />

            {/* Main Content */}
<main className={`relative z-10 ${showSurveyModal || showSuccessPopup ? 'blur-sm' : ''} pt-0`}>
                {/* Hero Section */}
                <section className="bg-gray-50 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 lg:pb-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Your Voice Shapes the<br />
                            <span className="text-green-600">Future of Agroecology</span>
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                            Take part in quick surveys to share your thoughts, improve our resources, and
                            strengthen our network.
                        </p>
                        
                        {/* Filter Tags and Search */}
                        
<div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-6 sm:mb-8 px-4">
    {/* Filter buttons in a container with border */}
    <div className="flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm w-full max-w-xs sm:max-w-none sm:w-auto">
        <button 
            onClick={() => setCurrentFilter("all")}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm transition ml-1 flex-1 sm:flex-none ${
                currentFilter === "all" 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
            All
        </button>
        <button 
            onClick={() => setCurrentFilter("ongoing")}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm transition ml-1 flex-1 sm:flex-none ${
                currentFilter === "ongoing" 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
            Ongoing
        </button>
        <button 
            onClick={() => setCurrentFilter("closed")}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm transition ml-1 flex-1 sm:flex-none ${
                currentFilter === "closed" 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
            Completed
        </button>
    </div>
    
    {/* Search input with filter icon container */}
    <div className="flex items-center gap-2 w-full max-w-sm lg:max-w-none lg:w-auto">
        {/* Search input */}
        <div className="relative flex-grow lg:w-64">
            <input
                type="text"
                placeholder="Search surveys..."
                value={heroSearchQuery}
                onChange={(e) => setHeroSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
        
        {/* Filter icon */}
        <button className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
        </button>
    </div>
</div>

                        {/* Search Results Info */}
                        {heroSearchQuery && (
                            <div className="mb-4 text-sm text-gray-600">
                                Showing {getFilteredSurveys().length} results for "{heroSearchQuery}"
                            </div>
                        )}
                    </div>
                </section>

                {/* Filtered Surveys Section */}
                <section className="bg-white py-8 sm:py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
                            {currentFilter === "all" ? "All Surveys" : 
                             currentFilter === "ongoing" ? "Ongoing Surveys" : "Completed Surveys"}
                        </h2>
                        
                        {getFilteredSurveys().length === 0 ? (
                            <div className="text-center py-8 sm:py-12">
                                <div className="text-gray-400 mb-4">
                                    <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No surveys found</h3>
                                <p className="text-sm sm:text-base text-gray-600 px-4">
                                    {heroSearchQuery 
                                        ? `No surveys match your search "${heroSearchQuery}"`
                                        : `No ${currentFilter} surveys available at the moment`
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {getFilteredSurveys().map((survey) => (
                                    <SurveyCard key={survey.id} survey={survey} isOngoing={survey.status === 'ongoing'} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-white py-8 sm:py-12 lg:py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-green-600 px-6 sm:px-8 py-8 sm:py-12 text-center rounded-xl">
                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Your Story Could Inspire Thousands</h2>
                            <p className="text-sm sm:text-base text-white mb-4 sm:mb-6 max-w-2xl mx-auto">
                                Have you started your agroecology journey? Share your experience and become part
                                of a growing movement across Africa.
                            </p>
                            <button className="bg-white text-green-600 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-gray-100 transition text-sm sm:text-base">
                                Share your Story
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            
      
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
      <div key={index} className="flex items-center gap-2 text-[#FDFBF6] text-xs sm:text-sm leading-[22px]">
        <span className="text-[#FDFBF6] filter brightness-0 invert">{item.icon}</span>
        <span>{item.text}</span>
      </div>
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
}