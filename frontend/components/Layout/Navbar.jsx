import * as fcl from "@onflow/fcl";
import { useContext } from "react";
import { AppContext } from "@/context/StateContext";

const Navbar = () => {
    const ctx = useContext(AppContext);

    const connectHandler = async () => {
        if(ctx.user?.addr) {
            fcl.unauthenticate();
        } else {
            fcl.signUp();
        }

    };

    return (
        <div className="flex justify-between mx-4 my-2">
            <div>
                <h1>Home</h1>
            </div>
            <div>
                <button onClick={connectHandler}>{ctx.user?.addr ? ctx.user?.addr : "Connect Wallet"}</button>
            </div>
        </div>
    )
};

export default Navbar;