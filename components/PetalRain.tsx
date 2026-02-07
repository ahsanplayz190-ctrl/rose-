
import React, { useEffect, useState } from 'react';

const COLORS = ['#fee2e2', '#fecaca', '#f9a8d4', '#f472b6', '#fb7185'];
const SHAPES = ['petal-bg', 'heart'];

export const PetalRain: React.FC = () => {
  const [petals, setPetals] = useState<{ id: number; left: string; delay: string; duration: string; size: string; color: string; type: string; rotate: string }[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${8 + Math.random() * 6}s`,
      size: `${12 + Math.random() * 20}px`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      type: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rotate: `${Math.random() * 360}deg`
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal-bg opacity-70"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            backgroundColor: petal.type === 'petal-bg' ? petal.color : 'transparent',
            color: petal.type === 'heart' ? petal.color : 'transparent',
            width: petal.size,
            height: petal.size,
            borderRadius: petal.type === 'petal-bg' ? '50% 0 50% 50%' : '0',
            filter: 'blur(0.5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: petal.size,
            transform: `rotate(${petal.rotate})`
          }}
        >
          {petal.type === 'heart' && '❤'}
        </div>
      ))}
    </div>
  );
};
