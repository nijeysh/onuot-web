const NotificationsTab = () => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
      {[
        { label: 'Real-time Alerts', desc: 'Get notified of severe weather conditions immediately.', active: true },
        { label: 'Daily Forecast', desc: "Receive a summary of today's weather at 8:00 AM.", active: true },
        { label: 'Air Quality Index', desc: 'Alerts when AQI reaches unhealthy levels.', active: false },
        { label: 'Rain Reminders', desc: 'Never forget your umbrella with rain alerts.', active: true },
      ].map((item, idx) => (
        <div key={idx} className="flex items-center justify-between p-5 bg-surface border border-border rounded-2xl">
          <div>
            <h4 className="text-sm font-bold text-text">{item.label}</h4>
            <p className="text-xs text-text-secondary mt-0.5">{item.desc}</p>
          </div>
          <button className={`w-12 h-6 rounded-full relative transition-colors ${item.active ? 'bg-primary' : 'bg-border'}`}>
            <div className={`size-4 bg-white rounded-full absolute top-1 transition-all ${item.active ? 'right-1' : 'left-1 shadow-sm'}`}></div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationsTab;
