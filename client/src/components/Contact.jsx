import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Code,
  ExternalLink,
} from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    title: "Email",
    value: "marvaniyabhavik@gmail.com",
    link: "mailto:marvaniyabhavik@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 81286 50667",
    link: "tel:+91 81286 50667",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Ahmedabad, Gujarat, India",
    link: "https://maps.google.com/?q=Ahmedabad+Gujarat",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setStatus({ type: "", message: "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      setStatus({
        type: "success",
        message: response.data.message,
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <motion.div
          className="contact-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="contact-tag">GET IN TOUCH</span>

          <h2>
            Let's <span>Connect</span>
          </h2>

          <p>
            Have an opportunity, project idea, or just want to connect?
            Feel free to send me a message.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's talk about your project</h3>

            <p className="contact-info-description">
              I'm interested in opportunities related to AI/ML,
              Data Analytics, Data Science, and Python Development.
            </p>

            <div className="contact-details">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    href={item.link}
                    className="contact-detail"
                    key={item.title}
                    target={item.title === "Location" ? "_blank" : undefined}
                    rel={item.title === "Location" ? "noreferrer" : undefined}
                  >
                    <div className="contact-detail-icon">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="contact-socials">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Code size={21} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <ExternalLink size={21} />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-input-group">
                  <label htmlFor="contact-name">Your Name</label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-input-group">
                  <label htmlFor="contact-email">Your Email</label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-input-group">
                <label htmlFor="contact-subject">Subject</label>

                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-input-group">
                <label htmlFor="contact-message">Message</label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>

              {status.message && (
                <div
                  className={
                    status.type === "success"
                      ? "contact-success"
                      : "contact-error"
                  }
                  role="status"
                >
                  {status.type === "success" && <CheckCircle size={18} />}
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}