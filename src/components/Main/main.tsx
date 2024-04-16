'use client';

import { Typography } from '@material-tailwind/react';
import { ModuleCard } from '@/components/module-card/module-card';

interface MainProps {
  modules: string[];
}

export const Main = ({ modules }: MainProps) => {
  const using = false;
  const time = 5;

  return (
    <section className='px-8 py-10'>
      <div className='container mx-auto mb-24 text-center'>
        <div>
          <h2 className='text-white text-3xl'>더존 개발서버 배포 ver 1.0</h2>
        </div>
        <div>
          <h5 className='text-gray-500 text-xl mt-2 mx-auto w-full px-4 lg:w-6/12 lg:px-8'>솔루션 BS개발부 ERP물류개발팀</h5>
          <h6 className=' text-red-400 mt-2 mx-auto w-full px-4 lg:w-6/12 lg:px-8'>버튼 클릭 시, 빌드 및 배포까지 이루어집니다.</h6>
          {!using && <h6 className=' text-red-400 mt-2 mx-auto w-full px-4 lg:w-6/12 lg:px-8'>🚫 보수공사 중 {time}분 후 사용 가능</h6>}
        </div>
      </div>

      <div className='container mx-auto grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14'>
        {modules.map((module, idx) => (
          <ModuleCard
            key={idx}
            module={module}
          />
        ))}
      </div>
    </section>
  );
};

export default Main;
