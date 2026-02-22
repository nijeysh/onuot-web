import Card from '../common/Card';

const OOTDPage = () => {
    return (
        <div className="flex flex-col gap-6 pt-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">OOTD Threads</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Discover what the neighborhood is wearing for today's weather.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-primary/30 hover:bg-sky-500 transition-all active:scale-95">
                    <span className="material-symbols-outlined">add_a_photo</span>
                    <span>Post OOTD</span>
                </button>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <Card key={i} className="break-inside-avoid p-0">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/150?u=user${i}`} alt="user" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">StyleExplorer_{i}</h4>
                                    <p className="text-[10px] text-slate-400 font-medium">2 hours ago • San Francisco</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>
                        <div className="aspect-[4/5] bg-slate-100 dark:bg-slate-800">
                            <img
                                src={`https://picsum.photos/seed/ootd${i}/800/1000`}
                                alt="OOTD"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-4 mb-3">
                                <button className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                    <span className="text-xs font-bold">1.2k</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                                    <span className="text-xs font-bold">45</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-primary ml-auto transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">share</span>
                                </button>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                                <span className="font-bold text-slate-800 dark:text-slate-100 mr-2">StyleExplorer_{i}</span>
                                Perfect layers for a {i % 2 === 0 ? 'sunny' : 'chilly'} day in the city! 🧥☀️ #OOTD #SFStyles #Layering
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default OOTDPage;
