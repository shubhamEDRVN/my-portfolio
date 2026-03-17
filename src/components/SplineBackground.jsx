import React, { Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS } from "../data/skills-data";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

gsap.registerPlugin(ScrollTrigger);

// Helper sleep function
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Keyboard states for different sections (scale, position, rotation)
const STATES = {
  hero: {
    desktop: {
      scale: { x: 0.001, y: 0.001, z: 0.001 },
      position: { x: 400, y: -2000, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.001, y: 0.001, z: 0.001 },
      position: { x: 0, y: -2000, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  skills: {
    desktop: {
      scale: { x: 0.3, y: 0.25, z: 0.25 },
      position: { x: -60, y: -60, z: 100 },
      rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    mobile: {
      scale: { x: 0.13, y: 0.13, z: 0.13 },
      position: { x: -20, y: -50, z: 0 },
      rotation: { x: 0, y: Math.PI / 6, z: 0 },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.1, y: 0.1, z: 0.1 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
    mobile: {
      scale: { x: 0.18, y: 0.18, z: 0.18 },
      position: { x: 0, y: 150, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
  },
  contact: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.2 },
      position: { x: 500, y: -250, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.18, y: 0.18, z: 0.18 },
      position: { x: 0, y: 150, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
  },
};

const SplineBackground = () => {
  const splineContainer = useRef(null);
  const [splineApp, setSplineApp] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [keycapAnimations, setKeycapAnimations] = useState(null);
  const [keyboardRevealed, setKeyboardRevealed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const pressedKeycapRef = useRef(null); // Track currently pressed keycap 3D object

  // Check if mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // Helper to get keyboard state
  const keyboardStates = (section) => {
    return STATES[section]?.[isMobile ? "mobile" : "desktop"] || STATES.hero.desktop;
  };

  // Track the original Y position of each keycap so press/release don't drift
  const keycapOriginalY = useRef(new Map());

  // Animate keycap press down / release using stored original Y
  const pressKeycap = (keycapObj) => {
    if (!keycapObj) return;
    // Store the original Y if not already stored
    if (!keycapOriginalY.current.has(keycapObj.name)) {
      keycapOriginalY.current.set(keycapObj.name, keycapObj.position.y);
    }
    gsap.killTweensOf(keycapObj.position);
    gsap.to(keycapObj.position, {
      y: keycapOriginalY.current.get(keycapObj.name) - 30,
      duration: 0.12,
      ease: "power2.out",
    });
  };

  const releaseKeycap = (keycapObj) => {
    if (!keycapObj) return;
    const originalY = keycapOriginalY.current.get(keycapObj.name);
    if (originalY === undefined) return;
    gsap.killTweensOf(keycapObj.position);
    gsap.to(keycapObj.position, {
      y: originalY,
      duration: 0.3,
      ease: "elastic.out(1, 0.5)",
    });
  };

  // Handle mouse hover on keyboard keys
  const handleMouseHover = (e) => {
    console.log("Spline Hover Event:", e.target.name);
    
    if (!splineApp || selectedSkill?.name === e.target.name) return;
    const skill = SKILLS[e.target.name];

    if (e.target.name === "body" || e.target.name === "platform") {
      console.log("Hovered body/platform. Releasing key...");
      // Release previously pressed key
      if (pressedKeycapRef.current) {
        releaseKeycap(pressedKeycapRef.current);
        pressedKeycapRef.current = null;
      }
      setSelectedSkill(null);
      try {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      } catch (err) { }
    } else {
      if (!selectedSkill || selectedSkill.name !== e.target.name) {
        console.log("Hovered specific key:", e.target.name, "Found skill:", !!skill);
        // Release previous key
        if (pressedKeycapRef.current) {
          releaseKeycap(pressedKeycapRef.current);
          pressedKeycapRef.current = null;
        }
        if (skill) {
          // Find and press down the new keycap
          const keycapObj = splineApp.findObjectByName(skill.name);
          if (keycapObj) {
            console.log("Pressing down keycap:", keycapObj.name);
            pressKeycap(keycapObj);
            pressedKeycapRef.current = keycapObj;
          }
          setSelectedSkill(skill);
          // Update Spline text variables directly
          try {
            console.log("Setting Variables:", skill.label, skill.shortDescription);
            splineApp.setVariable("heading", skill.label);
            splineApp.setVariable("desc", skill.shortDescription);
          } catch (err) {
            console.error("Failed to set variables:", err);
          }
        }
      }
    }
  };

  // Update Spline text when skill is selected
  useEffect(() => {
    if (!splineApp || !selectedSkill) return;
    try {
      splineApp.setVariable("heading", selectedSkill.label);
      splineApp.setVariable("desc", selectedSkill.shortDescription);
    } catch (err) { /* variables may not exist in scene */ }
  }, [selectedSkill, splineApp]);

  // Handle keyboard text visibility based on theme and section
  useEffect(() => {
    if (!splineApp) return;
    try {
      const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
      const textDesktopLight = splineApp.findObjectByName("text-desktop");
      const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
      const textMobileLight = splineApp.findObjectByName("text-mobile");

      // Hide all by default
      if (textDesktopDark) textDesktopDark.visible = false;
      if (textDesktopLight) textDesktopLight.visible = false;
      if (textMobileDark) textMobileDark.visible = false;
      if (textMobileLight) textMobileLight.visible = false;

      if (activeSection !== "skills") return;

      // Enable the specific text layer for dark mode (which is text-desktop/text-mobile)
      if (!isMobile) {
        if (textDesktopLight) textDesktopLight.visible = true;
      } else {
        if (textMobileLight) textMobileLight.visible = true;
      }
    } catch (e) {
      console.warn("Spline text nodes not found", e);
    }
  }, [splineApp, isMobile, activeSection]);

  // Register Spline event listeners for hover, keyDown, keyUp
  const handleSplineInteractions = () => {
    if (!splineApp) return;

    splineApp.addEventListener("mouseHover", handleMouseHover);

    splineApp.addEventListener("keyDown", (e) => {
      if (!splineApp) return;
      const skill = SKILLS[e.target.name];
      if (skill) {
        setSelectedSkill(skill);
        try {
          splineApp.setVariable("heading", skill.label);
          splineApp.setVariable("desc", skill.shortDescription);
        } catch (err) { }
      }
    });

    splineApp.addEventListener("keyUp", (e) => {
      if (!splineApp) return;
      try {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      } catch (err) { }
    });
  };

  // Initialize GSAP + Spline interactions when app loads
  useEffect(() => {
    if (!splineApp) return;
    handleSplineInteractions();
    handleGsapAnimations();
    setKeycapAnimations(getKeycapsAnimation());
  }, [splineApp]);

  // Keyboard rotation per section
  useEffect(() => {
    let rotateKeyboard;
    let teardownKeyboard;

    (async () => {
      if (!splineApp) return;
      const kbd = splineApp.findObjectByName("keyboard");
      if (!kbd) return;

      // Continuous rotation in hero
      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
      });

      // Teardown rotation for contact
      teardownKeyboard = gsap.fromTo(
        kbd.rotation,
        { y: 0, x: -Math.PI, z: 0 },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          delay: 2.5,
          immediateRender: false,
          paused: true,
        }
      );

      if (activeSection === "hero") {
        rotateKeyboard.restart();
        teardownKeyboard.pause();
      } else if (activeSection === "contact") {
        rotateKeyboard.pause();
      } else if (activeSection === "skills") {
        rotateKeyboard.pause();
      } else {
        rotateKeyboard.pause();
        teardownKeyboard.pause();
      }

      // Clear text when not in skills section
      if (activeSection !== "skills") {
        try {
          splineApp.setVariable("heading", "");
          splineApp.setVariable("desc", "");
        } catch (err) { }
      }

      // Contact section keycap float
      if (activeSection === "contact") {
        await sleep(600);
        teardownKeyboard.restart();
        keycapAnimations?.start();
      } else {
        await sleep(600);
        teardownKeyboard.pause();
        keycapAnimations?.stop();
      }
    })();

    return () => {
      if (rotateKeyboard) rotateKeyboard.kill();
      if (teardownKeyboard) teardownKeyboard.kill();
    };
  }, [activeSection, splineApp]);

  // Reveal keyboard on load
  useEffect(() => {
    if (!splineApp || !isLoaded || keyboardRevealed) return;
    revealKeyCaps();
  }, [splineApp, isLoaded, activeSection]);

  // Keyboard reveal animation
  const revealKeyCaps = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    kbd.visible = false;
    await sleep(400);
    kbd.visible = true;
    setKeyboardRevealed(true);

    gsap.fromTo(
      kbd.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        x: keyboardStates(activeSection).scale.x,
        y: keyboardStates(activeSection).scale.y,
        z: keyboardStates(activeSection).scale.z,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      }
    );

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");

    await sleep(900);

    if (isMobile) {
      const mobileKeyCaps = allObjects.filter((obj) => obj.name === "keycap-mobile");
      mobileKeyCaps.forEach((keycap) => { keycap.visible = true; });
    } else {
      const desktopKeyCaps = allObjects.filter((obj) => obj.name === "keycap-desktop");
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await sleep(idx * 70);
        keycap.visible = true;
      });
    }

    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await sleep(idx * 70);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" }
      );
    });
  };



  // GSAP ScrollTrigger animations per section
  const handleGsapAnimations = () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd || !splineContainer.current) return;

    // Set initial hero state
    gsap.set(kbd.scale, { ...keyboardStates("hero").scale });
    gsap.set(kbd.position, { ...keyboardStates("hero").position });
    gsap.set(kbd.rotation, { ...keyboardStates("hero").rotation });

    // Skills section
    gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 50%",
        end: "bottom bottom",
        scrub: true,
        onEnter: () => {
          setActiveSection("skills");
          gsap.to(kbd.scale, { ...keyboardStates("skills").scale, duration: 1 });
          gsap.to(kbd.position, { ...keyboardStates("skills").position, duration: 1 });

          // Execute spin entrance animation
          gsap.fromTo(kbd.rotation,
            { x: 0, y: -Math.PI * 2, z: 0 },
            { ...keyboardStates("skills").rotation, duration: 1.5, ease: "power2.out" }
          );
        },
        onLeaveBack: () => {
          setActiveSection("hero");
          gsap.to(kbd.scale, { ...keyboardStates("hero").scale, duration: 1 });
          gsap.to(kbd.position, { ...keyboardStates("hero").position, duration: 1 });
          gsap.to(kbd.rotation, { ...keyboardStates("hero").rotation, duration: 1 });
        },
      },
    });

    // Projects section
    gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top 50%",
        end: "bottom bottom",
        scrub: true,
        onEnter: () => {
          setActiveSection("projects");
          gsap.to(kbd.position, { y: "+=500", ease: "power1.inOut", duration: 1 });
          gsap.to(kbd.scale, { x: 0.001, y: 0.001, z: 0.001, ease: "power1.inOut", duration: 1 });
          gsap.to(kbd.rotation, { x: 0, y: 0, z: 0, ease: "power1.inOut", duration: 1 });
        },
        onLeaveBack: () => {
          setActiveSection("skills");
          gsap.to(kbd.scale, { ...keyboardStates("skills").scale, duration: 1 });
          gsap.to(kbd.position, { ...keyboardStates("skills").position, duration: 1 });

          // Spin back in when scrolling up
          gsap.fromTo(kbd.rotation,
            { x: 0, y: Math.PI * 2, z: 0 },
            { ...keyboardStates("skills").rotation, duration: 1.5, ease: "power2.out" }
          );
        },
      },
    });

    // Contact section
    gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top 30%",
        end: "bottom bottom",
        scrub: true,
        onEnter: () => {
          setActiveSection("contact");
          gsap.to(kbd.position, { ...keyboardStates("contact").position, duration: 1 });
          gsap.to(kbd.scale, { ...keyboardStates("contact").scale, duration: 1 });
          gsap.to(kbd.rotation, { ...keyboardStates("contact").rotation, duration: 1 });
        },
        onLeaveBack: () => {
          setActiveSection("projects");
          gsap.to(kbd.position, { y: "+=500", ease: "power1.inOut", duration: 1 });
          gsap.to(kbd.scale, { x: 0.001, y: 0.001, z: 0.001, ease: "power1.inOut", duration: 1 });
          gsap.to(kbd.rotation, { x: 0, y: 0, z: 0, ease: "power1.inOut", duration: 1 });
        },
      },
    });
  };

  // Keycap floating animation for contact section
  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => { }, stop: () => { } };

    let tweens = [];

    const start = () => {
      removePrevTweens();
      Object.values(SKILLS)
        .sort(() => Math.random() - 0.5)
        .forEach((skill, idx) => {
          const keycap = splineApp.findObjectByName(skill.name);
          if (!keycap) return;
          const t = gsap.to(keycap.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.6,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
          });
          tweens.push(t);
        });
    };

    const stop = () => {
      removePrevTweens();
      Object.values(SKILLS).forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        const t = gsap.to(keycap.position, {
          y: 0,
          duration: 4,
          repeat: 1,
          ease: "elastic.out(1,0.8)",
        });
        tweens.push(t);
      });
      setTimeout(removePrevTweens, 1000);
    };

    const removePrevTweens = () => {
      tweens.forEach((t) => t.kill());
      tweens = [];
    };

    return { start, stop };
  };

  const portalTarget = document.getElementById("spline-root");

  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'auto', // CRITICAL: Ensures WebGL captures hover/click states globally, beneath the UI
    }}>
      <Suspense
        fallback={
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            color: '#00F5D4',
            fontSize: '14px',
          }}>
            Loading 3D Keyboard...
          </div>
        }
      >
        <Spline
          ref={splineContainer}
          onLoad={(app) => {
            setSplineApp(app);
            setIsLoaded(true);
          }}
          scene="/assets/skills-keyboard.spline"
        />
      </Suspense>
    </div>,
    portalTarget
  );
};

export default SplineBackground;
