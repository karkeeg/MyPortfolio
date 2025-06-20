import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import airline from "../assets/project/airline.png";
import countries from "../assets/project/countries.png";
import ecommerce from "../assets/project/ecommerce.png";
import todoapp from "../assets/project/myTodo.png";

const projects = [
  {
    title: "Karkee Airlines",
    description:
      "A fully responsive airline booking frontend built with Bootstrap 5. Users can search available flights, fill dynamic booking forms, and experience an interactive, mobile-friendly design. Focused on UI/UX best practices with real-time input validation and modern layout structures.",
    image: airline,
    github: "https://github.com/karkeeg/KarkeeAirlines",
    live: "https://karkeairline.netlify.app/",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap 5"],
  },
  {
    title: "Explore Countries",
    description:
      "ReactJS web app using React Router v7 and REST Countries API. Allows users to explore global countries with search, region filters, and detailed country pages. Includes dynamic routing, API integration, loading states, and error boundaries for robust user experience.",
    image: countries,
    github: "https://github.com/karkeeg/ReactRouting-RR7",
    live: "https://explorewithbibek.vercel.app/",
    technologies: ["React", "React Router", "Axios", "REST API"],
  },
  {
    title: "E-commerce Store",
    description:
      "Simple and efficient ecommerce frontend developed using React Context API and TailwindCSS. Supports product listing, cart management, quantity updates, and responsive layouts for mobile users. Designed for clean architecture and state handling best practices.",
    image: ecommerce,
    github: "https://github.com/karkeeg/E-commercebykarkee",
    live: "https://e-commercebykarkee.vercel.app/",
    technologies: ["React", "Context API", "TailwindCSS"],
  },
  {
    title: "Advanced Todo App",
    description:
      "Feature-rich Todo application with Redux Toolkit for global state management. Includes task categorization, light/dark theme toggle, drag-and-drop sorting (planned), and celebration animations (confetti) upon task completion. Focuses on performance, UX, and scalable project structure.",
    image: todoapp,
    github: "https://github.com/karkeeg/TODO-Application",
    live: "https://karkeetodo.netlify.app/",
    technologies: ["React", "Redux Toolkit", "TailwindCSS", "Confetti JS"],
  },
];

const Projects = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section
      id="projects"
      className="py-10 bg-gradient-to-b from-purple-100 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700"
    >
      <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-800 dark:text-white">
        My Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto px-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-purple-400/30 dark:hover:shadow-purple-300/30 transition-all cursor-pointer border border-white/30 dark:border-gray-600/30 flex flex-col space-y-4"
          >
            <img
              src={project.image}
              alt={project.title}
              className="rounded-xl object-cover h-72 w-full cursor-pointer"
              onClick={() => setOpenIndex(index)}
            />
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-2 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies Used */}
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-200 dark:bg-purple-500/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Github + Live Links */}
            {/* Github + Live Links */}
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-600 dark:hover:bg-purple-400 transition"
              >
                <Github size={20} />
                Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition"
              >
                <ExternalLink size={20} />
                Live
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* Lightbox Component */}
      {openIndex >= 0 && (
        <Lightbox
          open={openIndex >= 0}
          close={() => setOpenIndex(-1)}
          slides={projects.map((project) => ({
            src: project.image,
            alt: project.title,
          }))}
          index={openIndex}
        />
      )}
    </section>
  );
};

export default Projects;
