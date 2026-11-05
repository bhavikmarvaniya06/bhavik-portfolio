
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  BrainCircuit,
  BarChart3,
  Globe,
  Wrench,
} from "lucide-react";

const skillGroups = [
  {
    title: "Programming",
    icon: Code2,
    skills: ["Python", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    skills: ["Scikit-learn", "Pandas", "NumPy", "Machine Learning", "NLP"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MySQL", "MongoDB", "SQL Queries"],
  },
  {
    title: "Data Analytics",
    icon: BarChart3,
    skills: ["Power BI", "Excel", "Data Visualization", "Statistics"],
  },
  {
    title: "Web Development",
    icon: Globe,
    skills: ["React", "Node.js", "Express.js", "Flask"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook"],
  },
];

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="section-container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">MY EXPERTISE</span>
          <h2>
            Technical <span>Skills</span>
          </h2>
          <p>
            Technologies and tools I use to build applications and solve
            real-world problems.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <motion.div
                className="skill-card"
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="skill-card-heading">
                  <div className="skill-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{group.title}</h3>
                </div>

                <div className="skill-tags">
                  {group.skills.map((skill) => (
                    <span className="skill-tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

<Skills />