"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Skeleton, TextField, Button } from '@mui/material';
import './globals.css';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import Hero from './components/Hero';
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";
import { allMessages } from './axios/functions';
import Dad0 from '../public/daddy/Dad0.png'
import Dad1 from '../public/daddy/Dad1.jpg'
import Dad2 from '../public/daddy/Dad2.png'
import Dad3 from '../public/daddy/Dad3.jpg'
import Dad4 from '../public/daddy/Dad4.png'
import Dad5 from '../public/daddy/Dad5.png'

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([])
  const { addAlert } = useAlert();

  const imagesArr = [Dad4, Dad0, Dad3, Dad5, Dad1, Dad2]

  const getAllUsers = async () => {
    try {
      setLoading(true)
      const response:any = await allMessages(searchTerm);
      
      if (response?.status === 200) {
        setUsers(response.data.users)
        return setLoading(false)
      } else {
        addAlert('Error:', response?.data?.message, 'error');
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
  

  useEffect(() => {
    setLoading(true);
    getAllUsers()
  }, [searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const displayedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Hero />
      <div id='users' className="p-4 lg:px-[7rem] mt-4">
        <div className="mb-4 flex flex-col sm:flex-row justify-center items-center">
        <TextField
          variant="outlined"
          label="Find messages by user's names"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-2 sm:mb-0 sm:w-1/3 w-full dark:bg-gray-800 dark:text-white"
          InputLabelProps={{
            style: { color: 'grey' },
            className: 'dark:text-gray-300',
          }}
          InputProps={{
            style: {
              backgroundColor: '',
              color: 'grey',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            classes: { notchedOutline: 'dark:border-gray-500' },
          }}
        />

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
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
            users.length > 0 ? (
            displayedUsers?.map((user:any, index:number) => (
              <div key={user.id} className="block relative bg-white h-[500px] dark:bg-gray-800 hover:scale-105 transition-all dark:border-blue-400 dark:border rounded-lg shadow-md p-4">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 hover:opacity-20"  style={{ padding: '40px',
      backgroundImage: `url(${imagesArr[index % imagesArr.length].src})`,
    }}></div>
                <div className="mt-[250px] sm:mt-[250px] p-4 rounded-lg md:mt-[250px] lg:mt-[250px] mx-auto max-w-xl">
                <Link href={`/user/${user.id}`}>
                  <h1 className="text-xl text-white font-bold mb-2">Name: {user.first_name} {user.last_name}</h1>
                  {/* <p className="text-sm sm:text-lg font-semibold text-white mb-1">Email: {user.email}</p> */}
                  <p className="text-sm sm:text-lg font-semibold text-white mb-1">Message: {user?.message?.length > 60 ? user.message.slice(0, 50) + '...' : user.message}</p>
                </Link>
                <Link href={`/user/${user.id}?index=${index}`}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  className="mt-2"
                >
                  View More
                </Button>
                </Link>
                </div>
              </div>
            ))
          ):(<p className="text-xl dark:text-white text-black font-bold mb-2"> No message Yet. Be the first to send your wishes by clicking <a href='/register' className='text-green-500'><em>here</em></a> 😊</p>)
        )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="flex justify-end mt-5 my-10">
            <Button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
              className="mr-2"
            >
              <ArrowLeft/>
              Previous
            </Button>
            <Button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
              <ArrowRight/>
            </Button>
          </div>
        )}
      </div>
      <Alerts
        position="bottom-right"
        direction="left"
        timer={4000}
        className="rounded-md !w-80 z-[100]"
      >
      </Alerts>
    </>
  );
};

export default Home;
