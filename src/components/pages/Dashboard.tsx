import Card from '../common/Card';
import WeatherIcon from '../common/WeatherIcon';
import type { WeatherCondition } from '../common/WeatherIcon';
import { WEATHER_GRADIENTS } from '../common/WeatherIcon';

const forecastDays: { day: string; condition: WeatherCondition; high: number; low: number }[] = [
    { day: 'Today', condition: 'sunny', high: 75, low: 62 },
    { day: 'Mon', condition: 'partly_cloudy', high: 72, low: 60 },
    { day: 'Tue', condition: 'rainy', high: 68, low: 58 },
    { day: 'Wed', condition: 'cloudy', high: 65, low: 55 },
    { day: 'Thu', condition: 'sunny', high: 70, low: 59 },
];

const hourlyForecast: { time: string; condition: WeatherCondition; temp: number }[] = [
    { time: '12 PM', condition: 'sunny', temp: 74 },
    { time: '1 PM', condition: 'partly_cloudy', temp: 75 },
    { time: '2 PM', condition: 'cloudy', temp: 73 },
    { time: '3 PM', condition: 'cloudy', temp: 71 },
    { time: '4 PM', condition: 'rainy', temp: 69 },
    { time: '5 PM', condition: 'rainy', temp: 67 },
    { time: '6 PM', condition: 'cloudy', temp: 65 },
];

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-6 pt-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Weather Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Good morning, Sarah! Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-slate-400 text-lg">calendar_today</span>
                    <span>Oct 24, 2023</span>
                </div>
            </div>

            {/* Hero Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Main weather card — gradient style from Stitch */}
                <div className={`xl:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br ${WEATHER_GRADIENTS['sunny']} text-white shadow-xl group`}>
                    <div className="absolute inset-0 bg-white/10 rounded-full w-96 h-96 -top-20 -right-20 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10 p-8 flex flex-col h-full min-h-[280px] justify-between">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined">location_on</span>
                                    <h2 className="text-xl font-bold">San Francisco, CA</h2>
                                </div>
                                <p className="text-white/80 text-sm">Today, 10:23 AM</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Live</div>
                        </div>
                        <div className="flex items-end justify-between mt-6">
                            <div>
                                <div className="text-7xl font-bold tracking-tighter">72°</div>
                                <div className="text-xl font-medium text-white/90 mt-1">Mostly Sunny</div>
                                <div className="flex gap-3 text-sm text-white/70 mt-1">
                                    <span>H: 75°</span><span>L: 62°</span>
                                </div>
                            </div>
                            {/* Stitch-style icon — Material Symbol with glow */}
                            <WeatherIcon condition="sunny" size={96} className="drop-shadow-2xl opacity-90" />
                        </div>
                        <div className="mt-6 grid grid-cols-3 gap-3">
                            {[
                                { icon: 'water_drop', label: 'Humidity', value: '45%' },
                                { icon: 'air', label: 'Wind', value: '12 mph' },
                                { icon: 'visibility', label: 'Visibility', value: '10 mi' },
                            ].map(item => (
                                <div key={item.label} className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                                    <div className="flex items-center gap-1.5 mb-1 text-white/70">
                                        <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
                                        <span className="text-[11px] font-semibold uppercase">{item.label}</span>
                                    </div>
                                    <p className="text-base font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 7-Day Forecast */}
                <Card className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">7-Day Forecast</h3>
                        <button className="text-primary text-sm font-semibold hover:underline">See All</button>
                    </div>
                    <div className="flex-1 flex flex-col justify-between gap-2">
                        {forecastDays.map((item) => (
                            <div key={item.day} className="flex items-center justify-between py-1.5">
                                <span className="text-slate-500 dark:text-slate-400 text-sm w-12">{item.day}</span>
                                <WeatherIcon condition={item.condition} size={32} />
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-semibold text-slate-800 dark:text-slate-100 w-8 text-right">{item.high}°</span>
                                    <span className="text-slate-400 dark:text-slate-500 text-xs w-8 text-right">{item.low}°</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Hourly Forecast */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Hourly Forecast</h3>
                    <div className="flex gap-2">
                        <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-3 overflow-x-auto pb-2 snap-x">
                    {/* Active item */}
                    <div className="snap-start shrink-0 min-w-[80px] p-3 bg-primary text-white rounded-xl flex flex-col items-center gap-2 shadow-lg shadow-primary/30 transform scale-105">
                        <span className="text-xs font-medium opacity-90">Now</span>
                        <span className="material-symbols-outlined text-white" style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1", filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))' }}>wb_sunny</span>
                        <span className="text-lg font-bold">72°</span>
                    </div>
                    {/* Other hours */}
                    {hourlyForecast.map((item) => (
                        <div key={item.time} className="snap-start shrink-0 min-w-[80px] p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl flex flex-col items-center gap-2 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.time}</span>
                            <WeatherIcon condition={item.condition} size={32} />
                            <span className="text-base font-bold text-slate-800 dark:text-slate-100">{item.temp}°</span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Social & Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* OOTD Feed Widget */}
                <Card className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-purple-500">checkroom</span>
                            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Trending OOTD</h3>
                        </div>
                        <span className="text-xs font-medium text-slate-400">San Francisco • Today</span>
                    </div>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-PniRc4wg5efwixqBsVNwXLLDiMnL0_yxwXHgCbD2YeomsMUQAVAja0IKvaHf1ip6QEwHHBsLTbFwVT_iLWvV5eoaMayLc8VdDAskxcLZA00el3AR0p-M6ngwmCE4kCMzyxAvzP2AszfZ-Ik_edMwDw9xtJU-A9OjCqsf9Q9j6HH452pHFxlj9WupslYVnz7I2TGoKq6k8rXh7XpRHJn1P0qcxlJroptRAtv8C84DbziLrRCWFhsPH-nMQiP2coyAWovdUGk1iY7R")' }}
                        ></div>
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                            <div className="flex items-center justify-between text-white">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-cover border-2 border-white" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?u=jessica")' }}></div>
                                    <span className="text-sm font-semibold">@jessica_styles</span>
                                </div>
                                <button className="flex items-center gap-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-2 py-1 rounded-full text-xs transition">
                                    <span className="material-symbols-outlined text-[14px]">favorite</span>
                                    1.2k
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">"Perfect light layers for this sunny SF breeze! ☀️🧥 #OOTD #SanFrancisco"</p>
                </Card>

                {/* UV & Air Quality */}
                <div className="flex flex-col gap-6">
                    <Card className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-orange-500">wb_sunny</span>
                                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">UV Index</h3>
                            </div>
                            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">4</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Moderate</p>
                        </div>
                        <div className="w-24 h-24 relative flex items-center justify-center">
                            <svg className="transform -rotate-90 w-24 h-24">
                                <circle className="text-slate-100 dark:text-slate-800" cx="48" cy="48" fill="transparent" r="36" stroke="currentColor" strokeWidth="8"></circle>
                                <circle className="text-orange-400" cx="48" cy="48" fill="transparent" r="36" stroke="currentColor" strokeDasharray="226" strokeDashoffset="113" strokeLinecap="round" strokeWidth="8"></circle>
                            </svg>
                        </div>
                    </Card>
                    <Card className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-green-500">air_freshener</span>
                                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Air Quality</h3>
                            </div>
                            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">32</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Good (AQI)</p>
                        </div>
                        <div className="w-full max-w-[100px] flex flex-col gap-1">
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-[32%] bg-green-500 rounded-full"></div>
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500 text-right">Updated 5m ago</p>
                        </div>
                    </Card>
                </div>

                {/* Chat Widget */}
                <Card className="flex flex-col h-full min-h-[300px]">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">forum</span>
                            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Local Chat</h3>
                        </div>
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                            SF Hikers
                        </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-4 overflow-y-auto mb-4 pr-1">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                <img src="https://i.pravatar.cc/150?u=mike" alt="Mike" />
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none">
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-0.5">Mike T.</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">Anyone near Lands End? Is it foggy there?</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto relative">
                        <input
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-full py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-primary/20 placeholder-slate-400 text-slate-900 dark:text-slate-100"
                            placeholder="Type a message..."
                            type="text"
                        />
                        <button className="absolute right-1.5 top-1.5 p-1.5 bg-primary text-white rounded-full hover:bg-sky-500 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[18px] block">send</span>
                        </button>
                    </div>
                </Card>
            </div>
        </div >
    );
};

export default Dashboard;
