'use client';

// components
import { Navbar } from '@/components';
import React, { useEffect } from 'react';
import axios from 'axios';
import { Main } from '../../components';

// sections
export default function RootPage() {
  const [modules, setModules] = React.useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const modules = await axios.get(`${process.env.REACT_APP_API_URI}/modules`);
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
