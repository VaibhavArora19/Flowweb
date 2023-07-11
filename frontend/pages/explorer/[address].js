import { useEffect, useState } from 'react';
import { getContracts } from '@/deploy/contracts';
import { useContext } from 'react';
import { AppContext } from '@/context/StateContext';
import Sidebar from '@/components/UI/Sidebar';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Contract from '@/components/Explorer/Contract';

const AllContracts = () => {
  const [contracts, setContracts] = useState([]);
  const ctx = useContext(AppContext);
  const user = ctx.user;
  const router = useRouter();
  const { address } = router.query;

  useEffect(() => {
    try {
      if (user) {
        async function getContractsData() {
          const contracts = await getContracts(address);
          console.log('Cont', contracts);

          const contractArray = [];

          for (let contractKey in contracts) {
            contractArray.push({
              name: contractKey,
              contract: contracts[contractKey],
            });
          }

          setContracts(contractArray);
        }

        getContractsData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [address, user]);

  return (
    // <div>{contracts.length > 0 && <Sidebar contractArray={contracts} />}</div>

    <div className="w-[90%] mx-auto mt-20 font-Poppins">
      <div className="flex gap-4 items-center mb-16">
        <Image
          src={'/pfp.svg'}
          height={80}
          width={80}
          className="rounded-xl"
          alt="profile"
        />
        <div>
          <p className="text-xl font-semibold mb-2">@testuser</p>
          <p className="text-gray-400">{user?.addr?.slice(0, 12)}...</p>
        </div>
      </div>

      <p className="bg-[#0f0f0f] w-fit py-3 px-10 rounded-md mb-4">
        All contracts
      </p>
      <div className=" flex gap-12">
        {contracts?.length &&
          contracts.map(contract => <Contract contract={contract} />)}
      </div>
    </div>
  );
};

export default AllContracts;
