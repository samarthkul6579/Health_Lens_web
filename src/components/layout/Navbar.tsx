"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowRight, Home, LayoutGrid, CheckSquare, ShieldCheck, HelpCircle, Info, Sparkles, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../ui/Logo";
import Container from "../common/Container";

const navLinks = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Features", href: "/features", icon: <LayoutGrid size={16} /> },
  { label: "How It Works", href: "/how-it-works", icon: <CheckSquare size={16} /> },
  { label: "AI Analysis", href: "/ai-analysis", icon: <Sparkles size={16} /> },
  { label: "Security", href: "/security", icon: <ShieldCheck size={16} /> },
  { label: "About", href: "/about", icon: <Info size={16} /> },
  { label: "FAQ", href: "/faq", icon: <HelpCircle size={16} /> },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const hamburgerLine = `h-0.5 w-5 my-0.5 rounded-full bg-text-secondary transition-all ease transform duration-300`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/75 backdrop-blur-md border-b border-border-pale/60 shadow-premium"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <Container>
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Logo */}
            <Link href="/" aria-label="HealthLens Home" className="flex-shrink-0">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`relative text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-250 px-3.5 py-2 rounded-full ${
                      isActive ? "text-primary-blue" : "text-text-secondary hover:text-deep-blue"
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {hoveredLink === link.href && (
                      <motion.span
                        layoutId="navHoverBg"
                        className="absolute inset-0 bg-primary-blue/5 rounded-full z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="navActiveIndicator"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-blue rounded-full z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/coming-soon"
                className="text-xs xl:text-sm font-bold text-text-secondary hover:text-deep-blue px-4 py-2 transition-colors duration-250"
              >
                Login
              </Link>
              <Link
                href="/coming-soon"
                className="group flex items-center gap-1.5 bg-primary-blue hover:bg-deep-blue text-white text-xs xl:text-sm font-bold px-5 py-2.5 rounded-full shadow-premium shadow-primary-blue/15 hover:shadow-primary-blue/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-250"
              >
                Get the App
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col h-10 w-10 border border-border-pale/60 bg-white/80 backdrop-blur-sm rounded-xl justify-center items-center group shadow-sm hover:border-primary-blue/30 transition-all duration-200 cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <div
                className={`${hamburgerLine} ${
                  mobileMenuOpen
                    ? "rotate-45 translate-y-1.5 bg-primary-blue"
                    : "group-hover:bg-deep-blue"
                }`}
              />
              <div
                className={`${hamburgerLine} ${
                  mobileMenuOpen ? "opacity-0" : "group-hover:bg-deep-blue"
                }`}
              />
              <div
                className={`${hamburgerLine} ${
                  mobileMenuOpen
                    ? "-rotate-45 -translate-y-1.5 bg-primary-blue"
                    : "group-hover:bg-deep-blue"
                }`}
              />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Backdrop & Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-deep-blue/30 backdrop-blur-md lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%", opacity: 0.95 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed top-0 right-0 z-50 w-full max-w-[300px] h-screen bg-white/95 backdrop-blur-xl border-l border-border-pale/60 shadow-premium-xl p-6 lg:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border-pale/60 mb-6">
                <Logo />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 border border-border-pale/60 bg-white rounded-xl text-text-secondary hover:text-primary-blue hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ x: 15, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.04 * idx, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        className={`text-sm font-bold py-2.5 px-4 rounded-xl flex items-center justify-between transition-all duration-200 ${
                          isActive
                            ? "bg-primary-blue/10 text-primary-blue"
                            : "text-text-secondary hover:bg-bg-pale hover:text-deep-blue"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={isActive ? "text-primary-blue" : "text-text-secondary/80"}>
                            {link.icon}
                          </span>
                          <span>{link.label}</span>
                        </div>
                        <ArrowRight
                          size={12}
                          className={`opacity-50 transition-transform ${
                            isActive ? "text-primary-blue opacity-100 translate-x-0.5" : ""
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer Footer CTA */}
              <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-border-pale/60">
                <Link
                  href="/coming-soon"
                  className="flex items-center justify-center gap-2 font-bold text-xs text-text-secondary py-3.5 border border-border-pale rounded-full hover:bg-bg-pale transition-all duration-200"
                >
                  <LogIn size={14} />
                  Login
                </Link>
                <Link
                  href="/coming-soon"
                  className="flex items-center justify-center gap-1.5 font-bold text-xs bg-primary-blue hover:bg-deep-blue text-white py-3.5 rounded-full shadow-premium shadow-primary-blue/10 hover:shadow-primary-blue/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                >
                  Get early access
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
