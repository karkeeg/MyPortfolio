import AnimatedPage from "../Component/AnimatedPage";

const Contact = () => {
  return (
    <AnimatedPage>
      <section className="h-screen flex flex-col justify-center items-center text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          Dahachowk, Kathmandu
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-3">📞 9864073142</p>
        <p className="text-gray-600 dark:text-gray-300">✉️ bibek@example.com</p>
      </section>
    </AnimatedPage>
  );
};

export default Contact;
