import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import "./ProjectPage.css";

const reels = [
  {
  title: "ChaTime",
  description: "A real-time chat platform built using Laravel and React.",
  videoSrc: "/assets/videos/chat.mp4",
  details: {
    explanation:
      "ChaTime is a real-time chat application that blends modern messaging technology with tea-inspired social spaces.\n" +
      "The platform allows users to join public chatrooms or create private password-protected rooms for more intimate conversations.\n" +
      "Built with Laravel and React, ChaTime features WebSocket-based real-time messaging, user authentication, and dynamic member presence updates.\n" +
      "Users can edit and delete messages, upload profile avatars, view system join/leave events, and enjoy smooth animated UI interactions.",
    url: "https://cha-time.vercel.app/",
    cta: "Try the chat app",
    img: ""
  },
  darkText: true,
},
  {
    title: "Newstead Academy Child Care",
    description: "The official website for a multi-location child care academy.",
    videoSrc: "/assets/videos/newstead.mp4", 
    details: {
      explanation:
        "Newstead Academy Child Care is the official website developed for a licensed child care business with multiple locations across Ontario.\n" +
        "The platform was built using Next.js with a focus on performance, accessibility, SEO, and mobile-first design.\n" +
        "It features custom enrollment flows, location-based program pages, responsive layouts, and optimized image delivery for fast loading.\n" +
        "The website supports marketing growth, parent onboarding, and daily operational communication while maintaining WCAG-friendly accessibility standards.",
      url: "https://www.newsteadacademy.ca/",
      cta: "Visit the website",
      img: ""
    },
    darkText: true,
  },
  {
    title: "Fat Ninja Rush",
    description: "A Flappy Bird inspired game made using Unity.",
    videoSrc: "/assets/videos/ninja.mp4",
    details: {
      explanation:
        "Fat Ninja Rush is a fun and challenging Flappy Bird-inspired game developed using Unity.\nIt features a scrolling parallax background with multiple layers to create a dynamic and immersive environment.",
      url: "https://play.unity.com/en/games/688a1be4-bc58-4cf4-ae38-90133c2846d2/fat-ninja-rush",
      cta: "Play the game here",
      img: "",
    },
    darkText: false,
  },
  {
    title: "Mystic Realm",
    description: "A first-person shooter game made using Unity.",
    videoSrc: "/assets/videos/shoot.mp4",
    details: {
      explanation:
        "In Mystic Realm, players control a ship targeted by mysterious rocks and must use quick reflexes to destroy them to survive.\nThe game features physics interactions and raycasting for accurate aiming and shooting. Navigation and shooting mechanics are handled via a combination of keyboard and mouse controls.",
      url: "https://play.unity.com/en/games/ed24e50e-ad81-453f-b877-fa23de387d6a/mystic-realm",
      cta: "Play the game here",
      img: "",
    },
    darkText: false,
  },
  {
    title: "Smart To-Do",
    description:
      "A feature-rich to-do list app built with React Native and Firebase.",
    videoSrc: "/assets/videos/todo-demo.mp4",
    details: {
      explanation:
        "Smart To-Do enables users to manage tasks with cloud storage, swipe-to-delete functionality, and multimedia features.\nThe app allows users to save photos, record and replay audio notes, and store data securely in Firebase for access across devices.",
      url: "",
      img: "/assets/todo-log.png",
    },
    darkText: true,
  },
  {
    title: "NYT Top Stories",
    description:
      "An engaging news app fetching top stories from The New York Times API.",
    videoSrc: "/assets/videos/nyt-demo.mp4",
    details: {
      explanation:
        "NYT Top Stories provides a seamless news experience with fragments for modular UI design, coroutines for efficient data fetching, and MVVM architecture for clean separation of concerns.\nThe app features user-friendly navigation, a favorites section to save articles, and search by categories.\nBuilt with Kotlin, it integrates Firebase for authentication and secure data storage.",
      url: "",
      img: "",
    },
    darkText: true,
  },
];

const ProjectPage = ({ isMobile, isActive }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const directionRef = useRef("next");

  const handleSwipe = (swipeDirection) => {
    directionRef.current = swipeDirection;
    if (swipeDirection === "next" && currentIndex < reels.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (swipeDirection === "previous" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const getAnimationProps = (index, direction) => {
    if (isMobile) {
      return {
        initial: {
          x: direction === "next" ? "100%" : "-100%",
        },
        animate: { x: 0 },
        exit: {
          x:
            index === 0
              ? "-100%" // Exit to left for the first video
              : index === reels.length - 1
              ? "100%" // Exit to right for the last video
              : direction === "next"
              ? "-100%"
              : "100%",
        },
      };
    } else {
      return {
        initial: {
          y: direction === "next" ? "100%" : "-100%",
        },
        animate: { y: 0 },
        exit: {
          y:
            index === 0
              ? "-100%" // Exit to top for the first video
              : index === reels.length - 1
              ? "100%" // Exit to bottom for the last video
              : direction === "next"
              ? "-100%"
              : "100%",
        },
      };
    }
  };

  const toggleSound = () => {
    setIsMuted((prevMuteState) => {
      const newMutedState = !prevMuteState;
      if (videoRef.current) {
        videoRef.current.muted = newMutedState;
        if (!newMutedState) {
          videoRef.current.play().catch((err) => {
            console.error("Playback error: ", err);
          });
        }
      }
      return newMutedState;
    });
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.error("Playback error: ", err);
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isActive && !isMobile) {
      setCurrentIndex(0);
      setIsMuted(true);
    }
  }, [isActive, isMobile]);

  return (
    <div className="project-page-container">
      <div className="content-container">
        <div className="left-section">
          <div className="phone-and-social">
          <div className="phone-frame">
            <button className="sound-toggle-button" onClick={toggleSound}>
              {isMuted ? "Enable Sound" : "Mute Sound"}
            </button>
            <AnimatePresence mode="popLayout" initial={false}>
              {(isActive || isMobile) && (
                <motion.div
                  key={currentIndex}
                  className="reel"
                  {...getAnimationProps(currentIndex, directionRef.current)}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  drag={isMobile ? "x" : "y"}
                  dragConstraints={{
                    left: currentIndex === reels.length - 1 ? 0 : -30,
                    right: currentIndex === 0 ? 0 : 100,
                    top: currentIndex === reels.length - 1 ? 0 : -30,
                    bottom: currentIndex === 0 ? 0 : 100,
                  }}
                  dragElastic={1}
                  dragMomentum={false}
                  dragTransition={{ power: 0, timeConstant: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (isMobile) {
                      if (
                        (offset.x < -50 || velocity.x < -0.5) &&
                        currentIndex < reels.length - 1
                      ) {
                        handleSwipe("next");
                      } else if (
                        (offset.x > 50 || velocity.x > 0.5) &&
                        currentIndex > 0
                      ) {
                        handleSwipe("previous");
                      }
                    } else {
                      if (
                        (offset.y < -50 || velocity.y < -0.5) &&
                        currentIndex < reels.length - 1
                      ) {
                        handleSwipe("next");
                      } else if (
                        (offset.y > 50 || velocity.y > 0.5) &&
                        currentIndex > 0
                      ) {
                        handleSwipe("previous");
                      }
                    }
                  }}
                >
                  <video
                    ref={videoRef}
                    className="reel-video"
                    src={reels[currentIndex].videoSrc}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onCanPlay={() => {
                      if (videoRef.current) {
                        videoRef.current.play().catch((err) => {
                          console.error("Playback error: ", err);
                        });
                      }
                    }}
                  />
                  <div
                    className={`overlay ${
                      reels[currentIndex].darkText ? "dark-text" : ""
                    }`}
                  >
                    <div className="overlay-content">
                      <h2>{reels[currentIndex].title}</h2>
                      <p>{reels[currentIndex].description}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="social-interactions">
            <div className="interaction-item">
              <img
                src="/assets/icons/avatar_cropped.png"
                alt="Avatar"
                className="interaction-icon"
              />
            </div>
            <div className="interaction-item">
              <FontAwesomeIcon icon={faHeart} className="interaction-icon" />
              <span>2004</span>
            </div>
            <div className="interaction-item">
              <FontAwesomeIcon icon={faComment} className="interaction-icon" />
              <span>831</span>
            </div>
          </div>
          </div>
          <div className="swipe-hint">
            {isMobile ? "← Swipe left or right →" : "↑ Swipe up or down ↓"}
          </div>
        </div>
        <div className="right-section">
          <h2>Project Details</h2>
          <p>
            {reels[currentIndex].details.explanation
              .split("\n")
              .map((text, index) => (
                <React.Fragment key={index}>
                  {text}
                  <br />
                  <br />
                </React.Fragment>
              ))}
          </p>
          {reels[currentIndex].details.url && (
            <a
              href={reels[currentIndex].details.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-cta"
            >
              {reels[currentIndex].details.cta}
            </a>
          )}
          {reels[currentIndex].details.img !== "" && (
            <img
              src={reels[currentIndex].details.img}
              alt="preview"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
