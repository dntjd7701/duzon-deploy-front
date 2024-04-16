'use client';

// components
import { Navbar } from '@/components';
import React, { useEffect } from 'react';
import axios from 'axios';
import { Main } from '../../components';

// sections
export default function RootPage() {
  return (
    <>
      <div className='w-40 h-40 bg-white flex flex-col items-center justify-center'>
        <span>hi</span>
      </div>
      {/* <NavbarDark /> */}
      {/* <Navbar /> */}
      {/* <Main modules={modules} /> */}
      {/* <Footer /> */}
    </>
  );
}
