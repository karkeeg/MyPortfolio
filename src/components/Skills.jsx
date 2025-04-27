import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiRedux } from "react-icons/si";

const skills = [
  { icon: <FaReact />, title: "React" },
  { icon: <SiTailwindcss />, title: "TailwindCSS" },
  { icon: <SiRedux />, title: "Redux" },
  { icon: <FaJs />, title: "JavaScript" },
  { icon: <FaHtml5 />, title: "HTML5" },
  { icon: <FaCss3Alt />, title: "CSS3" },
  { icon: <FaGithub />, title: "GitHub" },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-4xl font-bold text-center mb-12">My Skills</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg hover:scale-110 hover:shadow-2xl transition cursor-pointer text-center w-40"
          >
            <div className="text-5xl text-purple-600 mb-4">{skill.icon}</div>
            <h4 className="font-bold">{skill.title}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
