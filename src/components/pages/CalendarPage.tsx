import Card from '../common/Card';
import WeatherIcon from '../common/WeatherIcon';
import type { WeatherCondition } from '../common/WeatherIcon';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarDay {
    date: number;
    condition: WeatherCondition;
    temp: number;
    event?: { label: string; color: string };
}

const calendarData: CalendarDay[] = Array.from({ length: 31 }, (_, i) => {
    const date = i + 1;
    const conditions: WeatherCondition[] = ['sunny', 'partly_cloudy', 'cloudy', 'rainy', 'stormy'];
    return {
        date,
        condition: conditions[date % conditions.length],
        temp: 65 + (date % 10),
        event:
            date === 24 ? { label: 'OOTD Shooting', color: 'bg-primary/10 text-primary' } :
                date === 15 ? { label: 'SF Hike', color: 'bg-orange-500/10 text-orange-600' } :
                    undefined,
    };
});

const CalendarPage = () => {
    return (
        <div className="flex flex-col gap-6 pt-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading tracking-tight">Weather Calendar</h1>
                    <p className="text-text-secondary mt-1">Plan your outdoor activities with precision.</p>
                </div>
                <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-xl shadow-sm border border-border-light">
                    <button className="p-1 hover:bg-surface-hover rounded-lg">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <span className="font-bold text-text">October 2023</span>
                    <button className="p-1 hover:bg-surface-hover rounded-lg">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>

            <Card padding={false} className="overflow-hidden">
                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-border-light">
                    {days.map(day => (
                        <div key={day} className="py-4 text-center text-xs font-bold uppercase tracking-wider text-text-muted border-r last:border-r-0 border-border-light">
                            {day}
                        </div>
                    ))}
                </div>
                {/* Calendar grid */}
                <div className="grid grid-cols-7">
                    {calendarData.map(({ date, condition, temp, event }) => {
                        const isToday = date === 24;
                        return (
                            <div
                                key={date}
                                className={`min-h-[110px] p-2 border-r border-b last:border-r-0 border-border-light transition-colors hover:bg-surface-hover cursor-pointer ${isToday ? 'bg-primary/5' : ''}`}
                            >
                                {/* Date number */}
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-sm font-bold flex items-center justify-center w-7 h-7 rounded-full ${isToday ? 'bg-primary text-white' : 'text-text-secondary'}`}>
                                        {date}
                                    </span>
                                    {/* Stitch weather icon */}
                                    <div className="flex flex-col items-center">
                                        <WeatherIcon condition={condition} size={24} />
                                        <span className="text-[10px] font-bold text-text-muted -mt-1">{temp}°</span>
                                    </div>
                                </div>
                                {/* Event pill */}
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
        </div>
    );
};

export default CalendarPage;
