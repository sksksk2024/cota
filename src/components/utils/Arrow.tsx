import AnimatedSVG from './AnimatedSVG';

const Arrow = () => {
  return (
    <AnimatedSVG
      label="arrow"
      width={48}
      height={48}
      pathData="M4 12h16M14 6l6 6-6 6"
    />
  );
};

export default Arrow;
