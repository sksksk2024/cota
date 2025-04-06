'use client';

import Image from 'next/image';
import logo from './../app/favicon.ico';
import { useThemeStore } from './store/useThemeStore';

const Goals = () => {
  const { theme } = useThemeStore();

  return (
    <div className="flex flex-col justify-around items-center xl:flex-row">
      <div
        className={`flex flex-col justify-start items-start gap-10 px-32P xl:px-0 xl:max-w-1/2
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
      >
        <div className="space-y-5">
          <h2
            className={`text-2xl text-center font-bold xl:text-start
            `}
          >
            Qualities
          </h2>
          <p className="font-semibold tracking-widest">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            quidem tenetur in officia quae sequi suscipit aliquam neque ab!
            Magni aperiam exercitationem tempora assumenda hic reprehenderit
            aliquid nulla perspiciatis cum nam atque sint temporibus inventore
            tempore, minima libero voluptatum rem accusantium ad sunt! Voluptas
            ex nostrum cumque suscipit odio? Necessitatibus blanditiis corrupti
            ipsam autem libero aut fugiat illo repellat amet minus! Doloribus
            doloremque autem, provident ad facilis dolorem. Officia suscipit quo
            repellendus voluptatibus id sunt nemo cumque libero quam dolorem
            dolor veniam assumenda modi, alias perspiciatis eveniet voluptates.
            Quasi laboriosam quis quia consequuntur, fugit cum voluptatem itaque
            et hic nobis!
          </p>
        </div>
        <div className="space-y-5">
          <h2
            className={`text-2xl text-center font-bold xl:text-start
            `}
          >
            Goals for 2025
          </h2>
          <p className="font-semibold tracking-widest">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, magnam
            rem error inventore eius nihil, laudantium nulla dolorem
            necessitatibus debitis ullam veniam iusto in velit dolore vel! Esse
            rem molestiae quisquam aspernatur enim impedit. Accusamus voluptatem
            aperiam ullam, esse error aliquid doloribus fugiat eum dicta,
            excepturi, aliquam odio! Consequatur, explicabo culpa. Quibusdam,
            eveniet? Commodi dignissimos nesciunt veritatis facilis dolore est
            eligendi cupiditate laudantium eos, ad odio eaque id perferendis
            fugit iure voluptates molestiae deserunt ullam? Doloribus incidunt
            aspernatur aliquam cumque dolorem aperiam consectetur animi
            veritatis ducimus maiores, nostrum accusantium quia, tempora libero,
            laboriosam quasi harum? Asperiores ipsum nam rerum quis.
          </p>
        </div>
      </div>
      <div className="relative translate-y-1/2">
        <Image src={logo} className="w-full" alt="logo" />
      </div>
    </div>
  );
};

export default Goals;
