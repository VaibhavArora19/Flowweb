import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '@/context/StateContext';
import { getContracts } from '@/deploy/contracts';

const AllContracts = () => {
  const ctx = useContext(AppContext);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    if (ctx.user) {
      async function getContractData() {
        const contractsData = await getContracts(ctx.user);
        const contractArray = [];
        for (let contractKey in contractsData) {
          contractArray.push({
            name: contractKey,
            contract: contractsData[contractKey],
          });
        }
        setContracts(contractArray);
      }

      getContractData();
    }
  }, [ctx.user]);

  return <div>AllContracts</div>;
};

export default AllContracts;
