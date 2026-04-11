import { Lock } from 'lucide-react';

const PrivacyTab = () => {
  return (
    <div className="p-12 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
      <div className="size-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
        <Lock size={32} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-text">Privacy is our priority</h3>
        <p className="text-sm text-text-secondary max-w-sm mt-2">Your location data is encrypted and never shared with third parties. You can manage your data permissions here.</p>
      </div>
      <button className="px-6 py-2.5 bg-text text-bg text-sm font-bold rounded-xl active:scale-95 transition-all">Download My Data</button>
    </div>
  );
};

export default PrivacyTab;
