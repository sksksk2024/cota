'use client';

import Image from 'next/image';
import logo from './../app/favicon.ico';
import { useThemeStore } from './store/useThemeStore';

const About = () => {
  const { theme } = useThemeStore();

  return (
    <>
      {/* Adding a div as the parking spot for the sticky nav */}
      <div
        className={`flex flex-col justify-start items-start gap-10 max-w-1/2
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
      >
        <h2
          className={`text-2xl text-start font-bold
            `}
        >
          About Me and What I Do?
        </h2>
        <p className="font-semibold tracking-widest">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A nesciunt
          incidunt maiores sapiente perspiciatis, recusandae dolore voluptas
          hic? Maiores autem temporibus fugiat dolore corrupti deleniti laborum
          nesciunt non dolor, aspernatur ut velit quo deserunt placeat numquam
          impedit exercitationem sunt vel! Facilis vitae voluptates eaque
          perspiciatis unde facere repellendus maxime harum ab, totam ipsum
          praesentium dolore accusantium, consequatur libero reprehenderit eum
          tempora! Provident magni commodi enim quae quod incidunt animi
          possimus harum, in explicabo iure consequuntur, atque, repudiandae nam
          a laudantium alias accusantium doloribus aspernatur tempore. Aperiam
          officia culpa fuga, aut illum natus odio molestias nostrum architecto
          cumque et, illo dignissimos? Accusantium ratione rem facilis incidunt!
          Itaque sequi dolorem et veritatis ea nostrum voluptatum hic dolor
          mollitia ut amet aliquid saepe, modi quos eum incidunt deleniti ipsam
          assumenda facere? Voluptatibus assumenda ipsum eius amet id, impedit
          ipsa iusto maiores sit vel. Id sit est commodi expedita ratione quo
          dolore! Nam, autem quia necessitatibus harum sed quaerat saepe odio
          vitae, quisquam esse dolor error dolore reprehenderit deserunt nostrum
          voluptatibus possimus culpa voluptatum voluptas? Alias incidunt
          laudantium ipsam exercitationem dolorum sed. Recusandae accusamus
          quidem officiis quasi doloribus voluptatibus perferendis, distinctio
          ut quis iure consequatur quaerat eum laudantium? Fuga quas modi animi
          sit aliquid.
        </p>
      </div>
      <div className="relative translate-y-1/2">
        <Image src={logo} className="w-full" alt="me pro" />
      </div>
    </>
  );
};

export default About;
