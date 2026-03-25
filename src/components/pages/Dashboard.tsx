import Card from '../common/Card';
import WeatherIcon from '../common/WeatherIcon';
import type { WeatherCondition } from '../common/WeatherIcon';

const forecastDays: { day: string; condition: WeatherCondition; high: number; low: number }[] = [
    { day: 'Today', condition: 'sunny', high: 75, low: 62 },
    { day: 'Mon', condition: 'partly_cloudy', high: 72, low: 60 },
    { day: 'Tue', condition: 'rainy', high: 68, low: 58 },
    { day: 'Wed', condition: 'cloudy', high: 65, low: 55 },
    { day: 'Thu', condition: 'sunny', high: 70, low: 59 },
];

import WeatherBackground from '../effects/WeatherBackground';
import { useState } from 'react';

const Dashboard = () => {
    // Current condition state for demonstration
    const [currentCondition, setCurrentCondition] = useState<WeatherCondition>('rainy');
    const toggleCondition = () => {
        const conditions: WeatherCondition[] = ['sunny', 'partly_cloudy', 'cloudy', 'rainy', 'stormy', 'snowy', 'cyclone'];
        const nextIndex = (conditions.indexOf(currentCondition) + 1) % conditions.length;
        setCurrentCondition(conditions[nextIndex]);
    };

    return (
        <div className="flex flex-col gap-6 pt-4 relative">
            <WeatherBackground condition={currentCondition} />

            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Weather Dashboard</h1>
                    <p className="opacity-80 mt-1">Good morning, Sarah! Let's check the weather.</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Demo button to toggle weather effect */}
                    <button
                        onClick={toggleCondition}
                        className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors"
                    >
                        Toggle Weather: {currentCondition.toUpperCase()}
                    </button>

                    <div className="flex items-center gap-2 text-sm font-medium bg-badge-bg backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-white/10">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        <span>Oct 24, 2023</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Main weather card — glass style */}
                <div className="xl:col-span-2 relative overflow-hidden rounded-2xl bg-surface-glass-2 backdrop-blur-xl border border-border-glass text-text shadow-xl group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
                    <div className="relative z-10 p-8 flex flex-col h-full min-h-[360px] justify-between">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-[20px] text-primary">location_on</span>
                                    <span className="text-sm font-bold tracking-wider uppercase text-text-secondary">Current Location</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black leading-tight drop-shadow-sm">Tokyo, Japan</h2>
                                <p className="text-lg text-text-secondary mt-2">Monday, 14 Oct</p>
                            </div>
                            <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg shadow-primary/30">Live</div>
                        </div>
                        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mt-10">
                            <div className="flex flex-col">
                                <span className="text-8xl md:text-9xl font-black tracking-tighter leading-none drop-shadow-sm">
                                    {currentCondition === 'snowy' ? '-2°' : '18°'}
                                </span>
                                <span className="text-2xl font-medium text-text-secondary mt-2 hover:opacity-100 transition-opacity">
                                    {currentCondition === 'rainy' ? 'Heavy Rain' : currentCondition === 'snowy' ? 'Heavy Snow' : 'Mostly Sunny'}
                                </span>
                            </div>
                            <WeatherIcon condition={currentCondition} size={96} className="drop-shadow-md opacity-90 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="flex flex-col gap-4">
                    {[
                        { icon: 'thermostat', label: 'Feels Like', value: '16°C', colorClass: 'text-blue-500', bgClass: 'bg-blue-500/10' },
                        { icon: 'humidity_percentage', label: 'Humidity', value: '88%', colorClass: 'text-indigo-500', bgClass: 'bg-indigo-500/10' },
                        { icon: 'air', label: 'Wind Speed', value: '22 km/h', colorClass: 'text-cyan-500', bgClass: 'bg-cyan-500/10' },
                    ].map(item => (
                        <Card key={item.label} variant="glass" className="flex-1 overflow-visible !p-6 flex items-center justify-start sm:flex-row flex-col gap-4 hover:shadow-lg transition-all border-l-4 border-l-transparent hover:border-l-primary cursor-pointer group">
                            <div className={`w-12 h-12 rounded-full ${item.bgClass} flex items-center justify-center shrink-0`}>
                                <span className={`material-symbols-outlined text-[28px] ${item.colorClass}`}>{item.icon}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">{item.label}</span>
                                <span className="text-2xl font-bold text-text-heading">{item.value}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* 7-Day Forecast Strip */}
            <Card variant="glass">
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-border-light">
                    <h3 className="text-xl font-bold text-text-heading">7-Day Forecast</h3>
                    <button className="text-primary hover:text-white hover:bg-primary px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 transition-colors">
                        View Full Report
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-4">
                    {forecastDays.map((item) => (
                        <div key={item.day} className="flex flex-col items-center p-4 rounded-xl bg-surface-alt border border-border-light hover:bg-surface-hover transition-all cursor-pointer group shadow-sm">
                            <span className="font-semibold text-text-muted mb-3">{item.day}</span>
                            <div className="mb-3 transform group-hover:scale-110 transition-transform">
                                <WeatherIcon condition={item.condition} size={36} />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-extrabold text-lg text-text-heading">{item.high}°</span>
                                <span className="text-xs text-text-muted font-medium">{item.low}°</span>
                            </div>
                        </div>
                    ))}
                    {/* Filler items for the grid to look full */}
                    <div className="flex flex-col items-center p-4 rounded-xl bg-surface-alt border border-border-light hover:bg-surface-hover transition-all cursor-pointer group shadow-sm sm:hidden md:flex xl:flex">
                        <span className="font-semibold text-text-muted mb-3">Fri</span>
                        <div className="mb-3 transform group-hover:scale-110 transition-transform"><WeatherIcon condition={'sunny'} size={36} /></div>
                        <div className="flex flex-col items-center"><span className="font-extrabold text-lg text-text-heading">73°</span><span className="text-xs text-text-muted font-medium">60°</span></div>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-xl bg-surface-alt border border-border-light hover:bg-surface-hover transition-all cursor-pointer group shadow-sm hidden xl:flex">
                        <span className="font-semibold text-text-muted mb-3">Sat</span>
                        <div className="mb-3 transform group-hover:scale-110 transition-transform"><WeatherIcon condition={'sunny'} size={36} /></div>
                        <div className="flex flex-col items-center"><span className="font-extrabold text-lg text-text-heading">75°</span><span className="text-xs text-text-muted font-medium">62°</span></div>
                    </div>
                </div>
            </Card>

            {/* Air Quality & UV Index Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                <Card variant="glass" className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-text-heading flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-500">masks</span> Air Quality
                        </h3>
                        <span className="bg-green-500/10 text-green-600 border border-green-500/20 text-xs font-bold px-3 py-1 rounded-full shadow-inner">Excellent</span>
                    </div>
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-4xl font-extrabold text-text-heading">18</span>
                            <span className="text-text-muted text-sm font-semibold uppercase tracking-wider">AQI</span>
                        </div>
                        <div className="h-3 w-full bg-bar-bg rounded-full overflow-hidden shadow-inner border border-bar-border">
                            <div className="h-full bg-gradient-to-r from-green-400 to-green-500 w-[18%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
                        </div>
                    </div>
                </Card>
                <Card variant="glass" className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-text-heading flex items-center gap-2">
                            <span className="material-symbols-outlined text-orange-500">wb_sunny</span> UV Index
                        </h3>
                        <span className="bg-orange-500/10 text-orange-600 border border-orange-500/20 text-xs font-bold px-3 py-1 rounded-full shadow-inner">Moderate</span>
                    </div>
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-4xl font-extrabold text-text-heading">4</span>
                            <span className="text-text-muted text-sm font-semibold uppercase tracking-wider">UV</span>
                        </div>
                        <div className="h-3 w-full bg-bar-bg rounded-full overflow-hidden shadow-inner border border-bar-border">
                            <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 w-[40%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]"></div>
                        </div>
                    </div>
                </Card>
            </div>
        </div >
    );
};

export default Dashboard;
