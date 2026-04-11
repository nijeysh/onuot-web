import { ShieldCheck, Settings, CreditCard } from 'lucide-react';

const AccountTab = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-6 p-6 bg-surface border border-border rounded-3xl">
        <div
          className="size-20 rounded-full bg-cover bg-center ring-4 ring-primary/10"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkrvkO03WFaE-c0oiUIwrSbt-ersICX9U_U4ioac899RuYREzEdhUH52Qks-5VWPBcYV4ejbOKIh1TBkbJSo6pFDQMXFwOkIXAv7YWcUzozQQKX6a50G7gCUAWDO9Fz4786lR4wnHAr1ZCny2WaL9IHfXemeCSjy6NmPLfjTDRMLV5RCjM2-Ni9kNn6ODcc_jV5ALv-YcFaS3ZKfCzEW-K6Og7wMuEdUgUHtarnvdsnnfO7DP61eA6i3WpdtfHQ9DzkD3yNTSOTdnk")' }}
        ></div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text">Sarah Johnson</h3>
          <p className="text-sm text-text-secondary">Member since March 2024</p>
          <div className="mt-3 flex gap-2">
            <button className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover transition-colors">Change Photo</button>
            <button className="px-4 py-1.5 bg-surface-hover text-text text-xs font-bold rounded-lg border border-border transition-colors">Remove</button>
          </div>
        </div>
      </div>

      <section className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-surface border border-border rounded-2xl">
          <label className="block text-xs font-bold text-text-muted uppercase mb-2">Display Name</label>
          <input type="text" defaultValue="Sarah J." className="w-full bg-transparent text-sm font-medium focus:outline-none text-text" />
        </div>
        <div className="p-4 bg-surface border border-border rounded-2xl">
          <label className="block text-xs font-bold text-text-muted uppercase mb-2">Email Address</label>
          <input type="email" defaultValue="sarah@example.com" className="w-full bg-transparent text-sm font-medium focus:outline-none text-text" />
        </div>
      </section>

      <section className="space-y-4 pt-4">
        <h4 className="text-sm font-bold text-text px-1">Security & Subscriptions</h4>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-4 hover:bg-surface-hover rounded-2xl border border-border transition-colors">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-primary" />
              <span className="text-sm font-semibold text-text">Change Password</span>
            </div>
            <Settings size={16} className="text-text-muted" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-surface-hover rounded-2xl border border-border transition-colors">
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-emerald-500" />
              <span className="text-sm font-semibold text-text">Billing & Subscription</span>
            </div>
            <Settings size={16} className="text-text-muted" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AccountTab;
