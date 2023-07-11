import * as fcl from '@onflow/fcl';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/StateContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import copy from 'copy-to-clipboard';

const Navbar = () => {
  const ctx = useContext(AppContext);
  const [isCopied, setIsCopied] = useState(false); 
  const router = useRouter();

  useEffect(() => {

    if(isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 800); 
    }

  }, [isCopied]);

  const connectHandler = async () => {
    if (!ctx.user?.addr) {
      fcl.authenticate();
    } else {
      copy(ctx.user?.addr);
    }
  };

  console.log(ctx.user);

  return (
    <div className="flex items-center justify-between py-3 px-10">
      <Image
        src={'/logo.svg'}
        alt="Logo"
        height={40}
        width={40}
        className="cursor-pointer hover:scale-105 hover:rotate-90 ease-in-out transition-all "
      />
      <div className="flex items-center gap-10">
        <Link
          href={'/'}
          className="cursor-pointer text-gray-400 hover:text-white"
        >
          home
        </Link>
        <Link
          href={'/deploy'}
          className="cursor-pointer text-gray-400 hover:text-white"
        >
          deploy
        </Link>
        <Link
          href={'/create'}
          className="cursor-pointer text-gray-400 hover:text-white"
        >
          create
        </Link>

        <Link
          href={'/explorer'}
          className="cursor-pointer text-gray-400 hover:text-white"
        >
          explorer
        </Link>

        {ctx.user?.addr && (
          <Link
            href={'/profile'}
            className="cursor-pointer text-gray-400 hover:text-white"
          >
            profile
          </Link>
        )}

        <button
          className="bg-white py-2 text-lg px-10 text-black rounded-full hover:bg-[#7CFEA2] "
          onClick={connectHandler}
        >
          {ctx.user?.addr ? (
            <div className="flex gap-2 items-center" onClick={() => {setIsCopied(true)}}>
              <Image
                src={'/pfp.svg'}
                height={25}
                width={25}
                className="rounded-md"
                alt="profile"
              />
              <p className="font-semibold">
                {isCopied ? "Copied!" : ctx.user?.addr.substring(0, 10) + "..."}
              </p>
            </div>
          ) : (
            'Connect Wallet'
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
