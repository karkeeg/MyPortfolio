import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com";
import confetti from "canvas-confetti";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_j7oicfh", // Your EmailJS service ID
        "template_sfb75qi", // Your template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "oyORtlfQbRmDt0zE5" // Your public key
      )
      .then(() => {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        toast.success("Message sent successfully! 🚀");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("Something went wrong! ❌");
      });
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white dark:bg-gray-900"
    >
      {/* Page Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-gray-800 dark:text-white mb-12"
      >
        Contact Me
      </motion.h2>

      {/* Content Block */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-10 flex flex-col md:flex-row gap-8"
      >
        {/* Left: Contact Info */}
        <div className="flex-1 flex flex-col justify-center space-y-6 text-gray-600 dark:text-gray-300 text-left">
          <h3 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Get in Touch
          </h3>
          <div className="flex items-center gap-4">
            <MapPin className="text-purple-500" />
            <span>Kathmandu, Nepal</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-green-500" />
            <a href="tel:+9779864073142" className="hover:underline">
              +977 9860917585{" "}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-blue-500" />
            <a
              href="mailto:karkibibek642@gmail.com"
              className="hover:underline"
            >
              karkibibek642@gmail.com
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex gap-6 text-2xl text-gray-700 dark:text-gray-300">
            <a
              href="https://github.com/karkeeg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/bibek-karki-b41703272/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/bibek_karki8/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white focus:outline-purple-500"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white focus:outline-purple-500"
          />
          <textarea
            name="message"
            required
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white focus:outline-purple-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
