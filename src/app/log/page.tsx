'use client';

import { Card, List, ListItem } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect } from 'react';

// components

// sections
export default function RootPage() {
  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    try {
      const { data } = await axios.get(`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/getLogs`);
      console.debug('data:', data);
      console.log(data);
    } catch (error) {}
  };

  return (
    <>
      <section className='px-8 py-10'>
        <div className='container mx-auto mb-24 text-center'>
          <div>
            <h2 className='text-white text-3xl'>로그 파일 리스트</h2>
          </div>
        </div>
      </section>

      <Card
        placeholder={''}
        className='w-96 fixed !transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <List placeholder={''}>
          <ListItem placeholder={''}>Inbox</ListItem>
          <ListItem placeholder={''}>Trash</ListItem>
          <ListItem placeholder={''}>Settings</ListItem>
        </List>
      </Card>
    </>
  );
}
