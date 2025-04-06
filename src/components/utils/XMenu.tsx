import { useThemeStore } from '../hooks/useThemeStore';
import AnimatedSVG from './AnimatedSVG';

const XMenu = () => {
  const { theme } = useThemeStore();

  return (
    <AnimatedSVG
      width={40}
      height={30}
      strokeWidth={6}
      stroke="currentColor"
      fill="currentColor" // Added this to make the fill color consistent with the stroke color
      pathData="M4 4 L60 60 M4 60 L60 4"
      className={`z-50
        ${
          theme === 'theme1'
            ? 'text-white group-hover:text-warning' // Using text-* for both fill and stroke
            : 'text-black group-hover:text-highlight'
        }
        `}
      label="close-menu"
      viewBox="0 0 64 64"
    />
  );
};

export default XMenu;
