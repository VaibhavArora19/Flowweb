import Image from 'next/image';
import { Modal } from '../components/AI/Modal';
import { useState } from 'react';
import { HiMiniArrowSmallRight } from 'react-icons/hi2';
import Header from '@/components/Homepage/Header';
import About from '@/components/Homepage/About';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      {/* <button onClick={() => setIsOpen(true)}>open</button> */}
      {/* {isOpen && <Modal onClose={() => setIsOpen(false)} />}
       */}

      <Header />
      <About />
    </section>
  );
}
