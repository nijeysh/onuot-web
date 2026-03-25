import React from 'react';

const SnowEffect: React.FC = () => {
    const flakes = ['❅', '❆', '❅', '❆', '❅', '❆', '❅', '❆', '❅', '❆', '❅', '❆'];
    
    // Generate an array with random attributes for each snowflake
    const snowflakes = flakes.map((char, i) => ({
        char,
        left: `${Math.random() * 100}%`,
        fallDuration: `${8 + Math.random() * 5}s`,
        shakeDuration: `${2.5 + Math.random() * 1.5}s`,
        fallDelay: `${Math.random() * 3}s`,
        shakeDelay: `${Math.random() * 2}s`,
        size: `${0.8 + Math.random() * 0.8}em`,
        id: i
    }));

    return (
        <div className="snowflakes" aria-hidden="true">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: flake.left,
                        fontSize: flake.size,
                        animationDelay: `${flake.fallDelay}, ${flake.shakeDelay}`,
                        animationDuration: `${flake.fallDuration}, ${flake.shakeDuration}`,
                    }}
                >
                    {flake.char}
                </div>
            ))}
        </div>
    );
};

export default SnowEffect;
