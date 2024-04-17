'use client';

// components
import axios from 'axios';
import React, { useEffect } from 'react';
import { Main } from '../components';

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
      {/* <Navbar /> */}
      <Main modules={modules} />
      {/* <Footer /> */}
    </>
  );
}

// <Drawer
//   placeholder={''}
//   open={true}
//   onClose={() => {}}>
//   <div className='flex items-center justify-between px-4 pb-2'>
//     <Typography
//       placeholder={''}
//       variant='h5'
//       color='blue-gray'>
//       Contact Us
//     </Typography>
//     {/* <IconButton
//       variant='text'
//       color='blue-gray'
//       onClick={closeDrawer}>
//       <svg
//         xmlns='http://www.w3.org/2000/svg'
//         fill='none'
//         viewBox='0 0 24 24'
//         strokeWidth={2}
//         stroke='currentColor'
//         className='h-5 w-5'>
//         <path
//           strokeLinecap='round'
//           strokeLinejoin='round'
//           d='M6 18L18 6M6 6l12 12'
//         />
//       </svg>
//     </IconButton> */}
//   </div>
//   {/* <div className='mb-5 px-4'>
//     <Typography
//       variant='small'
//       color='gray'
//       className='font-normal '>
//       Write the message and then click button.
//     </Typography>
//   </div>
//   <form className='flex flex-col gap-6 p-4'>
//     <Typography
//       variant='h6'
//       color='blue-gray'
//       className='-mb-3'>
//       Your Email
//     </Typography>
//     <Input
//       type='email'
//       label='Email'
//     />
//     <Input label='Subject' />
//     <Textarea
//       rows={6}
//       label='Message'
//     />
//     <Button>Send Message</Button>
//   </form> */}
// </Drawer>;
