import React, { useEffect } from "react";
import gsap from "gsap";
import "./AboutPage.css";

const AboutPage = ({ isActive }) => {
  useEffect(() => {
    if (isActive) {
      const timeline = gsap.timeline();
      timeline.fromTo(
        ".meet-li",
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
      timeline.fromTo(
        ".what-she-loves",
        { x: 200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "<0.15" // Starts 0.3 seconds after the first animation begins
      );
      timeline.fromTo(
        ".in-the-making",
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "<0.25" // Starts 0.6 seconds after the first animation begins
      );
    }
  }, [isActive]);

  return (
    <div className="about-page">
      <section className="section meet-li">
        <h2>Meet Li 👋</h2>
        <p>
          A history enthusiast whose greatest dream is to ascend to the heaven
          of Nintendo.
        </p>
      </section>

      <section className="section what-she-loves">
        <h2>What She Loves 💖</h2>
        <p>
          Forever captivated by the past and fantasy worlds, Li drifts beyond
          the present, exploring realms of imagination.
        </p>
        <p>Naturally, Li turned to tech, where imagination finds form.</p>
      </section>

      <section className="section in-the-making">
        <h2>In the Making 🗽</h2>
        <ul>
          <li>Full-stack wizard.</li>
          <li>Aspiring JRPG maker.</li>
          <li>Solo travel pro.</li>
          <li>Photographer.</li>
          <li>Amateur true crime detective.</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
