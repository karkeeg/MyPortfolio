const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white dark:bg-gray-900 bg-opacity-80 backdrop-blur-md z-50 flex justify-between items-center px-8 py-4 shadow-md">
      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
        Bibek's Portfolio
      </div>
      <div className="flex gap-6">
        <a href="#home" className="hover:text-purple-600 dark:text-white">
          Home
        </a>
        <a href="#about" className="hover:text-purple-600 dark:text-white">
          About
        </a>
        <a href="#projects" className="hover:text-purple-600 dark:text-white">
          Projects
        </a>
        <a href="#contact" className="hover:text-purple-600 dark:text-white">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
