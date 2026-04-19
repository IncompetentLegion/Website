
import React from 'react';
import { Link } from 'react-router-dom';

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
    primary: "bg-[#e10600] text-white hover:bg-[#c00500] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_rgba(225,6,0,0.3)]",
    outline: "border-2 border-black dark:border-gray-500 text-black dark:text-gray-200 hover:bg-black dark:hover:bg-gray-200 hover:text-white dark:hover:text-black",
    ghost: "text-black dark:text-gray-200 hover:text-[#e10600] transition-colors",
    black: "bg-black dark:bg-white dark:text-black text-white hover:bg-[#e10600] dark:hover:bg-[#e10600] dark:hover:text-white"
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
  <div className={`bg-white dark:bg-[#1a1a1a] border-2 border-black dark:border-gray-700 p-8 md:p-12 shadow-[12px_12px_0px_rgba(225,6,0,0.05)] relative ${className}`}>
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
    titleClassName?: string;
    highlightWord?: 'first' | 'last' | 'none';
}> = ({ title, subtitle, light = false, centered = false, accent = "Incompetent Legion", className = '', titleClassName = '', highlightWord = 'last' }) => (
  <div className={`${className || 'mb-16'} ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    <div className={`flex items-center gap-4 mb-4 ${centered ? 'justify-center' : ''}`}>
      <div className="w-12 3xl:w-16 4xl:w-20 h-[3px] 3xl:h-[4px] 4xl:h-[5px] bg-[#e10600]"></div>
      <span className={`text-[10px] 3xl:text-xs 4xl:text-base font-black uppercase tracking-[0.4em] ${light ? 'text-gray-400' : 'text-[#e10600]'}`}>
        {accent}
      </span>
    </div>
    <h2 className={`${titleClassName || 'text-5xl md:text-7xl 3xl:text-8xl 4xl:text-9xl'} font-black uppercase tracking-tighter leading-none ${light ? 'text-white' : 'text-black dark:text-gray-200'}`}>
      {title.split(' ').map((word, i, words) => (
          <span
            key={i}
            className={
              highlightWord === 'first'
                ? i === 0 ? 'text-[#e10600]' : ''
                : highlightWord === 'last'
                  ? i === words.length - 1 ? 'text-[#e10600]' : ''
                  : ''
            }
          >
            {word}{" "}
          </span>
      ))}
    </h2>
    {subtitle && (
      <p className={`mt-6 text-lg md:text-xl 3xl:text-2xl 4xl:text-2xl font-medium max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl leading-relaxed ${light ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; color?: 'red' | 'black' | 'gray' }> = ({ children, color = 'red' }) => {
    const colors = {
        red: 'bg-[#e10600] text-white',
        black: 'bg-black text-white',
        gray: 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
    };
    return (
        <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest ${colors[color]}`}>
            {children}
        </span>
    );
};

export const StatBox: React.FC<{ label: string; value: string | number; suffix?: string; href?: string }> = ({ label, value, suffix, href }) => {
    const textRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const el = textRef.current;
        if (!el) return;
        el.style.transform = '';
        if (el.scrollWidth > el.clientWidth) {
            const scale = Math.max(0.5, el.clientWidth / el.scrollWidth);
            el.style.transformOrigin = 'left';
            el.style.transform = `scale(${scale})`;
        }
    }, [value, suffix]);

    const valueContent = (
        <>
            {value}{suffix && <span className="text-base md:text-xl text-[#e10600]">{suffix}</span>}
        </>
    );
    return (
        <div className="border-l-4 border-black dark:border-gray-500 pl-4 md:pl-6 py-2 min-w-0">
            <span ref={textRef} className="block text-2xl md:text-4xl font-black text-black dark:text-gray-200 tracking-tighter whitespace-nowrap overflow-hidden">
                {href ? (
                    <Link to={href} className="hover:text-[#e10600] transition-colors">{valueContent}</Link>
                ) : valueContent}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                {label}
            </span>
        </div>
    );
};

export const DividerSVG: React.FC<{ className?: string; flipped?: boolean; bgClassName?: string }> = ({ className = "text-[#e10600]", flipped = false, bgClassName = "" }) => (
  <div className={`w-full h-16 overflow-hidden relative ${flipped ? 'rotate-180' : ''} ${bgClassName}`}>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`w-full h-full fill-current ${className}`}>
      <polygon points="0,100 0,80 100,0 100,100" />
    </svg>
  </div>
);

export const ErrorBox: React.FC<{ message: string }> = ({ message }) => (
  <div className="border-2 border-[#e10600] bg-red-50 dark:bg-red-950/30 p-6">
    <p className="text-sm font-bold text-[#e10600] uppercase tracking-wider">
      Failed to load data
    </p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{message}</p>
  </div>
);

export const SkeletonRow: React.FC<{ columns: number }> = ({ columns }) => (
  <tr className="animate-pulse border-b border-gray-100 dark:border-gray-800">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-6 py-6">
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

export const SkeletonBlock: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 3 }) => (
  <table className="w-full">
    <tbody>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} columns={cols} />
      ))}
    </tbody>
  </table>
);
