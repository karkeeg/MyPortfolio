import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-3">📍 Kathmandu, Nepal</p>
        <p className="text-gray-600 dark:text-gray-300 mb-3">📞 9864073142</p>
        <p className="text-gray-600 dark:text-gray-300">✉️ bibek@example.com</p>
      </motion.div>
    </section>
  );
};

export default Contact;
