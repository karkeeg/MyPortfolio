import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import background from "../assets/codeImage.png";
import bibek from '../assets/image.png'


const Hero = () => {
  return (
    <section
      id="home"
      className="h-screen bg-cover bg-center relative flex items-center justify-center overflow-hidden px-6"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60 dark:to-transparent backdrop-blur-sm"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col-reverse md:flex-row items-center gap-12"
      >
        {/* Left Side: Text */}
        <div className="text-center md:text-left max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-700 dark:text-purple-400 mb-4">
            Hi, I'm Bibek Karki
          </h1>

          {/* Typing Effect */}
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 h-8">
            <Typewriter
              words={[
                "Frontend Developer",
                "React Enthusiast",
                "Creative Coder",
                "UI/UX Lover",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>

          {/* Subheading */}
          <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 mb-8">
            I build beautiful and functional websites with a focus on performance
            and seamless user experience. Let's bring ideas to life with code and
            creativity!
          </p>

          {/* CTA Button */}
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition"
          >
            Let's Connect
          </motion.a>

          {/* Social Icons */}
          <div className="flex gap-8 mt-8 md:justify-start justify-center">
            <a
              href="https://github.com/karkeeg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-4xl transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/bibek-karki-b41703272/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-4xl transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right Side: Profile Photo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 blur-lg opacity-50 group-hover:opacity-80 transition duration-500"></div>

          {/* Photo */}
          <img
            src={bibek}// <-- Your image path
            alt="Bibek Karki"
            className="w-48 h-48 md:w-72 md:h-72 rounded-full object-cover border-white dark:border-gray-800 relative z-10 shadow-lg"
          />
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 animate-bounce">
        <div className="w-4 h-8 border-2 border-purple-600 dark:border-purple-400 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-1 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
