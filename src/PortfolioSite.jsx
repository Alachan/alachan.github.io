import React, { useEffect, useState } from "react";
import "./PortfolioSite.css";
import AboutPage from "./pages/AboutPage";
import gsap from "gsap";
import ProjectPage from "./pages/ProjectPage";
import PhotoPage from "./pages/PhotoPage";

const PortfolioSite = () => {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [fullscreenAlt, setFullscreenAlt] = useState("");
  const [activeSection, setActiveSection] = useState(1);
  const [showGif, setShowGif] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Function to toggle the GIF visibility
  const toggleGif = () => {
    setShowGif((prev) => !prev);

    // Toggle color effect on the button
    const button = document.querySelector(".logo-icon.clickable");
    if (button.classList.contains("active-color")) {
      button.classList.remove("active-color");
    } else {
      button.classList.add("active-color");
    }
  };

  // Function to animate the GIF position continuously
  const startGifAnimation = () => {
    const gifElement = document.querySelector(".animated-gif");

    if (gifElement) {
      // Set a random starting position
      gsap.set(gifElement, {
        x: gsap.utils.random(0, window.innerWidth - 80),
        y: gsap.utils.random(0, window.innerHeight - 80),
      });

      const animate = () => {
        gsap.to(gifElement, {
          x: gsap.utils.random(0, window.innerWidth - 80), // Adjust for viewport width and gif size
          y: gsap.utils.random(0, window.innerHeight - 80), // Adjust for viewport height and gif size
          duration: 2 + Math.random() * 3, // Random duration between 2-5 seconds
          ease: "power1.inOut",
          onComplete: animate, // Repeat animation
        });
      };
      animate(); // Start the animation
    }
  };

  useEffect(() => {
    if (showGif) {
      startGifAnimation(); // Start moving the GIF when it's shown
    } else {
      gsap.killTweensOf(".animated-gif"); // Stop animation when GIF is hidden
    }
  }, [showGif]);

  // Function to handle viewport changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const photoItems = document.querySelectorAll(".photo-item");
    photoItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.15}s`; // Adjust timing as needed
    });

    // Apply typewriter effect only when `fullscreenAlt` changes
    const caption = document.querySelector(".fullscreen-caption");
    if (caption) {
      const textLength = fullscreenAlt.length;
      const duration = textLength * 0.1; // Adjust for speed (0.1s per character)

      // Set CSS variable for width dynamically
      caption.style.setProperty("--caption-width", `${textLength - 0.5}ch`);
      caption.style.animationDuration = `${duration}s`;

      // Reset and reapply animation class to trigger each time
      caption.classList.remove("typewriter-effect");
      void caption.offsetWidth; // Trigger reflow
      caption.classList.add("typewriter-effect");

      // Listen for animation end to remove the cursor
      const removeCursor = () => {
        caption.classList.remove("typewriter-effect");
      };
      caption.addEventListener("animationend", removeCursor);

      // Clean up event listener when caption changes or component unmounts
      return () => caption.removeEventListener("animationend", removeCursor);
    }
  }, [fullscreenAlt]);

  const handleImageClick = (imageSrc, imageAlt) => {
    setFullscreenImage(imageSrc);
    setFullscreenAlt(imageAlt);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
    setFullscreenAlt("");
  };

  const images = [
    {
      src: "./assets/photo1.jpg",
      alt: "It is called Devil City of Yardang for a reason",
    },
    {
      src: "./assets/SquirrelsOnPowerLine.jpg",
      alt: "Little creature dancing on the power line",
    },
    { src: "./assets/Namtso.jpg", alt: "Havenly Lake Namtso, so angelic" },
    {
      src: "./assets/Mingsha.jpg",
      alt: "Waiting for sunset in Singing Sand Dunes",
    },
    {
      src: "./assets/SleepingDogs.jpg",
      alt: "Cute buddies in Centro Historico, CDMX",
    },
    {
      src: "./assets/NyenchenTanglha.jpg",
      alt: "The one and holy Nyenchen Tanglha",
    },
    {
      src: "./assets/Arashiyama.jpg",
      alt: "Train not spotted in Arashiyama, Kyoto",
    },
    {
      src: "./assets/ViewFromChapultepec.jpg",
      alt: "Mad about the symmetric view from Chapultepec Castle",
    },
    {
      src: "./assets/YardangPark.jpg",
      alt: "Sun setting in Yardang National Geopark, Dunhuang",
    },
    {
      src: "./assets/Sakura.jpg",
      alt: "Sakura and lives blossom in Nakano, Tokyo",
    },
    {
      src: "./assets/MexicoCity.jpg",
      alt: "Miss the vibrancy of Mexico City",
    },
    {
      src: "./assets/TibetanHighway.jpg",
      alt: "Had to take the pic during a road trip in Tibet",
    },
  ];

  function flipToSection(sectionIndex) {
    setActiveSection(sectionIndex); // Update active section state

    const pages = document.querySelectorAll(".page");
    const buttons = document.querySelectorAll(".clip-button");

    // Hide all pages
    pages.forEach((page) => page.classList.remove("active"));

    // Show the selected page
    const targetPage = document.querySelector(`#page-${sectionIndex}`);
    targetPage.classList.add("active");

    // Remove the 'active' class from all buttons and set the clicked button as active
    buttons.forEach((button) => button.classList.remove("active"));
    const activeButton = document.querySelector(`#clip-${sectionIndex}`);
    activeButton.classList.add("active");
  }

  return (
    <div className="portfolio-container">
      <div className="nav-section">
        <div className="nav-content">
          <div className="logo-container">
            <img
              src="/assets/icons/game.png"
              alt="Site Logo"
              className="logo-icon"
            />
            <span>=&gt;&nbsp;</span>
            <img
              src="/assets/icons/start-button.png"
              alt="Button Logo"
              className="logo-icon clickable"
              onClick={toggleGif} // Toggle GIF visibility on click
            />
          </div>
          <div className="about-container">
            <span
              className="title-text clickable"
              onClick={() => flipToSection(3)}
            >
              Meet Li
            </span>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/li-huang-113199126/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/icons/linkedin.png"
                  alt="LinkedIn"
                  className="social-icon"
                />
              </a>
              <a
                href="https://github.com/Alachan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/icons/github.png"
                  alt="GitHub"
                  className="social-icon"
                />
              </a>
              <a href="mailto:lih.lihuang@gmail.com">
                <img
                  src="/assets/icons/email.png"
                  alt="Email"
                  className="social-icon"
                />
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <img
                  src="/assets/icons/resume.png"
                  alt="Resume"
                  className="social-icon"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="portfolio-section">
        <button
          className="clip-button active"
          id="clip-1"
          onClick={() => flipToSection(1)}
        >
          <img
            src="/assets/icons/album.png"
            alt="Clip Icon 1"
            className="clip-icon"
          />
        </button>
        <button
          className="clip-button"
          id="clip-2"
          onClick={() => flipToSection(2)}
        >
          <img
            src="/assets/icons/project.png"
            alt="Clip Icon 2"
            className="clip-icon"
          />
        </button>
        <button
          className="clip-button"
          id="clip-3"
          onClick={() => flipToSection(3)}
        >
          <img
            src="/assets/icons/female.png"
            alt="Clip Icon 3"
            className="clip-icon"
          />
        </button>

        <div className="page active" id="page-1">
          <PhotoPage
            images={images}
            handleImageClick={handleImageClick}
            fullscreenImage={fullscreenImage}
            fullscreenAlt={fullscreenAlt}
            handleCloseFullscreen={handleCloseFullscreen}
            isMobile={isMobile}
          />
        </div>
        <div className="page" id="page-2">
          <ProjectPage isActive={activeSection === 2} isMobile={isMobile} />
        </div>
        <div className="page" id="page-3">
          <AboutPage isActive={isMobile || activeSection === 3} />
        </div>
      </div>

      {/* Animated GIF */}
      {showGif && (
        <img
          src="/assets/nyan-cat.gif" // Path to your GIF
          alt="Nyan Cat"
          className="animated-gif"
          style={{
            position: "absolute",
            width: "60px",
            height: "auto",
          }}
        />
      )}
    </div>
  );
};

export default PortfolioSite;
