import { useTheme } from '../../contexts/ThemeContext';

/**
 * ThemeToggle — Stitch "Iconic Switch" (exact match)
 *
 * Color rules from Stitch Core Palette:
 *   primary:           #3db8f5   (sky blue — used for dark mode track & icon)
 *   background-light:  #f5f7f8
 *   background-dark:   #101c22
 *   amber-400:         #fbbf24   (used for light mode track)
 *
 * Toggle states:
 *   Light → amber-400 track, knob LEFT,  wb_sunny icon  (text-amber-500)
 *   Dark  → primary track,   knob RIGHT, dark_mode icon (text-primary)
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      /* Outer pill */
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary/40 ${isDark
        ? 'bg-primary'      /* #3db8f5 — Stitch primary */
        : 'bg-amber-400'    /* #fbbf24 — Stitch amber accent */
        }`}
    >
      {/* White knob with icon */}
      <div
        className={`absolute top-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${isDark ? 'right-1' : 'left-1'
          }`}
      >
        <span
          className={`material-symbols-outlined select-none icon-toggle ${isDark ? 'text-primary' : 'text-amber-500'
            }`}
        >
          {isDark ? 'dark_mode' : 'wb_sunny'}
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;
