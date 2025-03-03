import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import "./App.css";

export default function App() {
  const [surprise, setSurprise] = useState("🎁 Click the button for a surprise!");
  const [bgEffect, setBgEffect] = useState("default");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const effectStyles = {
    default: "text-white",
    neon: "text-yellow-300 font-bold",
    gradient: "text-purple-800 font-extrabold",
    movingShapes: "text-green-300 font-bold",
  };

  const surprises = [
    {
      type: "github",
      content: "🐱 Check out my GitHub! Where code comes to life...",
      effect: () => {
        // GitHub-themed confetti with dark colors
        confetti({
          particleCount: 100,
          spread: 70,
          colors: ['#2b3137', '#ffffff', '#6cc644'],
          origin: { y: 0.6 }
        });
        // Short delay before opening GitHub
        setTimeout(() => {
          window.open('https://github.com/ajayjawade06', '_blank');
        }, 800);
      }
    },
    {
      type: "portfolio",
      content: "✨ Discover my portfolio! Showcasing my creative journey...",
      effect: () => {
        // Portfolio-themed confetti with purple and gold colors
        confetti({
          particleCount: 120,
          spread: 70,
          colors: ['#9b59b6', '#f1c40f', '#ffffff'],
          origin: { y: 0.6 }
        });
        // Short delay before opening portfolio
        setTimeout(() => {
          window.open('https://ajayjawade-portfolio.vercel.app/', '_blank');
        }, 800);
      }
    },
    {
      type: "linkedin",
      content: "🌟 Let's connect on LinkedIn! Redirecting to my profile...",
      effect: () => {
        // Professional LinkedIn-themed confetti
        confetti({
          particleCount: 100,
          spread: 70,
          colors: ['#0077B5', '#ffffff', '#00a0dc'],
          origin: { y: 0.6 }
        });
        // Short delay before opening LinkedIn
        setTimeout(() => {
          window.open('https://www.linkedin.com/in/ajujawade/', '_blank');
        }, 800);
      }
    },
    { 
      type: "text", 
      content: "🎉 TADA! You found a magical surprise!",
      effect: () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    },
    { 
      type: "text", 
      content: "🌈 You've unleashed a rainbow of possibilities!",
      effect: () => setBgEffect("gradient")
    },
    { 
      type: "text", 
      content: "🚀 3... 2... 1... BLAST OFF! To infinity and beyond!",
      effect: () => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }
    },
    {
      type: "effect",
      content: "✨ The colors are dancing just for you!",
      effect: () => setBgEffect("neon")
    },
    {
      type: "effect",
      content: "🎨 Watch the shapes come alive!",
      effect: () => setBgEffect("movingShapes")
    },
    {
      type: "confetti",
      content: "🎊 BOOM! Confetti party time!",
      effect: () => {
        const end = Date.now() + 1000;
        const colors = ['#ff0000', '#00ff00', '#0000ff'];
        
        (function frame() {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });
        
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      }
    },
  ];

  const triggerSurprise = () => {
    setIsButtonDisabled(true);
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    
    setSurprise(randomSurprise.content);
    if (randomSurprise.type === "linkedin") {
      setBgEffect("neon");  // Special background effect for LinkedIn
    } else if (randomSurprise.type === "portfolio") {
      setBgEffect("gradient");  // Special background effect for portfolio
    } else if (randomSurprise.type === "github") {
      setBgEffect("movingShapes");  // Special background effect for GitHub
    }
    if (randomSurprise.effect) {
      randomSurprise.effect();
    }

    // Re-enable button after animation
    setTimeout(() => setIsButtonDisabled(false), 1000);
  };

  // Reset background effect after 5 seconds
  useEffect(() => {
    if (bgEffect !== "default") {
      const timer = setTimeout(() => setBgEffect("default"), 5000);
      return () => clearTimeout(timer);
    }
  }, [bgEffect]);

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center p-4 transition-all duration-500 ${bgEffect}`}>
      <div className="star-layer-1"></div>
      <div className="star-layer-2"></div>
      <div className="star-layer-3"></div>
      <AnimatePresence mode="wait">
        <motion.h1
          key={surprise}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-8 text-center message-animate ${effectStyles[bgEffect]}`}
        >
          {surprise}
        </motion.h1>
      </AnimatePresence>

      <motion.button
        onClick={triggerSurprise}
        disabled={isButtonDisabled}
        className={`surprise-button px-6 py-3 text-lg md:text-xl bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 active:bg-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center gap-2">
          <span>Surprise Me</span>
          <span className="text-2xl">🎁</span>
        </span>
      </motion.button>
    </div>
  );
}