"use client"

import * as motion from 'motion/react-client'
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const [isScrolling, setIsScrolling] = useState(false)
    const { theme, toggleTheme } = useTheme()

    const updateActiveSection = useCallback(() => {
        const sections = ['home', 'experience', 'projects', 'contact']
        const scrollPosition = window.scrollY + 150 // Increased offset for better tracking

        for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
                const offset = element.offsetTop - 150 // Match with scrollPosition
                const height = element.offsetHeight

                if (scrollPosition >= offset && scrollPosition < offset + height) {
                    setActiveSection(section)
                    break
                }
            }
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY
            if (offset > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }

            if (!isScrolling) {
                updateActiveSection()
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [isScrolling, updateActiveSection])

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            setIsScrolling(true)
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            // Smoother scroll animation
            const startPosition = window.pageYOffset
            const distance = offsetPosition - startPosition
            const duration = 600 // Reduced duration
            let start: number | null = null

            const animation = (currentTime: number) => {
                if (start === null) start = currentTime
                const timeElapsed = currentTime - start
                const progress = Math.min(timeElapsed / duration, 1)

                // Smoother easing function
                const easeProgress = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2

                window.scrollTo(0, startPosition + (distance * easeProgress))

                if (progress < 1) {
                    requestAnimationFrame(animation)
                } else {
                    setIsScrolling(false)
                    setActiveSection(sectionId)
                }
            }

            requestAnimationFrame(animation)
        }
        setIsOpen(false)
    }

    const menuVariants = {
    closed: {
            opacity: 0,
            x: "100%",
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.05,
                delayChildren: 0.05
            }
        }
    }

const itemVariants = {
        closed: { x: 20, opacity: 0 },
    open: {
            x: 0, 
        opacity: 1,
        transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }
    }

    const navItems = [
        { name: "Home", href: "home" },
        { name: "Experience", href: "experience" },
        { name: "Projects", href: "projects" },
        { name: "Contact", href: "contact" },
    ]

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.5
            }}
            className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled 
                    ? theme === 'dark' 
                        ? "bg-black/80 backdrop-blur-md" 
                        : "bg-[#FAF9F6]/80 backdrop-blur-md"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo/Name */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-shrink-0"
                    >
                        <Link href="/" className={`text-xl sm:text-2xl font-bold transition-colors ${
                            theme === 'dark' 
                                ? "text-white hover:text-gray-300" 
                                : "text-black hover:text-gray-700"
                        }`}>
                            Bishwash
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <div className="flex items-center space-x-6 lg:space-x-8">
                            {navItems.map((item) => (
                                <motion.div
                                    key={item.name}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <button
                                        onClick={() => scrollToSection(item.href)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group ${
                                            theme === 'dark'
                                                ? "text-white hover:text-gray-300"
                                                : "text-black hover:text-gray-700"
                                        } ${activeSection === item.href ? 'font-bold' : ''}`}
                                    >
                                        {item.name}
                                        <motion.span
                                            className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ${
                                                theme === 'dark' ? "bg-white" : "bg-black"
                                            } ${activeSection === item.href ? 'w-full' : ''} group-hover:w-full`}
                                            initial={{ width: "0%" }}
                                            whileHover={{ width: "100%" }}
                                        />
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        {/* Theme Toggle Button - Desktop */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className={`p-2 rounded-full focus:outline-none transition-colors ${
                                theme === 'dark'
                                    ? "text-white hover:text-gray-300"
                                    : "text-black hover:text-gray-700"
                            }`}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </motion.button>
                    </div>

                    {/* Mobile menu button and theme toggle */}
                    <div className="md:hidden flex items-center space-x-4">
                        {/* Theme Toggle Button - Mobile */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className={`p-2 rounded-full focus:outline-none transition-colors ${
                                theme === 'dark'
                                    ? "text-white hover:text-gray-300"
                                    : "text-black hover:text-gray-700"
                            }`}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </motion.button>

                        {/* Mobile menu button */}
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors ${
                                    theme === 'dark'
                                        ? "text-white hover:text-gray-300"
                                        : "text-black hover:text-gray-700"
                                }`}
                            >
                                <span className="sr-only">Open main menu</span>
                                <motion.div
                                    initial={false}
                                    animate={isOpen ? "open" : "closed"}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isOpen ? (
                                        <X className="w-6 h-6" />
                                    ) : (
                                        <Menu className="w-6 h-6" />
                                    )}
                                </motion.div>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
                className={`md:hidden absolute w-full backdrop-blur-md ${
                    theme === 'dark'
                        ? "bg-black/95"
                        : "bg-[#FAF9F6]/95"
                }`}
            >
                <div className="px-4 py-2 space-y-1">
                    {navItems.map((item) => (
                        <motion.div
                            key={item.name}
                            variants={itemVariants}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                onClick={() => scrollToSection(item.href)}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                    theme === 'dark'
                                        ? "text-white hover:text-gray-300"
                                        : "text-black hover:text-gray-700"
                                } ${activeSection === item.href ? 'font-bold' : ''}`}
                            >
                                {item.name}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.nav>
    )
}

export default NavBar
