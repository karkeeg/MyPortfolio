import { useState } from "react";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGithub,
  FaNodeJs,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiRedux,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiFramer,
  SiStripe,
} from "react-icons/si";

const circlePath =
  "M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831";

const skillsByCategory = {
  Frontend: [
    { icon: FaReact, title: "React", level: 90 },
    { icon: SiTailwindcss, title: "TailwindCSS", level: 85 },
    { icon: SiRedux, title: "Redux", level: 80 },
    { icon: FaJs, title: "JavaScript", level: 88 },
    { icon: SiTypescript, title: "TypeScript", level: 80 },
    { icon: FaHtml5, title: "HTML5", level: 95 },
    { icon: FaCss3Alt, title: "CSS3", level: 90 },
  ],
  Backend: [
    { icon: FaNodeJs, title: "Node.js", level: 85 },
    { icon: SiExpress, title: "Express.js", level: 80 },
    { icon: SiMongodb, title: "MongoDB", level: 82 },
    { icon: SiPostman, title: "Postman", level: 78 },
  ],
  Tools: [
    { icon: FaGithub, title: "GitHub", level: 85 },
    { icon: FaGitAlt, title: "Git", level: 85 },
    { icon: SiFramer, title: "Framer Motion", level: 80 },
    { icon: SiStripe, title: "Stripe API", level: 75 },
    { icon: null, title: "JWT Auth", level: 80, textIcon: "JWT" },
  ],
};

const SkillCard = ({ icon: Icon, title, level, textIcon }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
    <div className="relative w-28 h-28 mb-6">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="text-gray-300 dark:text-gray-700"
          stroke="currentColor"
          strokeWidth="3.8"
          fill="none"
          d={circlePath}
        />
        <path
          className="text-purple-600 dark:text-purple-400"
          stroke="currentColor"
          strokeWidth="3.8"
          strokeDasharray={`${level}, 100`}
          strokeLinecap="round"
          fill="none"
          d={circlePath}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-4xl text-purple-600 dark:text-purple-400 font-bold">
        {Icon ? <Icon /> : textIcon}
      </div>
    </div>
    <h4 className="font-semibold text-xl text-gray-800 dark:text-gray-200">{title}</h4>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{level}% Proficient</p>
  </div>
);

const Skills = () => {
  const categories = Object.keys(skillsByCategory);
  const [current, setCurrent] = useState(0);

  return (
    <section id="skills" className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-4">My Skills</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Mastery in technologies I use</p>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-5 mb-12 px-6">
        {categories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => setCurrent(i)}
            className={`px-6 py-2 rounded-full font-semibold min-w-[110px] text-center transition
              ${
                i === current
                  ? "bg-purple-700 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-600 hover:text-white"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {skillsByCategory[categories[current]].map((skill, i) => (
          <SkillCard key={i} {...skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
