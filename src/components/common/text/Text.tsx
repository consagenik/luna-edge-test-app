import React from 'react';

import './Text.scss';

interface TextProps {
  text: string
  centered?: boolean
}

export default function Text({text, centered = false}: TextProps) {
  return (
    <p className={centered ? "text centered" : "text"}>{text}</p>
  );
}
