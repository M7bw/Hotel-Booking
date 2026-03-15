import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import searchIcon from '../assets/searchIcon.svg';
import menuIcon from '../assets/menuIcon.svg';
import closeIcon from '../assets/closeIcon.svg';
import { useClerk, UserButton } from '@clerk/clerk-react';
import { useAppContext } from '../conext/AppContext';

const BookIcon = () => (
    <svg
        className="w-4 h-4 text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
        />
    </svg>
);

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experiences', path: '/experiences' },
        { name: 'About', path: '/about' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { openSignIn } = useClerk();
    const location = useLocation();

    const { user, navigate, isOwner, isAdmin, setShowHotelReg } = useAppContext();

    useEffect(() => {
        if (location.pathname !== '/') {
            setIsScrolled(true);
            return;
        } else {
            setIsScrolled(false);
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const handleDashboardClick = () => {

        if (isAdmin) {
            navigate("/admin");
            return;
        }

        if (isOwner) {
            navigate("/owner");
            return;
        }

        setShowHotelReg(true);

    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between
            px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500
            ${isScrolled
                    ? 'bg-white/200 shadow-md backdrop-blur-lg py-0.5 text-gray-700'
                    : 'py-2 text-white'
                }`}
        >
            <Link to="/" className=" -ml-6 md:-ml-16 lg:-ml-24 xl:-ml-10">
                <img
                    src={logo}
                    alt="Logo"
                    className={`h-20 ${isScrolled ? 'invert opacity-80' : ''}`}
                />
            </Link>

            <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        className={`group flex flex-col gap-0.5 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                    >
                        {link.name}
                        <div
                            className={`${isScrolled ? 'bg-gray-700' : 'bg-white'} h-0.5 w-0 group-hover:w-full transition-all duration-300`}
                        />
                    </Link>
                ))}

                {user && (
                    <button
                        className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}
                        onClick={handleDashboardClick}
                    >
                        {isAdmin ? 'Admin Dashboard' : isOwner ? 'Dashboard' : 'List Your Hotel'}
                    </button>
                )}
            </div>

            <div className="hidden md:flex items-center gap-4">
                <img
                    src={searchIcon}
                    alt="search"
                    className={`${isScrolled ? 'invert' : ''} h-7 transition-all duration-500`}
                />

                {user ? (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label="My Bookings"
                                labelIcon={<BookIcon />}
                                onClick={() => navigate('/my-bookings')}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                ) : (
                    <button
                        onClick={openSignIn}
                        className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500"
                    >
                        Login
                    </button>
                )}
            </div>

            <div className="flex items-center gap-3 md:hidden">
                {user && (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label="My Bookings"
                                labelIcon={<BookIcon />}
                                onClick={() => navigate('/my-bookings')}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                )}

                <img
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    src={menuIcon}
                    alt="menu"
                    className={`${isScrolled ? 'invert' : ''} h-4`}
                />
            </div>

            <div
                className={`fixed top-0 left-0 w-full h-screen bg-white
                text-base flex flex-col md:hidden items-center justify-center gap-6
                font-medium text-gray-800 transition-all duration-500
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <button
                    className="absolute top-4 right-4"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <img src={closeIcon} alt="close-menu" className="h-6.5" />
                </button>

                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {link.name}
                    </Link>
                ))}

                {user && (
                    <button
                        className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
                        onClick={() => {
                            handleDashboardClick();
                            setIsMenuOpen(false);
                        }}
                    >
                        {isAdmin ? 'Admin Dashboard' : isOwner ? 'Dashboard' : 'List Your Hotel'}
                    </button>
                )}

                {!user && (
                    <button
                        onClick={openSignIn}
                        className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;