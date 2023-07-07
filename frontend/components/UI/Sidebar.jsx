import { useEffect, useState } from "react";
import Highlight from "react-highlight";
import styles from '../../node_modules/highlight.js/styles/railscasts.css'

const Sidebar = ({contractArray}) => {
    const [contract, setContract] = useState("");
    console.log("cc", contractArray)
    useEffect(() => {
        if(contractArray.length > 0) setContract(contractArray[0].contract);
    }, []);

    return (
        <div className="flex mt-[40px]">
            <div>
            {contractArray.length > 0 && contractArray?.map((contractDetail) => {
                return (
                    <div key={contractDetail.name} className="h-[50px] w-[100px] text-center pt-4 border-b-2 border-solid border-white">
                        <h1 className="cursor-pointer" onClick={() => {setContract(contractDetail.contract)}}>
                        {contractDetail?.name}
                        </h1>
                    </div>
                )
            })}
            </div>
            <div className="ml-20">
                <Highlight className={`${styles}`}>{contract}</Highlight>
            </div>
        </div>
    )
};

export default Sidebar;
