'use client';

// components
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Main } from '../components';
import { Alert, Typography } from '@material-tailwind/react';

// sections
export default function RootPage() {
  const [modules, setModules] = React.useState<string[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    fetchData();
    setAlertOpen(true);
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
      <Alert
        open={alertOpen}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        color={'gray'}
        className='w-[80vw] h-[70vh] z-50 overflow-auto fixed !transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        // icon={<Icon />}
        onClose={() => {
          setAlertOpen(false);
        }}>
        <Typography
          placeholder={''}
          variant='h2'
          color={'blue'}>
          {'공지사항'}
        </Typography>
        <br />
        <br />

        <Typography
          placeholder={''}
          variant='h5'
          color={'yellow'}>
          {'작업 예정 사항'}
          <Typography
            placeholder={''}
            color='white'
            className='mt-2 font-normal '>
            <ul>
              <li>로그 파일 보기 작업예정</li>
              <li>이미 진행 중인 배포자가 존재할 경우, 사용 불가하도록 처리 예정</li>
            </ul>
          </Typography>
        </Typography>
        <br />
        <br />

        <Typography
          placeholder={''}
          variant='h5'
          color={'orange'}>
          {'작업 완료 사항'}
          <Typography
            placeholder={''}
            color='white'
            className='mt-2 font-normal '>
            <ul></ul>
          </Typography>
        </Typography>
      </Alert>
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
