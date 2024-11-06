import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import "./ProjectPage.css";

const reels = [
  {
    title: "Fat Ninja Rush",
    description: "A Flappy Bird inspired game made using Unity.",
    videoSrc: "/assets/videos/ninja.mp4",
    details: {
      explanation:
        "Fat Ninja Rush is a fun and challenging Flappy Bird-inspired game developed using Unity.\nIt features a scrolling parallax background with multiple layers to create a dynamic and immersive environment.",
      url: "https://play.unity.com/en/games/688a1be4-bc58-4cf4-ae38-90133c2846d2/fat-ninja-rush",
      img: "",
    },
  },
  {
    title: "Mystic Realm",
    description: "A first-person shooter game made using Unity.",
    videoSrc: "/assets/videos/shoot.mp4",
    details: {
      explanation:
        "In Mystic Realm, players control a ship targeted by mysterious rocks and must use quick reflexes to destroy them to survive.\nThe game features physics interactions and raycasting for accurate aiming and shooting. Navigation and shooting mechanics are handled via a combination of keyboard and mouse controls.",
      url: "https://play.unity.com/en/games/ed24e50e-ad81-453f-b877-fa23de387d6a/mystic-realm",
      img: "",
    },
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
  },
];

const ProjectPage = ({ isMobile, isActive }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const directionRef = useRef("next");

  const handleSwipe = (swipeDirection) => {
    console.log(currentIndex);
    directionRef.current = swipeDirection;
    if (swipeDirection === "next" && currentIndex < reels.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (swipeDirection === "previous" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
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
          <div className="phone-frame">
            <button className="sound-toggle-button" onClick={toggleSound}>
              {isMuted ? "Enable Sound" : "Mute Sound"}
            </button>
            <AnimatePresence initial={false}>
              {(isActive || isMobile) && (
                <motion.div
                  key={currentIndex}
                  className="reel"
                  initial={
                    isMobile
                      ? {
                          x:
                            currentIndex === 0
                              ? "100%" // Start from right for the first video
                              : currentIndex === reels.length - 1
                              ? "-100%" // Start from left for the last video
                              : directionRef.current === "next"
                              ? "100%"
                              : "-100%",
                        }
                      : {
                          y:
                            currentIndex === 0
                              ? "100%" // Start from bottom for the first video
                              : currentIndex === reels.length - 1
                              ? "-100%" // Start from top for the last video
                              : directionRef.current === "next"
                              ? "100%"
                              : "-100%",
                        }
                  }
                  animate={{ x: 0, y: 0 }}
                  exit={
                    isMobile
                      ? {
                          x:
                            currentIndex === 0
                              ? "-100%" // Exit to left for the first video
                              : currentIndex === reels.length - 1
                              ? "100%" // Exit to right for the last video
                              : directionRef.current === "next"
                              ? "-100%"
                              : "100%",
                        }
                      : {
                          y:
                            currentIndex === 0
                              ? "-100%" // Exit to top for the first video
                              : currentIndex === reels.length - 1
                              ? "100%" // Exit to bottom for the last video
                              : directionRef.current === "next"
                              ? "-100%"
                              : "100%",
                        }
                  }
                  transition={{ duration: 0.5 }}
                  drag={isMobile ? "x" : "y"}
                  dragConstraints={{
                    left: currentIndex === reels.length - 1 ? 0 : -100, // Prevent left drag if on the last video
                    right: currentIndex === 0 ? 0 : 100, // Prevent right drag if on the first video
                    top: currentIndex === reels.length - 1 ? 0 : -100, // Prevent upward drag if on the last video
                    bottom: currentIndex === 0 ? 0 : 100, // Prevent downward drag if on the first video
                  }}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (isMobile) {
                      // Handle left/right swipes for mobile
                      if (
                        (offset.x < -50 || velocity.x < -0.5) &&
                        currentIndex < reels.length - 1
                      ) {
                        handleSwipe("next"); // Swipe left for next video
                      } else if (
                        (offset.x > 50 || velocity.x > 0.5) &&
                        currentIndex > 0
                      ) {
                        handleSwipe("previous"); // Swipe right for previous video
                      }
                    } else {
                      // Handle up/down swipes for desktop
                      if (
                        (offset.y < -50 || velocity.y < -0.5) &&
                        currentIndex < reels.length - 1
                      ) {
                        handleSwipe("next"); // Swipe up for next video
                      } else if (
                        (offset.y > 50 || velocity.y > 0.5) &&
                        currentIndex > 0
                      ) {
                        handleSwipe("previous"); // Swipe down for previous video
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
                      currentIndex === 2 ? "dark-text" : ""
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
          {reels[currentIndex].details.url !== "" && (
            <a
              href={reels[currentIndex].details.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Play the game here
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
