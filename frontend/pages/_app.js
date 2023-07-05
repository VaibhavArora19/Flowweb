import "@/styles/globals.css";
import * as fcl from "@onflow/fcl";
import Layout from "@/components/Layout/Layout";
import { AppWrapper } from "@/context/StateContext";

fcl
  .config()
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://flow-wallet-testnet.blocto.app/authn");

export default function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Layout />
      <Component {...pageProps} />;
    </AppWrapper>
  );
}
