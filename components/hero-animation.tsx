'use client'

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const HeroAnimation = () => {
  return (
    <DotLottieReact
      src="/animations/code.lottie"
      loop
      autoplay
      className="w-full h-full"
    />
  );
};

export default HeroAnimation