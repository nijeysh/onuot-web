import React from 'react';
import RainEffect from './RainEffect';
import SnowEffect from './SnowEffect';
import type { WeatherCondition } from '../common/WeatherIcon';
import { useTheme } from '../../contexts/ThemeContext';

interface WeatherBackgroundProps {
    condition: WeatherCondition;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ condition }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    // Get ambient gradient styles based on weather condition and theme
    const getBackgroundStyle = () => {
        if (isDarkMode) {
            switch (condition) {
                case 'sunny':
                    return {
                        background: 'linear-gradient(135deg, #0c0a09 0%, #1c1917 40%, #451a03 100%)',
                        glow: 'radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.25) 0%, transparent 60%)',
                    };
                case 'rainy':
                    return {
                        background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #0c4a6e 100%)',
                        glow: 'radial-gradient(circle at 30% 70%, rgba(56, 189, 248, 0.2) 0%, transparent 65%)',
                    };
                case 'snowy':
                    return {
                        background: 'linear-gradient(135deg, #090d16 0%, #1e293b 50%, #1e3a8a 100%)',
                        glow: 'radial-gradient(circle at 50% 30%, rgba(186, 230, 253, 0.15) 0%, transparent 70%)',
                    };
                case 'stormy':
                case 'cyclone':
                    return {
                        background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)',
                        glow: 'radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.2) 0%, transparent 60%)',
                    };
                case 'cloudy':
                case 'partly_cloudy':
                default:
                    return {
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                        glow: 'radial-gradient(circle at 20% 40%, rgba(148, 163, 184, 0.15) 0%, transparent 60%)',
                    };
            }
        } else {
            // Light Mode
            switch (condition) {
                case 'sunny':
                    return {
                        background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 45%, #fed7aa 100%)',
                        glow: 'radial-gradient(circle at 80% 20%, rgba(251, 146, 60, 0.35) 0%, transparent 65%)',
                    };
                case 'rainy':
                    return {
                        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
                        glow: 'radial-gradient(circle at 30% 70%, rgba(56, 189, 248, 0.3) 0%, transparent 60%)',
                    };
                case 'snowy':
                    return {
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
                        glow: 'radial-gradient(circle at 50% 30%, rgba(148, 163, 184, 0.25) 0%, transparent 60%)',
                    };
                case 'stormy':
                case 'cyclone':
                    return {
                        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)',
                        glow: 'radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.2) 0%, transparent 60%)',
                    };
                case 'cloudy':
                case 'partly_cloudy':
                default:
                    return {
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
                        glow: 'radial-gradient(circle at 20% 40%, rgba(56, 189, 248, 0.2) 0%, transparent 60%)',
                    };
            }
        }
    };

    const style = getBackgroundStyle();

    return (
        <>
            {/* Ambient Gradient Base Layer */}
            <div
                className="fixed inset-0 -z-20 transition-all duration-1000 ease-in-out"
                style={{ background: style.background }}
            />

            {/* Radial Glow Light Overlay Layer */}
            <div
                className="fixed inset-0 -z-15 transition-all duration-1000 ease-in-out pointer-events-none"
                style={{ background: style.glow }}
            />

            {/* Frost/Glass Effect Overlay for legibility */}
            <div
                className={`fixed inset-0 -z-10 transition-all duration-1000 ${
                    isDarkMode ? 'bg-slate-950/20' : 'bg-white/20'
                }`}
            />

            {/* Weather Particles */}
            {condition === 'rainy' && <RainEffect />}
            {condition === 'snowy' && <SnowEffect />}
        </>
    );
};

export default WeatherBackground;

