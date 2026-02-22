

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: boolean;
}

const Card = ({ children, className = '', padding = true }: CardProps) => {
    return (
        <div className={`bg-white dark:bg-slate-900 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none border border-transparent dark:border-slate-800 overflow-hidden ${padding ? 'p-6' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
