import { useEffect, useState } from 'react';
import { getContracts } from '@/deploy/contracts';
import { useContext } from 'react';
import { AppContext } from '@/context/StateContext';
import Sidebar from '@/components/UI/Sidebar';

const Profile = () => {
  const [contracts, setContracts] = useState([]);
  const ctx = useContext(AppContext);
  const user = ctx.user;

  useEffect(() => {
    if (user?.addr) {
      async function getContractsData() {
        const contracts = await getContracts(user?.addr);
        console.log('contracts', contracts);

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
  }, [user?.addr]);

  return (
    <div>{contracts.length > 0 && <Sidebar contractArray={contracts} />}</div>
  );
};

export default Profile;
