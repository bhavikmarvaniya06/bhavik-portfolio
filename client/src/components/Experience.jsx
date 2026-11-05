
import { motion } from "framer-motion";
import { BriefcaseBusiness, GraduationCap, Code2 } from "lucide-react";

const journey = [
  {
    type: "Education",
    title: "MCA – Artificial Intelligence & Machine Learning",
    organization: "LJ University",
    period: "Currently Pursuing",
    description:
      "Learning advanced concepts in Artificial Intelligence, Machine Learning, Data Analytics, and software development.",
    icon: GraduationCap,
  },
  {
    type: "Projects",
    title: "MERN Stack Travel Planner",
    organization: "Personal Project",
    period: "Project Development",
    description:
      "Developed a travel planning application using React, Node.js, Express.js, and MongoDB with authentication and trip management features.",
    icon: Code2,
  },
  {
    type: "Career",
    title: "Aspiring AI/ML & Data Professional",
    organization: "Continuous Learning",
    period: "Present",
    description:
      "Building practical skills in Python, Machine Learning, SQL, Data Analytics, and web development while preparing for industry opportunities.",
    icon: BriefcaseBusiness,
  },
];

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <motion.div
          className="experience-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="experience-tag">MY JOURNEY</span>

          <h2>
            Experience <span>& Journey</span>
          </h2>

          <p>
            My education, projects, and continuous learning journey
            toward becoming an AI/ML professional.
          </p>
        </motion.div>

        <div className="experience-timeline">
          {journey.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                className="timeline-item"
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="timeline-icon">
                  <Icon size={22} />
                </div>

                <div className="timeline-card">
                  <span className="timeline-type">{item.type}</span>

                  <h3>{item.title}</h3>

                  <h4>{item.organization}</h4>

                  <span className="timeline-period">{item.period}</span>

                  <p>{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
