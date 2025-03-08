import React, { useEffect, useRef } from "react";
import { Box, Typography, Button, Container, Grid, LinearProgress } from "@mui/material";
import { gsap } from "gsap";
import image01 from "../assets/image01.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./site.css";
import ArrowOutwardTwoToneIcon from "@mui/icons-material/ArrowOutwardTwoTone";
import teamImage from "../assets/team_image.png";

gsap.registerPlugin(ScrollTrigger);

const stylesTwo = `
  @keyframes slideLeft {
    0% {
      opacity: 0.9;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-100px);
    }
  }

  .animate-slide-left {
    opacity: 0.9; /* Start visible */
    transform: translateX(0); /* Start at original position */
    will-change: transform, opacity; /* Optimize animation */
  }

  .animate-slide-left.disappear {
    animation: slideLeft 8s ease-out forwards; /* Slower for visibility */
    animation-delay: 8s; /* Slight delay to ensure it’s seen */
  }

  .animate-slide-left.appear {
    animation: slideLeft 8s ease-out reverse;
    animation-delay: 8s;
  }
`;

const AnimatedButton: React.FC = () => {
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target.querySelector(".animate-slide-left");
          if (element) {
            const scrollingDown = entry.boundingClientRect.top < 8;
            if (entry.isIntersecting) {
              element.classList.remove("disappear");
              element.classList.add("appear");
              console.log("Appearing: Sliding from left to original");
            } else if (scrollingDown) {
              element.classList.remove("appear");
              element.classList.add("disappear");
              console.log("Disappearing: Sliding from original to left");
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{stylesTwo}</style>

      <Box ref={buttonRef} sx={{ mt: 3, position: "relative", marginLeft: "150px" }}>
        <Box
          className="animate-slide-left"
          sx={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            background: "rgba(255, 255, 255, 0.05)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            cursor: "pointer",
            textAlign: "center",
            transition: "background 0.3s ease",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "0.9rem",
              fontWeight: 500,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            EXPLORE OUR <br /> SERVICES
            <ArrowOutwardTwoToneIcon sx={{ fontSize: 18, color: "rgba(255, 255, 255, 0.8)", ml: "20px" }} />
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
    }
    if (badgeRef.current) {
      gsap.fromTo(badgeRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, delay: 0.5 });

      const rotateBadge = gsap.to(badgeRef.current, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "linear",
      });
      return () => {
        rotateBadge.kill(); // Fixed: No return value from kill()
      };
    }
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, delay: 0.7 });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target.querySelector(".animate-slide-right");
          if (element) {
            if (entry.isIntersecting) {
              element.classList.remove("disappear");
              element.classList.add("appear");
            } else {
              element.classList.remove("appear");
              element.classList.add("disappear");
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        background: "#0D0D0D",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "5rem 0",
        position: "relative",
      }}
    >
      <Container>
        <Box sx={{ position: "relative", textAlign: "left", maxWidth: "1200px", margin: "0 auto" }}>
          <Typography
            ref={titleRef}
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: "4rem",
              lineHeight: "1",
              textTransform: "uppercase",
              letterSpacing: "0.1rem",
              marginBottom: "1rem",
            }}
          >
            Driving Results <br />
            with{" "}
            <Typography
              component="span"
              sx={{
                fontStyle: "italic",
                textDecoration: "underline",
                color: "#B0B0B0",
                fontSize: "4rem",
              }}
            >
              Creative Digital
            </Typography>{" "}
            <br />
            Solutions
          </Typography>
          <Typography
            sx={{
              mt: 2,
              maxWidth: "500px",
              marginLeft: "0",
              opacity: 0.8,
              fontSize: "1rem",
              lineHeight: "1.5",
              marginBottom: "3rem",
            }}
          >
            Our team of experts is dedicated to helping you achieve your digital goals. From website design and development to SEO, PPC advertising, and social media marketing.
          </Typography>
          <AnimatedButton />
        </Box>
      </Container>

      <Box
        ref={badgeRef}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10%",
          transform: "translateY(-50%)",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          opacity: 0.9,
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="120px"
            height="120px"
            viewBox="0 0 120 120"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <defs>
              <path
                id="circlePath"
                d="M 60 20 A 40 40 0 0 1 100 60 A 40 40 0 0 1 60 100 A 40 40 0 0 1 20 60 A 40 40 0 0 1 60 20"
                fill="none"
              />
            </defs>
            <text fill="#B0B0B0" fontSize="10" fontFamily="Arial, sans-serif" textAnchor="middle">
              <textPath href="#circlePath" startOffset="25%">
                PROJECT SHOWCASE
              </textPath>
              <textPath href="#circlePath" startOffset="75%">
                PROJECT SHOWCASE
              </textPath>
            </text>
          </svg>
          <Box
            component="span"
            sx={{
              display: "block",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#fff",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              "&:after": {
                content: '"★"',
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#000",
                fontSize: "0.7rem",
              },
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)",
          opacity: 0.5,
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.05) 10px, rgba(255, 255, 255, 0.05) 20px)",
        }}
      />
    </Box>
  );
};

const ImageSection: React.FC = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: "100%",
          ease: "power3.out",
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        marginLeft: "50px",
        marginTop: "-40px",
      }}
    >
      <img ref={imageRef} src={image01} width="100%" alt="Section Image" style={{ display: "block" }} />
    </Box>
  );
};

const TextScrollingSection: React.FC = () => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: () => window.innerWidth * 0.3, // Move text to 30% of window width
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        background: "white",
        color: "black",
        padding: "2rem 0",
        minHeight: "100px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        ref={textRef}
        sx={{
          whiteSpace: "nowrap",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          fontSize: "3rem",
          lineHeight: "1.2",
          display: "inline-block",
          position: "relative",
          transform: "translateX(-30%)",
        }}
      >
        <Typography component="span" sx={{ display: "inline" }}>
          SS
        </Typography>
        <Typography component="span" sx={{ display: "inline", ml: 2, fontSize: "120px", color: "black" }}>
          DIGITAL AGENCY SOLUTIONS
        </Typography>
      </Box>
    </Box>
  );
};

const styles = `
  @keyframes popUp {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-pop-up {
    opacity: 0; /* Start hidden */
  }

  .animate-pop-up.visible {
    animation: popUp 4s ease-out forwards; /* Trigger animation when visible */
  }
`;

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-pop-up");
            elements.forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{styles}</style>

      <Box ref={sectionRef} sx={{ py: 5, background: "#fff", position: "relative" }}>
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6} sx={{ overflow: "hidden", position: "relative" }}>
              <Box className="image-collage">
                <img src={teamImage} width={500} alt="Team member 1" className="collage-image top-left" />
              </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ color: "#000" }}>
              <Typography variant="h4" className="animate-pop-up" sx={{ fontWeight: "bold" }}>
                INNOVATIVE SOLUTIONS FOR YOUR BUSINESS
              </Typography>
              <Typography className="animate-pop-up" sx={{ mt: 2, opacity: 0.8, color: "#666" }}>
                Founded in 2012, we have built a reputation for excellence and innovation in the digital marketing space. We pride ourselves on our client-centric approach, partnering with businesses of all sizes and industries to develop customized strategies that meet their unique needs and goals.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <LinearProgress
                  variant="determinate"
                  value={90}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#000" },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Typography className="animate-pop-up" sx={{ mr: 2 }}>
                    BRANDING
                  </Typography>
                  <Typography className="animate-pop-up" sx={{ ml: 2 }}>
                    90%
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#000" },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Typography className="animate-pop-up" sx={{ mr: 2 }}>
                    BUSINESS
                  </Typography>
                  <Typography className="animate-pop-up" sx={{ ml: 2 }}>
                    85%
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box className="decorative-elements" />
        </Container>
      </Box>
    </>
  );
};

const StrategySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-pop-up");
            elements.forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{styles}</style>

      <Box
        ref={sectionRef}
        sx={{
          py: 5,
          background: "#111",
          color: "#fff",
          textAlign: "left",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Container sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ margin: "0 30px" }}>
            <Typography
              className="animate-pop-up"
              sx={{
                mb: 2,
                fontSize: "0.875rem",
                opacity: 0.6,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Our Approach
            </Typography>

            <Typography
              variant="h2"
              className="animate-pop-up"
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: "3.5rem",
                lineHeight: 1,
                textTransform: "uppercase",
                letterSpacing: -1,
              }}
            >
              EXPERTISE IN STRATEGY, DESIGN AND DEVELOPMENT
            </Typography>

            <Typography
              className="animate-pop-up"
              sx={{
                mb: 4,
                maxWidth: "500px",
                fontSize: "1rem",
                lineHeight: 1.6,
                opacity: 0.7,
              }}
            >
              The digital agency work process may vary depending on the specific project and client needs, but typically follows these basic steps. It is a collaborative and iterative process.
            </Typography>

            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="text"
                className="animate-pop-up"
                sx={{
                  color: "#fff",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: 0,
                  "&:hover": { background: "transparent" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography component="span" sx={{ mr: 2, letterSpacing: 1 }}>
                  LEARN MORE
                </Typography>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    border: "2px solid #fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowOutwardTwoToneIcon sx={{ fontSize: 30, color: "#fff" }} />
                </Box>
              </Button>
            </Box>
          </Box>

          <div>
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                padding: 2,
                borderRadius: 8,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={image01}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.3,
                  zIndex: 1,
                }}
              />
              <Box sx={{ position: "relative", zIndex: 2 }}>
                <Typography
                  variant="h5"
                  className="animate-pop-up"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#fff",
                  }}
                >
                  DISCOVERY <span style={{ opacity: 0.5 }}>→</span>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 300,
                    color: "#fff",
                    opacity: 0.3,
                    position: "absolute",
                    top: 10,
                    right: 10,
                  }}
                >
                  01
                </Typography>
                <Typography className="animate-pop-up" sx={{ opacity: 0.8, fontSize: "0.875rem", mt: 2 }}>
                  Based on the information gathered during discovery, the agency will develop a customized audience.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                padding: 2,
                borderRadius: 8,
                position: "relative",
                mt: 2,
              }}
            >
              <Typography
                variant="h5"
                className="animate-pop-up"
                sx={{ fontWeight: 700, fontSize: "1.5rem", mb: 1, color: "#fff" }}
              >
                STRATEGY
              </Typography>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: 300,
                  color: "#fff",
                  opacity: 0.3,
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              >
                02
              </Typography>
              <Typography className="animate-pop-up" sx={{ opacity: 0.8, fontSize: "0.875rem", mt: 2 }}>
                Based on the information gathered during discovery, the agency will develop a customized audience.
              </Typography>
            </Box>

            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                padding: 2,
                borderRadius: 8,
                position: "relative",
                mt: 2,
              }}
            >
              <Typography
                variant="h5"
                className="animate-pop-up"
                sx={{ fontWeight: 700, fontSize: "1.5rem", mb: 1, color: "#fff" }}
              >
                DEVELOPMENT
              </Typography>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: 300,
                  color: "#fff",
                  opacity: 0.3,
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              >
                03
              </Typography>
              <Typography className="animate-pop-up" sx={{ opacity: 0.8, fontSize: "0.875rem", mt: 2 }}>
                Based on the information gathered during discovery, the agency will develop a customized audience.
              </Typography>
            </Box>
          </div>
        </Container>
      </Box>
    </>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ImageSection />
      <TextScrollingSection />
      <AboutSection />
      <StrategySection />
    </>
  );
};

export default HomePage;