import { useState } from 'react';
import { useThemeStore } from './hooks/useThemeStore';

interface PricingData {
  title: string;
  desc: string;
  info1: string;
  info2?: string;
  info3?: string;
  info4?: string;
  info5?: string;
  info6?: string;
  info7?: string;
}

const Cards = ({ data }: { data: PricingData[] }) => {
  const [principle, setPrinciple] = useState<string | null>(null);
  const { theme } = useThemeStore();

  const handlePrinciple = (title: string) =>
    ['Legendary Pack', 'Our Community', 'Mentoring'].includes(title);
  return (
    <>
      {data.map((item, index) => {
        // Check if this card is the principle one
        const isPrinciple = !principle && handlePrinciple(item.title);

        return (
          <div
            key={index}
            onClick={() => setPrinciple(item.title)}
            className={`flex justify-center items-center z-1 p-32P shadow-lg mx-auto rounded-lg ${
              isPrinciple
                ? `${theme === 'theme1' ? 'bg-green-cyan-light text-textis' : 'bg-deep-dark text-highlight'}`
                : `${theme === 'theme1' ? 'bg-warning text-white' : 'bg-highlight text-textis'} scale-y-90`
            }`}
          >
            <div className="card text-center min-w-[320px] max-w-[320px]">
              <h2
                aria-label="choose a plan"
                className="text-sm font-bold mb-16M"
              >
                {item.title}
              </h2>
              <h3 className="text-2xl font-bold mb-16M">{item.desc}</h3>
              <div className="w-full h-1 bg-white opacity-20 my-16M" />
              <p className="font-semibold text-lg py-8P">{item.info1}</p>
              {item.info2 && (
                <>
                  <div
                    className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
                  />
                  <p className="font-semibold text-lg py-8P">{item.info2}</p>
                </>
              )}
              {item.info3 && (
                <>
                  <div
                    className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
                  />
                  <p className="font-semibold text-lg py-8P">{item.info3}</p>
                </>
              )}
              {item.info4 && (
                <>
                  <div
                    className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
                  />
                  <p className="font-semibold text-lg py-8P">{item.info4}</p>
                </>
              )}
              {item.info5 && (
                <>
                  <div
                    className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
                  />
                  <p className="font-semibold text-lg py-8P">{item.info5}</p>
                </>
              )}
              {item.info6 && (
                <>
                  <div
                    className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
                  />
                  <p className="font-semibold text-lg py-8P">{item.info6}</p>
                </>
              )}
              {item.info7 && (
                <>
                  <div
                    className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
                  />
                  <p className="font-semibold text-lg py-8P">{item.info7}</p>
                </>
              )}
              <button
                aria-label="learn more"
                className={`relative top-10I p-8P hover:p-6P ${
                  item.title === 'Premium'
                    ? 'text-white bg-green-500  hover:text-purple hover:border-purple hover:bg-none'
                    : 'text-purple bg-white hover:bg-black hover:text-white hover-border-white'
                } font-semibold rounded-5BR uppercase tracking-widest hover:border-2 hover:border-solid`}
              >
                <span className="hover:relative hover:bottom-64I">
                  Plateste Acum Avans 50%
                </span>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Cards;
