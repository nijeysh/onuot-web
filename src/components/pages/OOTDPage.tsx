import Card from '../common/Card';

const OOTDPage = () => {
    return (
        <div className="flex flex-col gap-8 pt-6 max-w-2xl mx-auto px-4 text-text">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-4">
                <div>
                    <h1 className="text-4xl font-black text-text-heading tracking-tight">OOTD FEED</h1>
                    <p className="text-text-secondary mt-2 font-medium">Style inspiration based on today's local weather.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-primary/25 hover:bg-sky-500 hover:-translate-y-0.5 transition-all active:scale-95 group">
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">add_a_photo</span>
                    <span>Share Style</span>
                </button>
            </div>

            <div className="flex flex-col gap-12 pb-20 mt-4">
                {[1, 2, 3, 4].map(i => (
                    <Card key={i} className="group overflow-hidden !p-0 border-none bg-surface/40 backdrop-blur-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 rounded-3xl cursor-pointer">
                        {/* Header */}
                        <div className="p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-sky-300 p-[2px]">
                                        <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden border-2 border-surface">
                                            <img src={`https://i.pravatar.cc/150?u=user${i + 15}`} alt="user" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-surface shadow-sm"></div>
                                </div>
                                <div>
                                    <h4 className="text-base font-black text-text-heading">StyleExplorer_{i}</h4>
                                    <p className="text-xs text-text-muted font-bold flex items-center gap-1.5 opacity-80 uppercase tracking-tighter">
                                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                                        {i * 2}h ago • San Francisco
                                    </p>
                                </div>
                            </div>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hover text-text-muted transition-colors">
                                <span className="material-symbols-outlined text-[24px]">more_horiz</span>
                            </button>
                        </div>

                        {/* Image Section */}
                        <div className="relative aspect-[4/5] bg-surface-alt overflow-hidden">
                            <img
                                src={`https://picsum.photos/seed/ootd_v3_${i}/1000/1250`}
                                alt="OOTD"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {/* Weather Overlay */}
                            <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none">
                                <div className="bg-black/40 backdrop-blur-md text-white text-[11px] font-black px-4 py-2 rounded-xl flex items-center gap-2 border border-white/20 shadow-lg">
                                    <span className="material-symbols-outlined text-[16px] text-sky-300">thermostat</span>
                                    {72 + i}°F
                                </div>
                                <div className="bg-primary/70 backdrop-blur-md text-white text-[11px] font-black px-4 py-2 rounded-xl flex items-center gap-2 border border-white/20 shadow-lg">
                                    <span className="material-symbols-outlined text-[16px] text-yellow-300">wb_sunny</span>
                                    Sunny
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                            <div className="flex items-center gap-8 mb-5">
                                <button className="flex items-center gap-3 text-text hover:text-red-500 transition-all scale-110 active:scale-95 group/btn">
                                    <span className={`material-symbols-outlined text-[28px] ${i % 2 === 0 ? 'text-red-500 fill-current' : ''}`}>favorite</span>
                                    <span className="text-sm font-black tracking-tight">{i * 1.5}k</span>
                                </button>
                                <button className="flex items-center gap-3 text-text hover:text-primary transition-all scale-110 active:scale-95 group/btn">
                                    <span className="material-symbols-outlined text-[28px]">chat_bubble</span>
                                    <span className="text-sm font-black tracking-tight">{i * 15 + 12}</span>
                                </button>
                                <button className="ml-auto w-12 h-12 flex items-center justify-center rounded-full bg-surface-alt border border-white/5 hover:bg-primary/10 hover:text-primary transition-all shadow-sm">
                                    <span className="material-symbols-outlined text-[22px]">share</span>
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <p className="text-[15px] text-text-secondary leading-[1.6]">
                                    <span className="font-extrabold text-text-heading mr-2 tracking-tight">StyleExplorer_{i}</span>
                                    {i % 2 === 0 
                                        ? "Loving this minimalist look for the sunny SF afternoon. Lightweight fabrics are essential when the sun is out! ☀️✨"
                                        : "Denim and white is always a win. Ready for a coffee run and some golden hour shots! ☕📸"
                                    }
                                </p>
                                <div className="flex flex-wrap gap-2 pt-1 text-xs font-black text-primary uppercase tracking-widest opacity-90">
                                    <span>#SummerStyle</span>
                                    <span>#OOTD</span>
                                    <span>#SFStyles</span>
                                    <span>#StyleInspo</span>
                                </div>
                                
                                <div className="pt-4 border-t border-white/5 flex items-center gap-3 text-text-muted">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden ring-1 ring-white/10 shrink-0">
                                            <img src={`https://i.pravatar.cc/150?u=current_user`} alt="me" className="w-full h-full object-cover" />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Add a comment..." 
                                        className="bg-transparent border-none text-sm w-full focus:ring-0 placeholder:text-text-muted/50 font-medium"
                                    />
                                    <button className="text-primary text-xs font-black uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap px-2">Post</button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default OOTDPage;
