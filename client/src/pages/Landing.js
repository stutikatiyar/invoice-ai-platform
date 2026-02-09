import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import "../styles/landing.css";

function Landing() {

  const navigate = useNavigate();
  const aboutRef = useRef(null);

  // ⭐ Auto Scroll After Page Load
  useEffect(() => {

    const timer = setTimeout(() => {

      aboutRef.current?.scrollIntoView({
        behavior: "smooth"
      });

    }, 2000); // scroll after 2 seconds

    return () => clearTimeout(timer);

  }, []);

  return (
    <div className="landing-container">

      <PublicNavbar />

      {/* ===== HERO ===== */}
      <section className="hero-section">

  <h1 className="hero-title">
    Smart Invoice Management
  </h1>

  <p className="hero-subtitle">
    Upload, organize and analyze invoices using AI
  </p>

  <div className="hero-buttons">
    <button
      className="primary-btn"
      onClick={() => navigate("/register")}
    >
      Get Started
    </button>

    <button
      className="secondary-btn"
      onClick={() => navigate("/login")}
    >
      Login
    </button>
  </div>

  {/* ⭐ Scroll Indicator */}
  <div
    className="scroll-indicator"
    onClick={() =>
      aboutRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  >
    ↓ Scroll to Learn More
  </div>

</section>


      {/* ===== ABOUT SECTION ===== */}
      <section className="about-section" ref={aboutRef}>

        <h2>What is InvoiceAI?</h2>

        <p>
          InvoiceAI helps businesses store, manage and analyze invoices
          in one place. Upload documents, track usage and soon
          automate invoice data extraction using AI.
        </p>

      </section>

    </div>
  );
}

export default Landing;
