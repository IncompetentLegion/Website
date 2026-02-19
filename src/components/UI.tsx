
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'black';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-black transition-all duration-300 uppercase tracking-tighter active:scale-95 disabled:opacity-50 disabled:pointer-events-none group overflow-hidden";
  
  const variants = {
    primary: "bg-[#e10600] text-white hover:bg-[#c00500] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]",
    outline: "border-2 border-black text-black hover:bg-black hover:text-white",
    ghost: "text-black hover:text-[#e10600] transition-colors",
    black: "bg-black text-white hover:bg-[#e10600]"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-8 py-3 text-xs",
    lg: "px-10 py-4 text-sm",
    xl: "px-14 py-6 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = '', title }) => (
  <div className={`bg-white border-2 border-black p-8 md:p-12 shadow-[12px_12px_0px_rgba(225,6,0,0.05)] relative ${className}`}>
    {title && (
        <div className="absolute -top-4 left-8 bg-[#e10600] text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
            {title}
        </div>
    )}
    {children}
  </div>
);

export const SectionHeader: React.FC<{ 
    title: string; 
    subtitle?: string; 
    light?: boolean; 
    centered?: boolean;
    accent?: string;
    className?: string;
}> = ({ title, subtitle, light = false, centered = false, accent = "Incompetent Legion", className = '' }) => (
  <div className={`${className || 'mb-16'} ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    <div className={`flex items-center gap-4 mb-4 ${centered ? 'justify-center' : ''}`}>
      <div className="w-12 3xl:w-16 4xl:w-20 h-[3px] 3xl:h-[4px] 4xl:h-[5px] bg-[#e10600]"></div>
      <span className={`text-[10px] 3xl:text-xs 4xl:text-base font-black uppercase tracking-[0.4em] ${light ? 'text-gray-400' : 'text-[#e10600]'}`}>
        {accent}
      </span>
    </div>
    <h2 className={`text-5xl md:text-7xl 3xl:text-8xl 4xl:text-9xl font-black uppercase tracking-tighter leading-none ${light ? 'text-white' : 'text-black'}`}>
      {title.split(' ').map((word, i) => (
          <span key={i} className={i === title.split(' ').length - 1 ? 'text-[#e10600]' : ''}>{word} </span>
      ))}
    </h2>
    {subtitle && (
      <p className={`mt-6 text-lg md:text-xl 3xl:text-2xl 4xl:text-2xl font-medium max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl leading-relaxed ${light ? 'text-gray-400' : 'text-gray-500'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; color?: 'red' | 'black' | 'gray' }> = ({ children, color = 'red' }) => {
    const colors = {
        red: 'bg-[#e10600] text-white',
        black: 'bg-black text-white',
        gray: 'bg-gray-100 text-gray-500'
    };
    return (
        <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest ${colors[color]}`}>
            {children}
        </span>
    );
};

export const StatBox: React.FC<{ label: string; value: string | number; suffix?: string }> = ({ label, value, suffix }) => (
    <div className="border-l-4 border-black pl-6 py-2">
        <span className="block text-4xl font-black text-black tracking-tighter">
            {value}{suffix && <span className="text-xl text-[#e10600]">{suffix}</span>}
        </span>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            {label}
        </span>
    </div>
);

export const DividerSVG: React.FC<{ color?: string; flipped?: boolean; bg?: string }> = ({ color = "#e10600", flipped = false, bg = "transparent" }) => (
  <div className={`w-full h-16 overflow-hidden relative ${flipped ? 'rotate-180' : ''}`} style={{ backgroundColor: bg }}>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current" style={{ color }}>
      <polygon points="0,100 0,80 100,0 100,100" />
    </svg>
  </div>
);

export const SkeletonRow: React.FC<{ columns: number }> = ({ columns }) => (
  <tr className="animate-pulse border-b border-gray-100">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-6 py-6">
        <div className="h-4 bg-gray-100 rounded w-full"></div>
      </td>
    ))}
  </tr>
);
