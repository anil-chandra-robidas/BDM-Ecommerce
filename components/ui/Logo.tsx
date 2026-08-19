import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark'; // 'light' for light backgrounds, 'dark' for dark backgrounds
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
}

export default function Logo({
  variant = 'light',
  size = 'md',
  href = '/',
  className = '',
}: LogoProps) {
  const content = (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Indigo Rounded Squircle Badge with BDM */}
      <div
        className={`bg-indigo-600 text-white font-black flex items-center justify-center shadow-md shadow-indigo-600/30 transition-transform duration-200 group-hover:scale-105 select-none ${
          size === 'sm'
            ? 'w-8 h-8 text-xs rounded-lg'
            : size === 'lg'
            ? 'w-12 h-12 text-base rounded-2xl'
            : 'w-10 h-10 text-sm rounded-xl'
        }`}
      >
        BDM
      </div>

      {/* BDM-Ecommerce Brand Text */}
      <span
        className={`font-black tracking-tight transition-colors duration-200 ${
          variant === 'dark'
            ? 'text-white group-hover:text-indigo-400'
            : 'text-slate-900 group-hover:text-indigo-600'
        } ${
          size === 'sm'
            ? 'text-base'
            : size === 'lg'
            ? 'text-2xl sm:text-3xl'
            : 'text-xl'
        }`}
      >
        BDM-Ecommerce
      </span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
