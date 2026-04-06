import React from 'react';

export const BackgroundOrbs: React.FC = () => {
  return (
    <>
      <div className="absolute rounded-full blur-[80px] z-0 opacity-15 pointer-events-none w-[400px] h-[400px] bg-accent-neon top-[-100px] right-[20%]" />
      <div className="absolute rounded-full blur-[80px] z-0 opacity-15 pointer-events-none w-[300px] h-[300px] bg-[#0F172A] bottom-[-50px] right-[5%]" />
    </>
  );
};
