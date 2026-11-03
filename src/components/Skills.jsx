import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiRedux,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiFastapi,
  SiMysql,
  SiNeo4J,
  SiPrisma,
  SiRedis,
  SiVercel,
  SiSupabase,
  SiJsonwebtokens
} from "react-icons/si";

const skillsByCategory = {
  Frontend: [
    { icon: FaReact, title: "React" },
    { icon: SiNextdotjs, title: "Next.js" },
    { icon: FaReact, title: "React Native" },
    { icon: SiTypescript, title: "TypeScript" },
    { icon: SiTailwindcss, title: "Tailwind CSS" },
  ],
  Backend: [
    { icon: FaNodeJs, title: "Node.js" },
    { icon: SiExpress, title: "Express.js" },
    { icon: SiFastapi, title: "FastAPI" },
  ],
  Database: [
    { icon: SiPostgresql, title: "PostgreSQL" },
    { icon: SiMongodb, title: "MongoDB" },
    { icon: SiMysql, title: "MySQL" },
    { icon: SiNeo4J, title: "Neo4j" },
  ],
  "ORM & State": [
    { icon: SiPrisma, title: "Prisma" },
    { icon: SiRedux, title: "Redux Toolkit" },
    { icon: null, title: "Zustand", textIcon: "🐻" },
  ],
  "Authentication & Security": [
    { icon: SiJsonwebtokens, title: "JWT" },
    { icon: null, title: "OAuth", textIcon: "🛡️" },
    { icon: null, title: "RBAC", textIcon: "🔐" },
    { icon: null, title: "Argon2", textIcon: "🔒" },
  ],
  "Infrastructure & Tools": [
    { icon: FaDocker, title: "Docker" },
    { icon: FaAws, title: "AWS" },
    { icon: FaGithub, title: "Git & GitHub" },
    { icon: SiRedis, title: "Redis" },
    { icon: SiVercel, title: "Vercel" },
    { icon: SiSupabase, title: "Supabase" },
  ],
};

const SkillCard = ({ icon: Icon, title, textIcon }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-background-secondary border border-white/5 p-4 rounded-xl shadow-sm hover:shadow-blue-500/10 flex items-center gap-4 transition-all glow-border"
  >
    <div className="w-10 h-10 flex items-center justify-center text-2xl text-primary bg-white/5 rounded-lg">
      {Icon ? <Icon /> : <span className="text-xl">{textIcon}</span>}
    </div>
    <h4 className="font-medium text-primary text-sm tracking-wide">{title}</h4>
  </motion.div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Technical Arsenal</h2>
          <p className="text-primary-dim text-lg">Technologies I leverage to build scalable software.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.entries(skillsByCategory).map(([category, skills], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-primary mb-6 border-b border-white/10 pb-2">{category}</h3>
              <div className="flex flex-col gap-3">
                {skills.map((skill, i) => (
                  <SkillCard key={i} {...skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
