import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiRedux } from "react-icons/si";

const skills = [
  { icon: <FaReact />, title: "React", level: 90 },
  { icon: <SiTailwindcss />, title: "TailwindCSS", level: 85 },
  { icon: <SiRedux />, title: "Redux", level: 80 },
  { icon: <FaJs />, title: "JavaScript", level: 88 },
  { icon: <FaHtml5 />, title: "HTML5", level: 95 },
  { icon: <FaCss3Alt />, title: "CSS3", level: 90 },
  { icon: <FaGithub />, title: "GitHub", level: 85 },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-4">
          My Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Mastery in technologies I use
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, rotateY: -15 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ rotateY: 10, scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center transition-transform duration-300"
          >
            {/* Circular Progress Wrapper */}
            <div className="relative w-28 h-28 mb-6">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-300 dark:text-gray-700"
                  stroke="currentColor"
                  strokeWidth="3.8"
                  fill="none"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  className="text-purple-600 dark:text-purple-400"
                  stroke="currentColor"
                  strokeWidth="3.8"
                  strokeDasharray={`${skill.level}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
              </svg>

              {/* Centered Icon */}
              <div className="absolute inset-0 flex items-center justify-center text-4xl text-purple-600 dark:text-purple-400">
                {skill.icon}
              </div>
            </div>

            {/* Skill Name */}
            <h4 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
              {skill.title}
            </h4>

            {/* Skill Level */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {skill.level}% Proficient
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
