import { Alert, Button, Spinner, Typography } from '@material-tailwind/react';
import axios from 'axios';
import Module from 'module';
import { useState } from 'react';

interface ModuleCardButtonProps {
  targetId: string;
  module: string;
}

export const ModuleCardButton = ({ targetId, module }: ModuleCardButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [data, setData] = useState({
    state: 0,
    data: [],
  });

  const handleDeploy = async (e: any) => {
    console.debug('e:', e);
    try {
      setLoading(true);
      await doBuild(e);
      setLoading(false);
      setOpenAlert(true);

      //   if (data.state !== -1) {
      //     setTimeout(() => {
      //       setOpenAlert(false);
      //     }, 5000);
      //   }
    } catch (error) {
      console.error(error);
    }
  };

  const doBuild = async (e: any) => {
    try {
      const { data } = await axios.post(`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/build`, {
        module,
        target: e.target.id,
      });
      setData({
        state: data.state,
        data: data.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        key={targetId}
        id={targetId}
        disabled={loading}
        className='flex flex-col items-center justify-center'
        placeholder={''}
        variant='outlined'
        onClick={handleDeploy}>
        {loading && (
          <Spinner
            className='mb-2'
            color='teal'
          />
        )}
        {targetId}
      </Button>

      <Alert
        open={openAlert}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        color={'gray'}
        className='w-[80vw] h-[70vh] z-50 overflow-auto fixed !transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        // icon={<Icon />}
        onClose={() => {
          setOpenAlert(false);
        }}>
        <Typography
          placeholder={''}
          variant='h2'
          color={data.state === 0 ? 'lime' : 'red'}>
          {data.state === 0 ? '빌드 성공' : '빌드 실패'}
        </Typography>
        <Typography
          placeholder={''}
          color='white'
          className='mt-2 font-normal '>
          <pre>{data.data}</pre>
        </Typography>
      </Alert>
    </>
  );
};
