import React from 'react';
import { motion } from 'framer-motion';

const GeometricBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ perspective: '1000px' }}>
      <motion.div
        className="absolute w-[200%] h-[200%] left-[-50%] top-[-50%]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(230, 228, 217, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(230, 228, 217, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          rotateX: [60, 60],
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 150,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      {/* Vignette effect to fade out the edges and focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#101311_70%)]" />
    </div>
  );
};

export default GeometricBackground;
