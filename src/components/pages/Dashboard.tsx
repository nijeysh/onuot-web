import { useEffect, useState } from 'react';
import Card from '../common/Card';
import WeatherIcon from '../common/WeatherIcon';
import WeatherBackground from '../effects/WeatherBackground';
import { getWeatherData, SEOUL_COORDS } from '../../services/weatherApi';
import type { WeatherData } from '../../types/weather';

const formatDate = (dateText?: string) => {
    const date = dateText ? new Date(dateText) : new Date();
    const value = Number.isNaN(date.getTime()) ? new Date() : date;
    return value.toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });
};

const formatUpdatedAt = (dateText?: string) => {
    if (!dateText) return '';
    const date = new Date(dateText);
    if (Number.isNaN(date.getTime())) return dateText;
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
};

const round = (value: number) => Math.round(value);

const Dashboard = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchWeather = async (latitude: number, longitude: number) => {
            try {
                const data = await getWeatherData(latitude, longitude);
                if (!isMounted) return;
                setWeather(data);
                setErrorMessage(null);
            } catch (error) {
                if (!isMounted) return;
                setErrorMessage(error instanceof Error ? error.message : '날씨 정보를 불러오지 못했습니다.');
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        if (!navigator.geolocation) {
            fetchWeather(SEOUL_COORDS.latitude, SEOUL_COORDS.longitude);
            return () => {
                isMounted = false;
            };
        }

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => fetchWeather(coords.latitude, coords.longitude),
            () => fetchWeather(SEOUL_COORDS.latitude, SEOUL_COORDS.longitude),
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 600000 },
        );

        return () => {
            isMounted = false;
        };
    }, []);

    const currentCondition = weather?.current.condition ?? 'cloudy';
    const locationLabel = weather
        ? [weather.location.city, weather.location.district].filter(Boolean).join(' ')
        : '현재 위치';
    const metrics = weather
        ? [
            { icon: 'thermostat', label: '체감온도', value: `${round(weather.current.feelsLike)}°C`, colorClass: 'text-blue-500', bgClass: 'bg-blue-500/10' },
            { icon: 'humidity_percentage', label: '습도', value: `${weather.current.humidity}%`, colorClass: 'text-indigo-500', bgClass: 'bg-indigo-500/10' },
            { icon: 'air', label: '바람', value: `${weather.current.windSpeed.toFixed(1)} m/s`, colorClass: 'text-cyan-500', bgClass: 'bg-cyan-500/10' },
        ]
        : [
            { icon: 'thermostat', label: '체감온도', value: '--°C', colorClass: 'text-blue-500', bgClass: 'bg-blue-500/10' },
            { icon: 'humidity_percentage', label: '습도', value: '--%', colorClass: 'text-indigo-500', bgClass: 'bg-indigo-500/10' },
            { icon: 'air', label: '바람', value: '-- m/s', colorClass: 'text-cyan-500', bgClass: 'bg-cyan-500/10' },
        ];

    return (
        <div className="flex flex-col gap-6 pt-4 relative">
            <WeatherBackground condition={currentCondition} />

            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Weather Dashboard</h1>
                    <p className="opacity-80 mt-1">기상청 API 기준 현재 날씨입니다.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium bg-badge-bg backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-white/10">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        <span>{formatDate(weather?.updatedAt)}</span>
                    </div>
                </div>
            </div>

            {errorMessage && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600">
                    {errorMessage}
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 relative overflow-hidden rounded-2xl bg-surface-glass-2 backdrop-blur-xl border border-border-glass text-text shadow-xl group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
                    <div className="relative z-10 p-8 flex flex-col h-full min-h-[360px] justify-between">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-[20px] text-primary">location_on</span>
                                    <span className="text-sm font-bold tracking-wider uppercase text-text-secondary">Current Location</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black leading-tight drop-shadow-sm">{isLoading ? '불러오는 중' : locationLabel}</h2>
                                <p className="text-lg text-text-secondary mt-2">
                                    {weather ? `업데이트 ${formatUpdatedAt(weather.updatedAt)}` : '기상청 데이터를 요청하고 있습니다.'}
                                </p>
                            </div>
                            <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg shadow-primary/30">Live</div>
                        </div>
                        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mt-10">
                            <div className="flex flex-col">
                                <span className="text-8xl md:text-9xl font-black tracking-tighter leading-none drop-shadow-sm">
                                    {weather ? `${round(weather.current.temperature)}°` : '--°'}
                                </span>
                                <span className="text-2xl font-medium text-text-secondary mt-2 hover:opacity-100 transition-opacity">
                                    {weather?.current.description ?? '날씨 정보 확인 중'}
                                </span>
                            </div>
                            <WeatherIcon condition={currentCondition} size={96} className="drop-shadow-md opacity-90 animate-pulse" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {metrics.map(item => (
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

            <Card variant="glass">
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-border-light">
                    <h3 className="text-xl font-bold text-text-heading">7-Day Forecast</h3>
                    <button className="text-primary hover:text-white hover:bg-primary px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 transition-colors">
                        View Full Report
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-4">
                    {(weather?.daily ?? []).slice(0, 7).map((item) => (
                        <div key={item.date} className="flex flex-col items-center p-4 rounded-xl bg-surface-alt border border-border-light hover:bg-surface-hover transition-all cursor-pointer group shadow-sm">
                            <span className="font-semibold text-text-muted mb-3">{item.dayOfWeek}</span>
                            <div className="mb-3 transform group-hover:scale-110 transition-transform">
                                <WeatherIcon condition={item.condition} size={36} />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-extrabold text-lg text-text-heading">{round(item.maxTemp)}°</span>
                                <span className="text-xs text-text-muted font-medium">{round(item.minTemp)}°</span>
                            </div>
                        </div>
                    ))}
                    {!weather && Array.from({ length: 5 }, (_, index) => (
                        <div key={index} className="flex flex-col items-center p-4 rounded-xl bg-surface-alt border border-border-light shadow-sm">
                            <span className="font-semibold text-text-muted mb-3">--</span>
                            <WeatherIcon condition="cloudy" size={36} />
                            <div className="flex flex-col items-center mt-3">
                                <span className="font-extrabold text-lg text-text-heading">--°</span>
                                <span className="text-xs text-text-muted font-medium">--°</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                <Card variant="glass" className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-text-heading flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-500">masks</span> Air Quality
                        </h3>
                        <span className="bg-green-500/10 text-green-600 border border-green-500/20 text-xs font-bold px-3 py-1 rounded-full shadow-inner">{weather?.current.pm10 == null ? '정보 없음' : '측정값'}</span>
                    </div>
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-4xl font-extrabold text-text-heading">{weather?.current.pm10 ?? '--'}</span>
                            <span className="text-text-muted text-sm font-semibold uppercase tracking-wider">PM10</span>
                        </div>
                        <div className="h-3 w-full bg-bar-bg rounded-full overflow-hidden shadow-inner border border-bar-border">
                            <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]" style={{ width: `${Math.min(weather?.current.pm10 ?? 0, 100)}%` }}></div>
                        </div>
                    </div>
                </Card>
                <Card variant="glass" className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-text-heading flex items-center gap-2">
                            <span className="material-symbols-outlined text-orange-500">wb_sunny</span> UV Index
                        </h3>
                        <span className="bg-orange-500/10 text-orange-600 border border-orange-500/20 text-xs font-bold px-3 py-1 rounded-full shadow-inner">{weather?.current.uvIndex == null ? '정보 없음' : '측정값'}</span>
                    </div>
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-4xl font-extrabold text-text-heading">{weather?.current.uvIndex ?? '--'}</span>
                            <span className="text-text-muted text-sm font-semibold uppercase tracking-wider">UV</span>
                        </div>
                        <div className="h-3 w-full bg-bar-bg rounded-full overflow-hidden shadow-inner border border-bar-border">
                            <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]" style={{ width: `${Math.min((weather?.current.uvIndex ?? 0) * 10, 100)}%` }}></div>
                        </div>
                    </div>
                </Card>
            </div>
        </div >
    );
};

export default Dashboard;
