
import React from 'react';

export const PaperPlane: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes travel {
          0% { transform: translate(-100px, 100vh) rotate(45deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(110vw, -100px) rotate(45deg); opacity: 0; }
        }
        .paper-plane {
          position: absolute;
          animation: travel 12s linear infinite;
          font-size: 24px;
        }
        .paper-plane:nth-child(2) {
          animation-delay: 6s;
          animation-duration: 15s;
        }
      `}</style>
      <div className="paper-plane">✈️</div>
      <div className="paper-plane" style={{ top: '20%' }}>📩</div>
    </div>
  );
};
