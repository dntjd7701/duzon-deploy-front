'use client';

import axios from 'axios';

// components

// sections
export default function RootPage() {
  const handleTest = async () => {
    const { data } = await axios.get(`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/test`);
  };

  return (
    <>
      <button
        onClick={handleTest}
        className='w-11 h-11 bg-white'>
        test
      </button>
      {/* <NavbarDark /> */}
      {/* <Navbar /> */}
      {/* <Main modules={modules} /> */}
      {/* <Footer /> */}
    </>
  );
}
