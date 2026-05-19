import { useEffect, useMemo, useState } from 'react';
import Card from '../common/Card';
import WeatherIcon from '../common/WeatherIcon';
import { getCalendarWeather, type CalendarWeatherDay } from '../../services/calendarWeatherApi';
import { SEOUL_COORDS } from '../../services/weatherApi';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TODAY_LABEL = '\uC624\uB298';

interface CalendarDay {
    date: number;
    dateKey: string;
    weather: CalendarWeatherDay | null;
    event?: { label: string; color: string };
}

const formatDateKey = (year: number, month: number, day: number) => (
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
);

const createCalendarData = (
    year: number,
    month: number,
    weatherByDate: Map<string, CalendarWeatherDay>,
): CalendarDay[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
        const date = i + 1;
        const dateKey = formatDateKey(year, month, date);
        return {
            date,
            dateKey,
            weather: weatherByDate.get(dateKey) ?? null,
            event:
                date === 24 ? { label: 'OOTD Shooting', color: 'bg-primary/10 text-primary' } :
                    date === 15 ? { label: 'SF Hike', color: 'bg-orange-500/10 text-orange-600' } :
                        undefined,
        };
    });
};

const formatMonthTitle = (date: Date) => (
    new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long' }).format(date)
);

const formatTodayLabel = (date: Date) => (
    new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' }).format(date)
);

const formatTemp = (value: number | null) => (
    value == null ? '--' : `${Math.round(value)}`
);

const CalendarPage = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const firstDayOffset = new Date(currentYear, currentMonth, 1).getDay();
    const [weatherDays, setWeatherDays] = useState<CalendarWeatherDay[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadCalendarWeather = async () => {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                const data = await getCalendarWeather(
                    currentYear,
                    currentMonth + 1,
                    SEOUL_COORDS.latitude,
                    SEOUL_COORDS.longitude,
                );

                if (isMounted) {
                    setWeatherDays(data.days);
                }
            } catch {
                if (isMounted) {
                    setWeatherDays([]);
                    setErrorMessage('Calendar weather is unavailable.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadCalendarWeather();

        return () => {
            isMounted = false;
        };
    }, [currentMonth, currentYear]);

    const weatherByDate = useMemo(
        () => new Map(weatherDays.map((day) => [day.date, day])),
        [weatherDays],
    );
    const calendarData = createCalendarData(currentYear, currentMonth, weatherByDate);

    return (
        <div className="flex flex-col gap-6 pt-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading tracking-tight">Weather Calendar</h1>
                    <p className="text-text-secondary mt-1">{TODAY_LABEL} {formatTodayLabel(today)}</p>
                </div>
                <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-xl shadow-sm border border-border-light">
                    <button className="p-1 hover:bg-surface-hover rounded-lg">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <span className="font-bold text-text">{formatMonthTitle(today)}</span>
                    <button className="p-1 hover:bg-surface-hover rounded-lg">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>

            <Card padding={false} className="overflow-hidden">
                <div className="grid grid-cols-7 border-b border-border-light">
                    {days.map(day => (
                        <div key={day} className="py-4 text-center text-xs font-bold uppercase tracking-wider text-text-muted border-r last:border-r-0 border-border-light">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7">
                    {Array.from({ length: firstDayOffset }, (_, index) => (
                        <div
                            key={`empty-${index}`}
                            className="min-h-[110px] border-r border-b border-border-light bg-surface-alt/40"
                        />
                    ))}
                    {calendarData.map(({ date, dateKey, weather, event }) => {
                        const isToday = date === today.getDate();
                        return (
                            <div
                                key={dateKey}
                                className={`min-h-[110px] p-2 border-r border-b border-border-light transition-colors hover:bg-surface-hover cursor-pointer ${isToday ? 'bg-primary/5' : ''}`}
                            >
                                <div className="flex items-center justify-between mb-1 gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <span className={`text-sm font-bold flex items-center justify-center w-7 h-7 rounded-full ${isToday ? 'bg-primary text-white' : 'text-text-secondary'}`}>
                                            {date}
                                        </span>
                                        {isToday && (
                                            <span className="text-[10px] font-bold text-primary">{TODAY_LABEL}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center min-w-7">
                                        {weather?.condition ? (
                                            <WeatherIcon condition={weather.condition} size={24} />
                                        ) : (
                                            <span className="h-6 text-xs font-bold text-text-muted flex items-center">
                                                {isLoading ? '...' : '--'}
                                            </span>
                                        )}
                                        <span className="text-[10px] font-bold text-text-muted -mt-1">
                                            {formatTemp(weather?.maxTemp ?? null)}&#176;
                                        </span>
                                    </div>
                                </div>
                                {event && (
                                    <div className={`mt-1 px-1.5 py-1 rounded-lg text-[10px] font-bold truncate ${event.color}`}>
                                        {event.label}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Card>
            {errorMessage && (
                <p className="text-sm font-medium text-red-500">{errorMessage}</p>
            )}
        </div>
    );
};

export default CalendarPage;
