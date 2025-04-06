import AnimatedSVG from './AnimatedSVG';

const Live = () => {
  return (
    <AnimatedSVG
      label="live"
      pathData="M12 2a10 10 0 110 20 10 10 0 010-20zm0 2a8 8 0 100 16 8 8 0 000-16zm-1 6h2v4h-2zm0 6h2v2h-2z"
      width={40}
      height={40}
      fill="currentColor"
    />
  );
};

export default Live;
