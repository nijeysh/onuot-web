import Card from '../common/Card';

const ChatPage = () => {
    return (
        <div className="flex flex-col h-[calc(100vh-160px)] gap-6 pt-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Regional Chat</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Connect with locals and check real-time conditions.</p>
                </div>
                <div className="flex items-center -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden">
                            <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">+12</div>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Sidebar Channels */}
                <div className="w-72 hidden md:flex flex-col gap-4">
                    <Card className="flex-1 overflow-y-auto" padding={false}>
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Regions</h3>
                        </div>
                        <div className="p-2 flex flex-col gap-1">
                            {['San Francisco', 'Oakland', 'San Jose', 'Berkeley', 'Palo Alto'].map(city => (
                                <button key={city} className={`flex items-center justify-between p-3 rounded-xl transition-all ${city === 'San Francisco' ? 'bg-primary/10 text-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                                    <span className="font-semibold text-sm">{city}</span>
                                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Chat Area */}
                <Card className="flex-1 flex flex-col p-0 overflow-hidden" padding={false}>
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/20 p-2 rounded-xl text-primary">
                                <span className="material-symbols-outlined">forum</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-100">SF Hikers & Outdoors</h3>
                                <p className="text-xs text-slate-500 font-medium">1.2k members • 45 online</p>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                <img src="https://i.pravatar.cc/150?u=mike" alt="Mike" />
                            </div>
                            <div className="flex flex-col gap-2 max-w-[80%]">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-bold text-sm text-slate-800 dark:text-slate-100">Mike Thompson</span>
                                    <span className="text-[10px] text-slate-400 font-medium">10:45 AM</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none">
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Anyone heading up to Twin Peaks? Is the wind too strong today? 💨</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 flex-row-reverse">
                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah" />
                            </div>
                            <div className="flex flex-col gap-2 max-w-[80%] items-end">
                                <div className="flex items-baseline gap-2 flex-row-reverse">
                                    <span className="font-bold text-sm text-slate-800 dark:text-slate-100">Sarah J.</span>
                                    <span className="text-[10px] text-slate-400 font-medium">10:48 AM</span>
                                </div>
                                <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-md shadow-primary/20">
                                    <p className="text-sm leading-relaxed">Just came down! It's breezy but the view is crystal clear today. Highly recommend! 🌉✨</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                        <div className="relative">
                            <input
                                className="w-full bg-white dark:bg-slate-900 border-none rounded-2xl py-4 pl-5 pr-14 text-sm focus:ring-2 focus:ring-primary/20 shadow-sm text-slate-900 dark:text-slate-100"
                                placeholder="Share an update or ask a question..."
                                type="text"
                            />
                            <button className="absolute right-2 top-2 p-2 bg-primary text-white rounded-xl hover:bg-sky-500 transition-colors shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined block">send</span>
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ChatPage;
