/**
 * WeatherIcon — Stitch Weather Condition UI Library
 *
 * Uses Material Symbols Outlined with condition-specific colors and glow effects,
 * matching the exact design pattern from the Stitch screens.
 *
 * Icon map (from Stitch HTML):
 *   sunny        → wb_sunny      (amber-500, glow)
 *   partly_cloudy → wb_cloudy    (amber + slate)
 *   cloudy       → cloud         (slate-400)
 *   rainy        → rainy         (blue-500)
 *   snowy        → ac_unit       (cyan-400)
 *   stormy       → thunderstorm  (slate-700 / yellow glow dark)
 *   foggy        → foggy         (slate-300)
 *   cyclone      → cyclone       (teal-500)
 */

export type WeatherCondition =
  | 'sunny'
  | 'partly_cloudy'
  | 'cloudy'
  | 'rainy'
  | 'snowy'
  | 'stormy'
  | 'foggy'
  | 'cyclone';

interface IconConfig {
  symbol: string;
  colorClass: string;
  glowStyle?: string;
}

const ICON_CONFIG: Record<WeatherCondition, IconConfig> = {
  sunny: {
    symbol: 'wb_sunny',
    colorClass: 'text-amber-500',
    glowStyle: 'drop-shadow(0 0 12px rgba(245,158,11,0.55))',
  },
  partly_cloudy: {
    symbol: 'wb_cloudy',
    colorClass: 'text-amber-400',
    glowStyle: 'drop-shadow(0 0 8px rgba(251,191,36,0.3))',
  },
  cloudy: {
    symbol: 'cloud',
    colorClass: 'text-slate-400',
  },
  rainy: {
    symbol: 'rainy',
    colorClass: 'text-blue-500',
    glowStyle: 'drop-shadow(0 0 8px rgba(59,130,246,0.35))',
  },
  snowy: {
    symbol: 'ac_unit',
    colorClass: 'text-cyan-400',
    glowStyle: 'drop-shadow(0 0 8px rgba(34,211,238,0.35))',
  },
  stormy: {
    symbol: 'thunderstorm',
    colorClass: 'text-slate-600 dark:text-yellow-400',
    glowStyle: 'drop-shadow(0 0 14px rgba(251,191,36,0.5))',
  },
  foggy: {
    symbol: 'foggy',
    colorClass: 'text-slate-300',
  },
  cyclone: {
    symbol: 'cyclone',
    colorClass: 'text-teal-500',
    glowStyle: 'drop-shadow(0 0 10px rgba(20,184,166,0.4))',
  },
};

// Label map
export const WEATHER_LABELS: Record<WeatherCondition, string> = {
  sunny: 'Sunny',
  partly_cloudy: 'Partly Cloudy',
  cloudy: 'Cloudy',
  rainy: 'Rainy',
  snowy: 'Snowy',
  stormy: 'Stormy',
  foggy: 'Foggy',
  cyclone: 'Cyclone',
};

// Hero-card gradient palette
export const WEATHER_GRADIENTS: Record<WeatherCondition, string> = {
  sunny: 'from-amber-400 to-orange-500',
  partly_cloudy: 'from-sky-400 to-amber-400',
  cloudy: 'from-slate-400 to-slate-600',
  rainy: 'from-blue-500 to-sky-600',
  snowy: 'from-blue-200 to-blue-400',
  stormy: 'from-indigo-700 to-purple-900',
  foggy: 'from-slate-300 to-slate-500',
  cyclone: 'from-teal-500 to-blue-600',
};

interface WeatherIconProps {
  condition: WeatherCondition;
  /** Font size in px — translates to Material Symbol text size */
  size?: number;
  className?: string;
}

const WeatherIcon = ({ condition, size = 40, className = '' }: WeatherIconProps) => {
  const { symbol, colorClass, glowStyle } = ICON_CONFIG[condition];

  return (
    <span
      className={`material-symbols-outlined select-none icon-base ${colorClass} ${className}`}
      style={{
        fontSize: `${size}px`,
        filter: glowStyle,
      }}
      aria-label={WEATHER_LABELS[condition]}
      role="img"
    >
      {symbol}
    </span>
  );
};

export default WeatherIcon;
