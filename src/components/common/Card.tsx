import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: boolean;
    variant?: 'default' | 'glass';
}

const Card = ({ children, className = '', padding = true, variant = 'default' }: CardProps) => {
    const baseClasses = variant === 'glass'
        ? "bg-surface-glass backdrop-blur-xl border border-border-glass shadow-sm"
        : "bg-surface shadow-[0_2px_10px_-3px_var(--color-shadow)] border border-transparent";

    return (
        <div className={`rounded-2xl overflow-hidden flex flex-col ${baseClasses} ${padding ? 'p-6' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
