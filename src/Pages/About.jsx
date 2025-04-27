import AnimatedPage from "../Component/AnimatedPage";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <AnimatedPage>
      <section ref={ref} className="min-h-screen flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="max-w-2xl text-gray-600 dark:text-gray-300">
            Passionate Frontend Developer skilled in React, TailwindCSS, Bootstrap. Love creating clean and responsive web designs.
          </p>
        </motion.div>
      </section>
    </AnimatedPage>
  );
};

export default About;
