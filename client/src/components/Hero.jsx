
import { motion } from "framer-motion";
import {
  Rocket,
  BrainCircuit,
  Database,
  ChartNoAxesColumnIncreasing,
  Code,
  ExternalLink,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-grid">

        {/* LEFT CONTENT */}

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="greeting">
            👋 Hello, I'm
          </p>

          <h1>
            Bhavik <span>Marvaniya</span>
          </h1>

          <p className="hero-role">
            AI/ML Enthusiast · Data Analyst · Python Developer
          </p>

          <h2>
            Building AI Solutions for
            <br />
            <span>Real-World Problems</span>
            <span className="typing-cursor">|</span>
          </h2>

          <p className="hero-description">
            MCA (AIML) Student focused on Machine Learning,
            Data Analytics and building impactful AI-powered
            applications.
          </p>

          <div className="hero-buttons">

            <a href="#projects" className="primary-btn">
              <Rocket size={17} />
              View My Projects
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="secondary-btn"
            >
              <Code size={17} />
              GitHub
              <ExternalLink size={14} />
            </a>

          </div>
        </motion.div>

        {/* RIGHT AI VISUAL */}

        <motion.div
          className="brain-area"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >

          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="brain-glow">
            <BrainCircuit
              size={180}
              strokeWidth={1.2}
            />
          </div>

          <div className="tech-label label-ai">
            <BrainCircuit size={18} />
            AI / ML
          </div>

          <div className="tech-label label-python">
            <Code size={18} />
            Python
          </div>

          <div className="tech-label label-data">
            <ChartNoAxesColumnIncreasing size={18} />
            Data Analytics
          </div>

          <div className="tech-label label-science">
            <Database size={18} />
            Data Science
          </div>

        </motion.div>

      </div>

      {/* STATS BAR */}

      <div className="stats-bar">

        <div>
          <BrainCircuit />

          <span>
            <strong>MCA (AIML)</strong>
            <small>7th Semester</small>
          </span>
        </div>

        <div>
          <Code />

          <span>
            <strong>5+</strong>
            <small>Projects</small>
          </span>
        </div>

        <div>
          <ChartNoAxesColumnIncreasing />

          <span>
            <strong>Multiple</strong>
            <small>Tech Skills</small>
          </span>
        </div>

        <div>
          <Database />

          <span>
            <strong>AI/ML & Data</strong>
            <small>Career Focus</small>
          </span>
        </div>

      </div>

    </section>
  );
}
