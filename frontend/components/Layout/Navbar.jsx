import * as fcl from "@onflow/fcl";
import { useContext } from "react";
import { AppContext } from "@/context/StateContext";
import { useRouter } from "next/router";

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
    <div className="flex justify-between mx-4 my-2">
      <div onClick={() => {router.push("/")}} className="cursor-pointer">
        <h1>Home</h1>
      </div>
      <div className="flex gap-10 mt-2">
        <h1 className="cursor-pointer" onClick={() => {router.push("/deploy")}}>
          Deploy
        </h1>
        <h1 className="cursor-pointer" onClick={() => {router.push("/profile")}}>Profile</h1>
      </div>
      <div>
        <button onClick={connectHandler}>
          {ctx.user?.addr ? ctx.user?.addr : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
