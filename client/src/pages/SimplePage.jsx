import React from "react";
import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/assets";

const SimplePage = () => {
    const { page } = useParams();

    const pageContent = {
        about: {
            title: "About M7B Hotels",
            image: assets.heroImage,
            intro:
                "M7B Hotels is a modern hotel booking platform designed to help travelers discover exceptional stays with ease, comfort, and confidence.",
            description:
                "Our platform connects guests with a carefully selected range of properties, from elegant boutique hotels to luxury resorts and family-friendly accommodations. We focus on simple booking, trusted listings, and a seamless travel experience for every user.",
            sectionTitle: "Why Travelers Choose Us",
            points: [
                "Easy hotel search and booking experience.",
                "Carefully selected destinations and properties.",
                "Clear pricing and booking details.",
                "Modern interface for guests and hotel owners.",
            ],
        },

        experiences: {
            title: "Experiences",
            image: assets.heroImage,
            intro:
                "Travel is more than a room. It is the feeling, the memories, and the moments you collect along the way.",
            description:
                "At M7B Hotels, we aim to make every stay special by helping travelers find destinations and hotels that match their lifestyle. Whether you are planning a relaxing holiday, a romantic weekend, or a family trip, our platform helps you discover memorable hotel experiences.",
            sectionTitle: "What We Offer",
            points: [
                "Luxury and comfort in top destinations.",
                "Exclusive offers and handpicked hotel choices.",
                "Smooth search, booking, and payment process.",
                "Recommended hotels based on recent searches.",
            ],
        },

        careers: {
            title: "Careers",
            image: assets.heroImage,
            intro:
                "We are building a better travel platform and we are always looking for passionate people to grow with us.",
            description:
                "M7B Hotels welcomes creative thinkers, developers, designers, and hospitality-focused professionals who want to contribute to meaningful digital products. We believe in teamwork, innovation, and building solutions that improve the way people travel.",
            sectionTitle: "Join Our Team",
            points: [
                "Work on real travel and booking solutions.",
                "Collaborate with a creative and ambitious team.",
                "Grow your technical and professional skills.",
                "Contribute to products used by real travelers.",
            ],
        },

        press: {
            title: "Press & Media",
            image: assets.heroImage,
            intro:
                "Stay updated with the latest news, product updates, and public announcements from M7B Hotels.",
            description:
                "Our press page highlights platform developments, partnerships, feature launches, and milestones that reflect our growth in the hotel booking industry.",
            sectionTitle: "Media Highlights",
            points: [
                "Product and platform updates.",
                "Travel and hospitality news.",
                "Company announcements and milestones.",
                "Partnership and collaboration highlights.",
            ],
        },

        blog: {
            title: "Travel Blog",
            image: assets.heroImage,
            intro:
                "Discover travel inspiration, hotel tips, and destination ideas through our blog.",
            description:
                "Our blog is designed for travelers who want more than a booking. We share useful articles about travel planning, hotel selection, destination inspiration, and how to make the most of every stay.",
            sectionTitle: "Featured Topics",
            points: [
                "Travel tips for smart booking.",
                "Best destinations for every season.",
                "Luxury stay inspiration.",
                "Hotel recommendations and guides.",
            ],
        },

        partners: {
            title: "Partners",
            image: assets.heroImage,
            intro:
                "We believe in strong partnerships that create better travel experiences for everyone.",
            description:
                "M7B Hotels works with hotels, hospitality brands, and tourism organizations to deliver high-quality stays and reliable booking options for our users.",
            sectionTitle: "Our Partnership Goals",
            points: [
                "Expand trusted hotel listings.",
                "Improve guest experience through collaboration.",
                "Support hotel owners with modern tools.",
                "Create long-term value in hospitality.",
            ],
        },

        "help-center": {
            title: "Help Center",
            image: assets.heroImage,
            intro:
                "Need support? Our help center is here to guide you through common questions and booking issues.",
            description:
                "Whether you need help finding a room, understanding payment, or checking your booking details, our support resources are designed to make your experience simple and stress-free.",
            sectionTitle: "Common Help Topics",
            points: [
                "How to search and book a room.",
                "How to pay for your booking.",
                "How to view your booking history.",
                "How hotel owner registration works.",
            ],
        },

        "safety-information": {
            title: "Safety Information",
            image: assets.heroImage,
            intro:
                "Your safety and trust matter to us at every stage of your travel experience.",
            description:
                "M7B Hotels encourages transparent listings, reliable booking information, and secure account access. We continuously aim to support safe digital experiences for all users.",
            sectionTitle: "Safety Priorities",
            points: [
                "Clear booking information.",
                "Secure user authentication.",
                "Reliable platform access.",
                "Transparent communication with users.",
            ],
        },

        "cancellation-options": {
            title: "Cancellation Options",
            image: assets.heroImage,
            intro:
                "Flexible travel planning starts with knowing your cancellation options.",
            description:
                "Cancellation terms may vary depending on the hotel and booking conditions. Always review your reservation details carefully before confirming payment or finalizing your stay.",
            sectionTitle: "Before You Cancel",
            points: [
                "Check your booking details first.",
                "Review hotel-specific cancellation rules.",
                "Contact support if you need help.",
                "Confirm refund eligibility when applicable.",
            ],
        },

        "contact-us": {
            title: "Contact Us",
            image: assets.heroImage,
            intro:
                "We are here to help with bookings, account questions, and general support.",
            description:
                "If you need assistance, feel free to contact our support team. We aim to respond quickly and provide clear guidance for all platform-related questions.",
            sectionTitle: "Support Information",
            points: [
                "Email: support@m7bhotels.com",
                "Phone: +49 157 0000 1234",
                "Office: Berlin, Germany",
                "Working Hours: Monday - Friday, 9:00 AM - 6:00 PM",
            ],
        },

        accessibility: {
            title: "Accessibility",
            image: assets.heroImage,
            intro:
                "We are committed to making M7B Hotels easy to use for everyone.",
            description:
                "Accessibility is an important part of our platform design. We continue improving navigation, readability, and usability so that all users can enjoy a better booking experience.",
            sectionTitle: "Accessibility Focus",
            points: [
                "Simple and clear navigation.",
                "Readable layouts and content structure.",
                "Continuous user experience improvements.",
                "Inclusive digital design approach.",
            ],
        },

        privacy: {
            title: "Privacy Policy",
            image: assets.heroImage,
            intro:
                "Your privacy is important to us, and we are committed to protecting your personal information.",
            description:
                "We collect only the information needed to provide booking, account, and support services. Our goal is to handle your data responsibly and transparently.",
            sectionTitle: "Privacy Principles",
            points: [
                "We protect user account information.",
                "We use data only for platform functionality.",
                "We value transparency and trust.",
                "We work to keep personal information secure.",
            ],
        },

        terms: {
            title: "Terms & Conditions",
            image: assets.heroImage,
            intro:
                "These terms describe the rules and responsibilities involved in using M7B Hotels.",
            description:
                "By using our platform, you agree to follow our booking rules, payment conditions, and account policies. We encourage all users to review these terms carefully.",
            sectionTitle: "Important Terms",
            points: [
                "Users must provide accurate information.",
                "Bookings are subject to hotel availability.",
                "Payment and cancellation terms may vary.",
                "Users are responsible for account activity.",
            ],
        },

        sitemap: {
            title: "Sitemap",
            image: assets.heroImage,
            intro:
                "Explore the structure of our website and find the pages that matter most to you.",
            description:
                "Our sitemap helps users quickly navigate through the main sections of M7B Hotels, including hotel listings, bookings, help pages, and account-related features.",
            sectionTitle: "Main Website Sections",
            points: [
                "Home",
                "Hotels",
                "Room Details",
                "My Bookings",
            ],
        },
    };

    const currentPage = pageContent[page] || {
        title: "Page",
        image: assets.heroImage,
        intro: "Content coming soon.",
        description: "This page is under preparation.",
        sectionTitle: "Details",
        points: ["More information will be added soon."],
    };

    return (
        <div className="min-h-screen bg-white">
            <div
                className="w-full h-[420px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white text-center"
                style={{ backgroundImage: `url(${currentPage.image})` }}
            >
                <div className="w-full h-full bg-black/45 flex flex-col items-center justify-center px-6">
                    <h1 className="text-4xl md:text-6xl font-bold">
                        {currentPage.title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm md:text-lg">
                        {currentPage.intro}
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                        Welcome to {currentPage.title}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg leading-8 max-w-3xl mx-auto">
                        {currentPage.description}
                    </p>
                </div>

                <div className="mt-14">
                    <h3 className="text-2xl font-semibold mb-6 text-center">
                        {currentPage.sectionTitle}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentPage.points.map((point, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-xl p-6 shadow-sm bg-gray-50"
                            >
                                <p className="text-gray-700">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-12">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-black text-white rounded-lg"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SimplePage;