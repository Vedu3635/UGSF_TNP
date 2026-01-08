// import React from "react";

// const LoadingPage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       {/* Simple Loading Spinner */}
//       <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-8"></div>

//       {/* Loading Text */}
//       <h2 className="text-xl font-medium text-gray-700">Loading...</h2>
//     </div>
//   );
// };

// export default LoadingPage;

import React, { useEffect, useState } from "react";

const LoadingPage = ({ onLoadComplete, minDisplayTime = 2500 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Instead of adding a class to prevent scrolling, we can use inline styles
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 400);

    // Ensure minimum display time and then trigger completion
    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);

      // Small delay after reaching 100% before calling onLoadComplete
      setTimeout(() => {
        document.body.style.overflow = originalStyle;
        if (onLoadComplete) onLoadComplete();
      }, 500);
    }, minDisplayTime);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = originalStyle;
    };
  }, [onLoadComplete, minDisplayTime]);

  // Animation keyframes defined as inline styles
  const fadeInUpStyle = {
    animation: `0.6s cubic-bezier(0.22, 1, 0.36, 1) ${
      progress > 0 ? "slideIn" : "none"
    }`,
    opacity: progress > 0 ? 1 : 0,
    transform: progress > 0 ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.6s, transform 0.6s",
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="w-full max-w-lg px-8">
        <div className="flex flex-col items-center">
          <div className="mb-8" style={fadeInUpStyle}>
            <div className="inline-block relative">
              <div className="animate-spin h-16 w-16 relative">
                <div className="absolute inset-0 rounded-full border-4 border-primary opacity-20"></div>
                <div
                  className="absolute inset-0 rounded-full border-4 border-l-primary border-t-primary border-r-transparent border-b-transparent"
                  style={{
                    transform: `rotate(${progress * 3.6}deg)`,
                    transition: "transform 0.3s ease-out",
                  }}
                ></div>
              </div>
              <div
                className="absolute top-1/2 left-1/2 text-primary"
                style={{
                  opacity: progress < 95 ? 0 : 1,
                  transform: `translate(-50%, -50%) scale(${
                    progress < 95 ? 0.8 : 1
                  })`,
                  transition: "opacity 0.5s, transform 0.5s",
                  transitionDelay: "0.3s",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: "30",
                      strokeDashoffset: progress < 95 ? "30" : "0",
                      transition: "stroke-dashoffset 0.5s ease-in-out",
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1
            className="text-3xl font-light tracking-tight mb-3"
            style={{
              ...fadeInUpStyle,
              transitionDelay: "0.2s",
            }}
          >
            <span className="font-semibold">Career</span>Marg
          </h1>

          <div
            className="w-full max-w-md mb-5"
            style={{
              ...fadeInUpStyle,
              transitionDelay: "0.4s",
            }}
          >
            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{
                  width: `${progress}%`,
                  transition: "width 0.3s ease-out",
                }}
              />
            </div>
          </div>

          <p
            className="text-sm text-muted-foreground"
            style={{
              opacity: progress > 30 ? 0.7 : 0,
              transition: "opacity 0.6s",
              transitionDelay: "0.6s",
            }}
          >
            {progress < 100 ? "Loading your dashboard..." : "Ready to explore"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
