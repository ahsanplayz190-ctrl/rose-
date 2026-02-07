
import React from 'react';

export const CssRose: React.FC = () => {
  return (
    <div className="rose-wrapper">
      <div className="rose">
        <div className="rose-flower">
          <div className="rose-petal"></div>
          <div className="rose-petal"></div>
          <div className="rose-petal"></div>
          <div className="rose-petal"></div>
          <div className="rose-petal"></div>
          <div className="rose-petal"></div>
          <div className="rose-petal"></div>
          <div className="rose-petal"></div>
        </div>
        <div className="rose-stem"></div>
        <div className="rose-leaf left"></div>
        <div className="rose-leaf right"></div>
      </div>
    </div>
  );
};
