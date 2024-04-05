import { Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import axios from 'axios';

interface ModuleCardProps {
  module: string;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const handleDeploy = async (e: any) => {
    console.log(e.target.id);
    await axios.post(`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/build`, { module, target: e.target.id });
  };

  return (
    <Card
      placeholder={''}
      className='border'>
      <CardHeader
        id='all'
        placeholder={''}
        className='h-52'
        shadow={true}
        floated={true}>
        <Button
          placeholder={''}
          color={'white'}
          className='w-full h-full '
          onClick={handleDeploy}>
          <Typography
            placeholder={''}
            variant='h2'
            className='flex justify-center items-center normal-case'>
            {`${module.toUpperCase()}`}
          </Typography>
        </Button>
      </CardHeader>

      <CardBody placeholder={''}>
        <div className='flex items-center gap-2'>
          <Typography
            placeholder={''}
            variant='small'
            color='blue'
            className='mb-2 font-normal text-gray-500'>
            모듈 카드 선택 - 프론트 & 백 빌드 및 배포 일괄
          </Typography>
        </div>
        <div className='flex items-center gap-2'>
          <Typography
            placeholder={''}
            variant='small'
            color='blue'
            className='mb-2 font-normal text-gray-500'>
            세부 버튼 클릭 - 각 버튼별 처리 build only
          </Typography>
        </div>
        <div className='flex justify-between mt-2'>
          <Button
            id='front'
            placeholder={''}
            variant='outlined'
            onClick={handleDeploy}>
            프론트
          </Button>
          <Button
            id='back'
            placeholder={''}
            variant='outlined'
            onClick={handleDeploy}>
            백엔드
          </Button>
          {/* <Button
            placeholder={''}
            variant='outlined'>
            재시작
          </Button> */}
        </div>
      </CardBody>
    </Card>
  );
}

export default ModuleCard;
