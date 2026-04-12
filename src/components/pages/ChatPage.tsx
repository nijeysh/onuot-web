import Card from '../common/Card';

const ChatPage = () => {
    return (
        <div className="flex flex-col h-[calc(100vh-160px)] gap-6 pt-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading tracking-tight">Regional Chat</h1>
                    <p className="text-text-secondary mt-1">Connect with locals and check real-time conditions.</p>
                </div>
                <div className="flex items-center -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-surface bg-slate-200 overflow-hidden">
                            <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-alt flex items-center justify-center text-[10px] font-bold text-text-secondary">+12</div>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Sidebar Channels */}
                <div className="w-72 hidden md:flex flex-col gap-4">
                    <Card className="flex-1 overflow-y-auto" padding={false}>
                        <div className="p-4 border-b border-border-light">
                            <h3 className="text-sm font-bold text-text uppercase tracking-wider">Regions</h3>
                        </div>
                        <div className="p-2 flex flex-col gap-1">
                            {['San Francisco', 'Oakland', 'San Jose', 'Berkeley', 'Palo Alto'].map(city => (
                                <button key={city} className={`flex items-center justify-between p-3 rounded-xl transition-all ${city === 'San Francisco' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-hover text-text-secondary'}`}>
                                    <span className="font-semibold text-sm">{city}</span>
                                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Chat Area */}
                <Card className="flex-1 flex flex-col p-0 overflow-hidden" padding={false}>
                    <div className="p-4 border-b border-border-light flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/20 p-2 rounded-xl text-primary">
                                <span className="material-symbols-outlined">forum</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-text">SF Hikers & Outdoors</h3>
                                <p className="text-xs text-text-secondary font-medium">1.2k members • 45 online</p>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-surface-hover rounded-full text-text-muted">
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
                                    <span className="font-bold text-sm text-text">Mike Thompson</span>
                                    <span className="text-[10px] text-text-muted font-medium">10:45 AM</span>
                                </div>
                                <div className="bg-surface-alt p-4 rounded-2xl rounded-tl-none">
                                    <p className="text-sm text-text-secondary leading-relaxed">Anyone heading up to Twin Peaks? Is the wind too strong today? 💨</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 flex-row-reverse">
                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah" />
                            </div>
                            <div className="flex flex-col gap-2 max-w-[80%] items-end">
                                <div className="flex items-baseline gap-2 flex-row-reverse">
                                    <span className="font-bold text-sm text-text">Sarah J.</span>
                                    <span className="text-[10px] text-text-muted font-medium">10:48 AM</span>
                                </div>
                                <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-md shadow-primary/20">
                                    <p className="text-sm leading-relaxed">Just came down! It's breezy but the view is crystal clear today. Highly recommend! 🌉✨</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-surface-alt/50 border-t border-border-light">
                        <div className="flex items-end gap-3">
                            <div className="flex-1 bg-surface border border-border-light rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary/40 transition-all flex flex-col pt-1">
                                <textarea
                                    rows={1}
                                    className="flex-1 bg-transparent border-none py-3 px-4 text-sm focus:ring-0 focus:outline-none resize-none max-h-[160px] overflow-y-auto text-text scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
                                    placeholder="Share an update or ask a question..."
                                    onInput={(e) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = 'auto';
                                        target.style.height = `${target.scrollHeight}px`;
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            const target = e.target as HTMLTextAreaElement;
                                            target.value = '';
                                            target.style.height = 'auto';
                                        }
                                    }}
                                />
                                <div className="flex items-center gap-1 px-2 pb-1.5 text-text-muted">
                                    <button className="p-1.5 hover:bg-surface-hover rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">add_circle</span>
                                    </button>
                                    <button className="p-1.5 hover:bg-surface-hover rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">mood</span>
                                    </button>
                                    <button className="p-1.5 hover:bg-surface-hover rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                                    </button>
                                </div>
                            </div>
                            <button className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:bg-sky-500 hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/20 mb-1">
                                <span className="material-symbols-outlined text-[24px]">send</span>
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ChatPage;
