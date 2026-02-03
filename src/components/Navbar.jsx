import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md z-50 flex justify-between items-center px-8 py-4 shadow-md">
      <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
        <p>Bibek's Portfolio</p>
      </div>
      <div className="flex gap-6">
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="hover:text-purple-600 cursor-pointer dark:text-white"
        >
          Home
        </Link>
        <Link
          to="skills"
          smooth={true}
          duration={500}
          className="hover:text-purple-600 cursor-pointer dark:text-white"
        >
          Skills
        </Link>
        <Link
          to="about"
          smooth={true}
          duration={500}
          className="hover:text-purple-600 cursor-pointer dark:text-white"
        >
          About
        </Link>
        <Link
          to="projects"
          smooth={true}
          duration={500}
          className="hover:text-purple-600 cursor-pointer dark:text-white"
        >
          Projects
        </Link>
        <Link
          to="contact"
          smooth={true}
          duration={500}
          className="hover:text-purple-600 cursor-pointer dark:text-white"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
