"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef } from "react";
import { Clock, MessageSquare, X, Star, CheckCircle, AlertCircle } from "lucide-react";

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

export default function SurveysPage() {
    const [currentPage, setCurrentPage] = useState('surveys');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
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

    // Survey Modal Functions
    const openSurveyModal = () => {
        setShowSurveyModal(true);
        setValidationErrors([]);
        setShowValidationError(false);
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
        
        if (validationErrors.length > 0) {
            setValidationErrors([]);
            setShowValidationError(false);
        }
    };

    const submitSurvey = () => {
        const errors: string[] = [];
        
        if (!surveyResponses.usage) errors.push("Please select how often you use our product/service");
        if (!surveyResponses.satisfaction) errors.push("Please rate your satisfaction with our product");
        if (!surveyResponses.experience) errors.push("Please rate your experience with our product");
        if (!surveyResponses.recommendation) errors.push("Please rate how likely you would recommend our product");
        if (!surveyResponses.interaction) errors.push("Please rate how easy it was to interact with our company");
        
        const unansweredQuestions = surveyResponses.questions.filter((q, index) => !q);
        if (unansweredQuestions.length > 0) {
            errors.push(`Please answer all additional questions (${unansweredQuestions.length} remaining)`);
        }
        
        if (errors.length > 0) {
            setValidationErrors(errors);
            setShowValidationError(true);
            return;
        }
        
        console.log('Survey submitted:', surveyResponses);
        closeSurveyModal();
        setShowSuccessPopup(true);
    };

    const SurveyCard = ({ survey, isOngoing = false }: SurveyCardProps) => (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isOngoing ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}>
                            {isOngoing ? "Ongoing" : "Closed"}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{survey.title}</h3>
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

    const SurveyModal = () => {
        if (!showSurveyModal) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 backdrop-blur-md bg-white/30"></div>
                
                <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Satisfaction Survey</h2>
                                <p className="text-gray-600">Your feedback is valuable and will help us shape future products and experiences.</p>
                                <p className="text-sm text-red-600 mt-2 font-medium">* All fields are required</p>
                            </div>
                            <button onClick={closeSurveyModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {showValidationError && validationErrors.length > 0 && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-medium text-red-800 mb-2">Please complete all required fields:</h3>
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

                        <div className="space-y-10">
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

                            <div className="space-y-6 border-t pt-8">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        How would you rate your experience? <span className="text-red-500">*</span>
                                    </h3>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => handleResponseChange('experience', star)}
                                                className="p-1"
                                            >
                                                <Star className={`w-8 h-8 ${
                                                    star <= Number(surveyResponses.experience || 0)
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                }`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        How likely would you recommend us (1-10)? <span className="text-red-500">*</span>
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
                        </div>

                        <div className="flex justify-end items-center gap-3 mt-10 pt-6 border-t">
                            <button
                                onClick={closeSurveyModal}
                                className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-2 rounded-full font-medium transition-colors"
                            >
                                Cancel
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

    const SuccessPopup = () => {
        if (!showSuccessPopup) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 backdrop-blur-md bg-black/20"></div>
                
                <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl">
                    <div className="p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Thanks for Your Feedback!
                        </h2>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Your feedback has been received. You're helping improve access to better farming tools across Africa!
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => {setShowSuccessPopup(false); openSurveyModal();}}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
                            >
                                Take Another Survey
                            </button>
                            <button
                                onClick={() => setShowSuccessPopup(false)}
                                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-full font-medium transition-colors duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#fdfbf6] text-gray-800">
            <SurveyModal />
            <SuccessPopup />

            <main className={`relative z-10 ${showSurveyModal || showSuccessPopup ? 'blur-sm' : ''}`}>
                <section className="bg-gray-50 py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Your Voice Shapes the<br />
                            <span className="text-green-600">Future of Agroecology</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Take part in quick surveys to share your thoughts, improve our resources, and strengthen our network.
                        </p>
                        
                        <div className="flex items-center justify-center gap-4 mb-8">
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
                        </div>

                        {heroSearchQuery && (
                            <div className="mb-4 text-sm text-gray-600">
                                Showing {getFilteredSurveys().length} results for "{heroSearchQuery}"
                            </div>
                        )}
                    </div>
                </section>

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

                <section className="bg-white py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-green-600 px-8 py-12 text-center rounded-xl">
                            <h2 className="text-2xl font-bold mb-4 text-white">Your Story Could Inspire Thousands</h2>
                            <p className="text-white mb-6">
                                Have you started your agroecology journey? Share your experience and become part of a growing movement across Africa.
                            </p>
                            <button className="bg-white text-green-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition">
                                Share your Story
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}