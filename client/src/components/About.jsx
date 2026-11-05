
import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";

export default function About() {
  return (
    <motion.section
      id="about"
      className="about-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <div className="about-card">
        <div className="about-image">
          <div className="about-image-placeholder">
            <Code2 size={70} />
            <span>AI / ML</span>
          </div>
        </div>

        <div className="about-content">
          <h2>About Me</h2>

          <p>
            I'm a passionate AIML student who loves working
            with data, building machine learning models,
            and creating real-world applications using
            Python and modern technologies.
          </p>

          <a href="#contact" className="about-btn">
            More About Me <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
