import AnimatedSVG from './AnimatedSVG';

const Blog = () => {
  return (
    <AnimatedSVG
      label="blog"
      pathData="M3 4h18c.552 0 1 .448 1 1v14c0 .552-.448 1-1 1H3c-.552 0-1-.448-1-1V5c0-.552.448-1 1-1zm1 2v12h16V6H4z"
      width={40}
      height={40}
      fill="currentColor"
    />
  );
};

export default Blog;
