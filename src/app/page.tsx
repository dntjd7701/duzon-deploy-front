'use client';

// components
import { Navbar } from '@/components';
import React, { useEffect } from 'react';
import { Main } from '../components';
import axios from 'axios';

// sections
export default function RootPage() {
  const [modules, setModules] = React.useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const modules = await axios.get(`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/modules`);
      setModules(modules.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <NavbarDark /> */}
      <Navbar />
      <Main modules={modules} />
      {/* <Footer /> */}
    </>
  );
}
