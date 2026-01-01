import React, { useEffect } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandSparkles, faHeart, faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
import "./AboutPage.css";

const AboutPage = ({ isMobile, isActive }) => {

  useEffect(() => {
    // Force cards to be visible immediately
    const cards = document.querySelectorAll(".card-polaroid");
    cards.forEach(card => {
      card.style.opacity = "1";
    });

    if (isActive && !isMobile) {
      const timer = setTimeout(() => {
        gsap.set(".card-1", { rotation: -6 });
        gsap.set(".card-2", { rotation: 5 });
        gsap.set(".card-3", { rotation: -4 });
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isActive, isMobile]);

  useEffect(() => {
    if (isMobile) {
      const cards = document.querySelectorAll(".card-polaroid");

      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.25,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            gsap.fromTo(
              element,
              {
                scale: 0.9,
                opacity: 0,
                y: 30
              },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "back.out(1.2)"
              }
            );
            // Unobserve after animating to prevent re-triggering
            observer.unobserve(element);
          }
        });
      }, observerOptions);

      cards.forEach((card) => {
        observer.observe(card);
      });

      return () => {
        if (observer) {
          cards.forEach((card) => {
            observer.unobserve(card);
          });
        }
      };
    }
  }, [isMobile]);

  return (
    <div className="about-page">
      <div className="cards-container">
        <section className="card-polaroid card-1">
          <div className="window-title-bar card-1-title">
            <FontAwesomeIcon icon={faHandSparkles} className="title-icon" />
            <span>Meet Li</span>
          </div>
          <div className="section meet-li">
            <p>
              A history enthusiast whose greatest dream is to ascend to the heaven
              of Nintendo.
            </p>
            <p className="sanctuary-intro">
              When the world gets too loud, I retreat to{" "}
              <a
                href="https://hikarie.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="sanctuary-link"
              >
                my sanctuary ◐
              </a>
            </p>
          </div>
        </section>

        <section className="card-polaroid card-2">
          <div className="window-title-bar card-2-title">
            <FontAwesomeIcon icon={faHeart} className="title-icon" />
            <span>What She Loves</span>
          </div>
          <div className="section what-she-loves">
            <p>
              Forever captivated by the past and fantasy worlds, Li drifts beyond
              the present, exploring realms of imagination.
            </p>
            <p>Naturally, Li turned to tech, where imagination finds form.</p>
          </div>
        </section>

        <section className="card-polaroid card-3">
          <div className="window-title-bar card-3-title">
            <FontAwesomeIcon icon={faMagicWandSparkles} className="title-icon" />
            <span>In the Making</span>
          </div>
          <div className="section in-the-making">
            <ul>
              <li>Full-stack wizard.</li>
              <li>Aspiring JRPG dev.</li>
              <li>Solo travel pro.</li>
              <li>Photographer.</li>
              <li>Amateur true crime detective.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
