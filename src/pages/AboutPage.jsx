import React, { useEffect } from "react";
import gsap from "gsap";
import "./AboutPage.css";

const AboutPage = ({ isMobile, isActive }) => {
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

  useEffect(() => {
    if (isMobile) {
      const sections = document.querySelectorAll(".about-page .section");

      const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 0.25, // Trigger when 25% of the section is visible
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only trigger the animation if the element is in view
            const timeline = gsap.timeline();
            const element = entry.target;

            if (element.classList.contains("meet-li")) {
              timeline.fromTo(
                element,
                { x: 0, y: 200, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
              );
            } else if (element.classList.contains("what-she-loves")) {
              timeline.fromTo(
                element,
                { x: 0, y: 200, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
              );
            } else if (element.classList.contains("in-the-making")) {
              timeline.fromTo(
                element,
                { x: 0, y: 200, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
              );
            }
          }
        });
      }, observerOptions);

      sections.forEach((section) => {
        observer.observe(section);
      });

      return () => {
        if (observer) {
          sections.forEach((section) => {
            observer.unobserve(section);
          });
        }
      };
    }
  }, [isMobile]);

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
