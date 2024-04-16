import { Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { ModuleCardButton } from './module-card-button';

interface ModuleCardProps {
  module: string;
}

// error 체크
// 그 로그 파일 보여주기
export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <>
      <Card
        placeholder={''}
        className='border'>
        <CardHeader
          id='deploy'
          placeholder={''}
          className='h-52'
          shadow
          floated>
          <a
            href={`http://14.41.55.45:8089/?utf8=%E2%9C%93&name=${module}`}
            target='_blank'>
            <Button
              placeholder={''}
              color={'white'}
              className='w-full h-full '>
              <Typography
                placeholder={''}
                variant='h2'
                className='flex justify-center items-center normal-case'>
                {module.toUpperCase()}
                <br />
                (GitLab 연결)
              </Typography>
            </Button>
          </a>
        </CardHeader>

        <CardBody placeholder={''}>
          {/* <div className='flex items-center gap-2'>
            <Typography
              placeholder={''}
              variant='small'
              color='red'
              className='mb-2 font-normal '>
              버튼 클릭 시, 빌드 및 배포까지 이루어집니다.
            </Typography>
          </div> */}
          {/* <div className='flex items-center gap-2'>
            <Typography
              placeholder={''}
              variant='small'
              color='blue'
              className='mb-2 font-normal text-gray-500'>
              세부 버튼 클릭 - 각 버튼별 처리 build only
            </Typography>
          </div> */}
          <div className='flex justify-between mt-2'>
            {['front', 'back'].map((targetId) => {
              return (
                <ModuleCardButton
                  module={module}
                  key={targetId}
                  targetId={targetId}
                />
              );
            })}
            {/* <Button
            placeholder={''}
            variant='outlined'>
            재시작
          </Button> */}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
