import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/profilelogo.png";
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitterSquare,
  FaInstagram,
  FaHome,
  FaUser,
  FaCode,
  FaBriefcase,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down, hide navbar
        setShowNavbar(false);
      } else {
        // Scrolling up, show navbar
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const socialIconVariants = {
    hover: { scale: 1.2, transition: { type: "spring", stiffness: 300 } },
  };

  const navItems = [
    { name: "Home", link: "#hero", icon: <FaHome /> },
    { name: "About", link: "#about", icon: <FaUser /> },
    { name: "Skills", link: "#skills", icon: <FaCode /> },
    { name: "Projects", link: "#projects", icon: <FaProjectDiagram /> },
    { name: "Experience", link: "#experience", icon: <FaBriefcase /> },
    { name: "Contact", link: "#contact", icon: <FaEnvelope /> },
  ];

  return (
    <>
      {/* Top Header */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-screen-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between bg-black/20 backdrop-blur-md rounded-full px-6 py-3">
            {/* Logo Section */}
            <div>
              <img className="w-10" src={logo} alt="Logo" />
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-6 text-white text-xl">
              {[
                {
                  Icon: FaLinkedinIn,
                  link: "https://www.linkedin.com/in/pratik-r1104/",
                },
                { Icon: FaGithub, link: "https://github.com/prateekraiger" },
                { Icon: FaTwitterSquare, link: "https://x.com/mrpratik753" },
                { Icon: FaInstagram, link: "https://instagram.com" },
              ].map(({ Icon, link }) => (
                <motion.a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover="hover"
                  variants={socialIconVariants}
                  className="hover:text-cyan-400 transition duration-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="flex items-center justify-center bg-black/30 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
              <div className="flex items-center gap-6 text-white">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    className="flex flex-col items-center justify-center hover:text-cyan-400 transition duration-300 group"
                    title={item.name}
                  >
                    {React.cloneElement(item.icon, {
                      className:
                        "h-5 w-5 mb-1 group-hover:scale-110 transition",
                    })}
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
