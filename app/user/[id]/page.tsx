
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Skeleton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAlert } from "next-alert";
import { Alerts } from "next-alert"; 
import { singleMessage } from '@/app/axios/functions';
import { useSearchParams } from 'next/navigation';
import Dad0 from '../../../public/daddy/Dad0.png'
import Dad1 from '../../../public/daddy/Dad1.jpg'
import Dad2 from '../../../public/daddy/Dad2.png'
import Dad3 from '../../../public/daddy/Dad3.jpg'
import Dad4 from '../../../public/daddy/Dad4.png'
import Dad5 from '../../../public/daddy/Dad5.png'

interface UserPageProps {
  params: { id: string }
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {

  const [user, setUser] = useState<any>({})

  const imagesArr = [Dad4, Dad0, Dad3, Dad5, Dad1, Dad2]

  const [loading, setLoading] = useState(true);

  const { addAlert } = useAlert();

  const searchParams = useSearchParams();

  const index = searchParams.get('index');

  const getSingleUser = async () => {
    try {

      setLoading(true)
      const response = await singleMessage(params.id);
      
      console.log('res', response)

      if (response?.status === 200) {
        setUser(response.data)
        return setLoading(false)
      } else {
        addAlert('Unexpected response status:', response.status, 'error');
        return setLoading(false)
      }
    } catch (error: any) {
      if (error?.response) {
        addAlert('Error fetching users:', error.response.data, 'error');
        return setLoading(false)
      } else if (error?.request) {
        addAlert('No response received:', error.request, 'error');
        return setLoading(false)
      } else {
        addAlert('Error setting up request:', error.message, 'error');
        return setLoading(false)
      }
    }
  };

  useEffect(()=> {
    setLoading(true)
    getSingleUser()
  },[])
  return (
    <>
           {loading ? (
            Array.from({ length: 1 }).map((_, index) => (
              <Skeleton 
                key={index} 
                variant="rectangular" 
                width="100%" 
                height={250} 
                animation="pulse" 
                className="mb-4 rounded-lg" 
                style={{
                  backgroundColor: 'rgba(200, 200, 200, 0.2)',
                  borderRadius: '10px',
                  transform: 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
            ))
          ) : (
    <motion.div 
      className="p-4 lg:px-[7rem] mb-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="text-blue-500 mb-4 inline-block">
        <ArrowBack /> Back to Users
      </Link>
      <motion.div 
        className="flex flex-col lg:flex-row items-center gap-[10px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.img
          src={imagesArr[Number(index) % imagesArr.length].src}
          width= '30%'
          alt={user?.first_name}
          // className='w-[60%] lg:w-[50%]'
          // className="w-full lg:w-1/2 h-64 object-cover rounded-md mb-4 lg:mb-0 lg:mr-4"
          // className="absolute top-0 left-0 w-full h-full object-cover"
          className='rounded-md'
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="flex flex-col  mt-8 justify-center ml-8">
          <motion.h1 
            className="text-lg font-bold dark:text-white text-black mb-2"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
          >
            Name: {user?.first_name} {user.last_name}
          </motion.h1>
          {/* <p className="text-lg font-semibold dark:text-white text-black mb-1">Email: {user.email}</p> */}
          <p className="text-lg max-h-[500px] bg-gray-700 rounded-lg p-4 text-white overflow-y-scroll font-semibold mb-1"><span className='dark:text-white text-black'>Message:</span> {user.message}</p>
        </div>
        <Alerts
			position="top-right"
			direction="right"
			timer={3000}
			className="rounded-md relative z-50 !w-80"
		>
        </Alerts>
      </motion.div>
    </motion.div>
  )}
  </>
)
};

export default UserPage;
