'use client';

// components
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Main } from '../components';

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
    </>
  );
}

// <Alert
//   open={alertOpen}
//   animate={{
//     mount: { y: 0 },
//     unmount: { y: 100 },
//   }}
//   color={'gray'}
//   className='w-[80vw] h-[70vh] z-50 overflow-auto fixed !transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
//   // icon={<Icon />}
//   onClose={() => {
//     setAlertOpen(false);
//   }}>
//   {/* <Typography
//         placeholder={''}
//         variant='h2'
//         color={'blue'}>
//         {'공지사항'}
//       </Typography> */}
//   <br />
//   <br />

//   <Typography
//     placeholder={''}
//     variant='h5'
//     color={'yellow'}>
//     {'작업 예정 사항'}
//     <Typography
//       placeholder={''}
//       color='white'
//       className='mt-2 font-normal '>
//       <ul>
//         <li>로그 파일 보기 작업예정</li>
//         <li>이미 진행 중인 배포자가 존재할 경우, 사용 불가하도록 처리 예정</li>
//       </ul>
//     </Typography>
//   </Typography>
//   <br />
//   <br />

//   <Typography
//     placeholder={''}
//     variant='h5'
//     color={'orange'}>
//     {'작업 완료 사항'}
//     <Typography
//       placeholder={''}
//       color='white'
//       className='mt-2 font-normal '>
//       <ul></ul>
//     </Typography>
//   </Typography>
// </Alert>;
