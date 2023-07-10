import * as fcl from '@onflow/fcl';
import { useContext } from 'react';
import { AppContext } from '@/context/StateContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const ctx = useContext(AppContext);
  const router = useRouter();

  const connectHandler = async () => {
    if (ctx.user?.addr) {
      fcl.unauthenticate();
    } else {
      fcl.signUp();
    }
  };

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
            <div className="flex gap-2 items-center">
              <Image
                src={'/pfp.svg'}
                height={25}
                width={25}
                className="rounded-md"
                alt="profile"
              />
              <p className="font-semibold">
                {ctx.user?.addr.substring(0, 10)}...
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
