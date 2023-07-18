import Image from 'next/image';
import React from 'react';

const Banner = () => {
  return (
    <section className="h-[80vh] font-Poppins bg-[#7CFEA2] my-40 rounded-t-[90px] flex ">
      <div className="max-w-[570px] mx-auto my-40 flex-[0.6]">
        <p className="text-black font-bold text-6xl mb-5">
          Manage contracts on flow chain!
        </p>

        <p className="text-black text-lg">
          Create, deploy and manage smartcontracts with our most unique yet
          feature riched dapp. Never used AI before? It's nothing! Just try and
          get in love with it!
        </p>

        <p className="text-black text-lg mt-10">Lets Get Started :)</p>
      </div>

      <div className="flex-[0.5] relative overflow-hidden">
        <Image
          src="/circle.svg"
          height={800}
          width={800}
          alt="circle"
          className="absolute -top-28 -right-20 animate-spin-slow animate-spin-extraSlow "
        />

        {/* <Image
          src="/logo.svg"
          height={250}
          width={250}
          className="absolute z-10 left-[45%] top-32"
        /> */}

        <p className="absolute z-10 left-[45%] top-48 text-[120px] text-[#7CFEA2] font-Poppins">
          FW.
        </p>
      </div>
    </section>
  );
};

export default Banner;
