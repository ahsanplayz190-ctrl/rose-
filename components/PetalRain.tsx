
import React, { useEffect, useState } from 'react';

const COLORS = ['#fee2e2', '#fecaca', '#f9a8d4', '#f472b6', '#fb7185'];

export const PetalRain: React.FC = () => {
  const [petals, setPetals] = useState<{ id: number; left: string; delay: string; duration: string; size: string; color: string }[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${6 + Math.random() * 4}s`,
      size: `${15 + Math.random() * 15}px`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            backgroundColor: petal.color,
            width: petal.size,
            height: petal.size,
            borderRadius: '50% 0 50% 50%',
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
};
