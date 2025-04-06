import AnimatedSVG from './AnimatedSVG';

const Tutorials = () => {
  return (
    <AnimatedSVG
      label="tutorials"
      pathData="
M22 126V42a4 4 0 0 1 4-4h140a4 4 0 0 1 4 4v84a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4Z
M52 154h88
M118 84 82 62v44l36-22Z
"
      width={50}
      height={50}
      viewBox="0 0 200 150"
    ></AnimatedSVG>
  );
};

export default Tutorials;
