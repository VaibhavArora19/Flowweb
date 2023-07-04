import "@/styles/globals.css";
import * as fcl from "@onflow/fcl";

fcl
  .config()
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://flow-wallet-testnet.blocto.app/authn");

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
