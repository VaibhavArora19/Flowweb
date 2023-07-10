import Image from "next/image";
import { Modal } from "../components/AI/Modal";
// const inter = Inter({ subsets: ["latin"] });
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* <button onClick={() => setIsOpen(true)}>open</button> */}
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
