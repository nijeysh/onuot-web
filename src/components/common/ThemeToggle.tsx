import { useTheme } from '../../contexts/ThemeContext';

/**
 * ThemeToggle — Stitch "Iconic Switch" design
 *
 * From Stitch Theme Toggles & Weather Assets screen:
 *   - Track: rounded-full, bg-primary (dark) / bg-slate-200 (light)
 *   - Knob: white circle with current-mode icon inside (dark_mode / wb_sunny)
 *   - Knob slides to the right when dark mode is active
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1 ${isDark ? 'bg-primary' : 'bg-slate-200'
        }`}
    >
      {/* Knob — white circle with icon */}
      <div
        className={`absolute top-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${isDark ? 'right-1' : 'left-1'
          }`}
      >
        <span
          className={`material-symbols-outlined text-[16px] font-medium ${isDark ? 'text-primary' : 'text-amber-500'
            }`}
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}
        >
          {isDark ? 'dark_mode' : 'wb_sunny'}
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;
