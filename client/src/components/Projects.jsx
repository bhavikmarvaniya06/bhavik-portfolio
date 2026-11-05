
import { motion } from "framer-motion";

import {
  Layers,
  ExternalLink,
  Code,
} from "lucide-react";

const projects = [
  {
    title: "Travel Planner",
    description:
      "MERN stack travel planner with AI trip suggestions, authentication and trip management.",

    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
    ],

    github: "https://github.com/",
    demo: "https://example.com",

    icon: "✈️",
    gradient: "travel-gradient",
  },

  {
    title: "Movie Recommender",
    description:
      "Content-based movie recommendation using TF-IDF, cosine similarity and Flask API.",

    technologies: [
      "Python",
      "Scikit-learn",
      "Flask",
      "Pandas",
    ],

    github: "https://github.com/",
    demo: "https://example.com",

    icon: "🎬",
    gradient: "movie-gradient",
  },
];

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="projects-section"

      initial={{
        opacity: 0,
        y: 40,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{
        once: true,
        amount: 0.2,
      }}

      transition={{
        duration: 0.7,
      }}
    >

      {/* SECTION HEADING */}

      <div className="projects-heading">

        <h2>
          <Layers size={25} />
          Featured Projects
        </h2>

        <a href="#projects">
          View All Projects
          <ExternalLink size={16} />
        </a>

      </div>

      {/* PROJECT CARDS */}

      <div className="projects-grid">

        {projects.map((project, index) => (

          <motion.div
            key={project.title}

            className="project-card"

            initial={{
              opacity: 0,
              y: 30,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}

            whileHover={{
              y: -6,
              scale: 1.01,
            }}
          >

            {/* PROJECT IMAGE */}

            <div
              className={`project-image ${project.gradient}`}
            >

              <span>
                {project.icon}
              </span>

            </div>

            {/* PROJECT CONTENT */}

            <div className="project-content">

              <div className="project-title">

                <h3>
                  {project.title}
                </h3>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub repository"
                >
                  <Code size={17} />
                </a>

              </div>

              <p>
                {project.description}
              </p>

              {/* TECHNOLOGIES */}

              <div className="tech-tags">

                {project.technologies.map((tech) => (

                  <span key={tech}>
                    {tech}
                  </span>

                ))}

              </div>

              {/* LIVE DEMO */}

              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="project-demo"
              >

                Live Demo

                <ExternalLink size={14} />

              </a>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.section>
  );
}
