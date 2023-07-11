import { useEffect, useState } from 'react';
import { getContracts } from '@/deploy/contracts';
import { useContext } from 'react';
import { AppContext } from '@/context/StateContext';
import Sidebar from '@/components/UI/Sidebar';
import { useRouter } from 'next/router';

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
    <div>{contracts.length > 0 && <Sidebar contractArray={contracts} />}</div>
  );
};

export default AllContracts;
