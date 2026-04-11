import { Moon, Sun, Ruler, Laptop } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

const GeneralTab = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <h3 className="text-lg font-bold text-text mb-1">Language Selection</h3>
        <p className="text-sm text-text-secondary mb-4">Choose the primary language for the interface.</p>
        <select className="w-full max-w-xs bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer">
          <option>English (US)</option>
          <option>Korean (한국어)</option>
        </select>
      </section>

      <section>
        <h3 className="text-lg font-bold text-text mb-1">Theme & Appearance</h3>
        <p className="text-sm text-text-secondary mb-4">Set your preferred visual environment.</p>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <button
            onClick={() => theme === 'dark' && toggleTheme()}
            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-border-hover'}`}
          >
            <Sun size={24} className={theme === 'light' ? 'text-primary' : 'text-text-muted'} />
            <span className={`text-sm font-semibold ${theme === 'light' ? 'text-primary' : 'text-text-secondary'}`}>Light Mode</span>
          </button>
          <button
            onClick={() => theme === 'light' && toggleTheme()}
            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-border-hover'}`}
          >
            <Moon size={24} className={theme === 'dark' ? 'text-primary' : 'text-text-muted'} />
            <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-primary' : 'text-text-secondary'}`}>Dark Mode</span>
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-text mb-1">Regional Units</h3>
        <p className="text-sm text-text-secondary mb-4">Select measurement systems for weather data.</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-surface rounded-xl border border-border cursor-pointer transition-colors hover:bg-surface-hover">
            <Ruler size={18} className="text-text-muted" />
            <span className="text-sm font-medium text-text">Metric (°C, km/h)</span>
            <div className="size-2 rounded-full bg-primary ml-2"></div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 hover:bg-surface-hover rounded-xl border border-border cursor-pointer transition-colors text-text-secondary">
            <Ruler size={18} className="text-text-muted" />
            <span className="text-sm font-medium">Imperial (°F, mph)</span>
          </div>
        </div>
      </section>

      <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-4">
        <div className="bg-primary/10 p-2 rounded-lg text-primary">
          <Laptop size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text">System Optimizer</h4>
          <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">Your current settings are optimized for high-performance indexing and real-time weather updates.</p>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
