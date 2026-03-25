import React from 'react';

const RainEffect: React.FC = () => {
    // Generate an array of random positions and delays for the rain drops
    const drops = Array.from({ length: 40 }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        duration: `${0.7 + Math.random() * 0.6}s`,
        delay: `${Math.random() * 2}s`,
        id: i
    }));

    return (
        <div className="rain">
            {drops.map((drop) => (
                <div
                    key={drop.id}
                    className="rain-drop"
                    style={{
                        left: drop.left,
                        animationDuration: drop.duration,
                        animationDelay: drop.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default RainEffect;
