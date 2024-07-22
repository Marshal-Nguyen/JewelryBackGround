
// import React, { useEffect } from 'react';
// import SildebarManager from '../../components/Manager/SildebarLeftManager';
// import { RiAccountCircleLine } from "react-icons/ri";
// import { Outlet, useNavigate, useOutlet } from 'react-router-dom';
// import DiamondManager from './Product/DiamondManager';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// export default function Manager() {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const Authorization = localStorage.getItem('token');
//         const role = localStorage.getItem('role');
//         if (!Authorization || role !== 'manager') {
//             navigate('/login');
//         }
//     }, [navigate]);
//     useEffect(() => {
//         const fetchOptions = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('No token found');
//                 }
//                 const headers = { Authorization: `Bearer ${token}` };
//                 const categoryResponse = await axios.get(
//                     'https://jssatsproject.azurewebsites.net/api/productcategory/getall',
//                     { headers }
//                 );
//             } catch (error) {
//                 // console.error('Error fetching options:', error);
//                 navigate('/login');
//                 toast.error('Login session expired')
//             }
//         };

//         // Gọi fetchOptions ngay khi component được mount
//         fetchOptions();

//         // Thiết lập interval để gọi fetchOptions mỗi 8 giây
//         const intervalId = setInterval(fetchOptions, 10000);

//         // Cleanup interval khi component unmount
//         return () => clearInterval(intervalId);
//     }, []);

//     return (
//         <>
//             <div className='w-full flex h-[100vh] bg-gray-100'>
//                 <div className='w-[240px] h-[100vh] flex-none bg-white overflow-y-auto z-20 border border-gray-300'>
//                     <SildebarManager />
//                 </div>
//                 <div className='flex-auto border overflow-y-auto '>
//                     <div className=''>
//                         <div className='fixed top-0 left-0 w-full flex justify-end space-x-2 px-[30px] py-[5px] bg-white border border-gray-300 z-10'>
//                             <RiAccountCircleLine className='text-2xl text-blue-800' />
//                             <span className='text-blue-800 text-lg font-medium'>{localStorage.getItem('name')} (Manager)</span>
//                         </div>
//                         <div className='pt-[60px]'>
//                             <Outlet />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
import React, { useEffect, useState } from 'react';
import SildebarManager from '../../components/Manager/SildebarLeftManager';
import { RiAccountCircleLine } from "react-icons/ri";
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaExclamationCircle } from 'react-icons/fa';
export default function Manager() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const Authorization = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!Authorization || role !== 'manager') {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axios.get('https://jssatsproject.azurewebsites.net/api/Material/PriceChangesNotification', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response && response.data && response.data.data.length !== 0) {
                    console.log('>>>> checkkkk gi ta', response)
                    setData(response.data.data);
                    setIsOpen(true)
                }

                // console.log('>>>> checkk notice', response)
            } catch (error) {

                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='w-full flex h-[100vh] bg-gray-100'>
                <div className='w-[240px] h-[100vh] flex-none bg-white overflow-y-auto z-20 border border-gray-300'>
                    <SildebarManager />
                </div>
                <div className='flex-auto border overflow-y-auto '>
                    <div className=''>
                        <div className='fixed top-0 left-0 w-full flex justify-end space-x-2 px-[30px] py-[5px] bg-white border border-gray-300 z-10'>
                            <RiAccountCircleLine className='text-2xl text-blue-800' />
                            <span className='text-blue-800 text-lg font-medium'>{localStorage.getItem('name')} (Manager)</span>
                        </div>
                        <div className='pt-[60px]'>
                            <Outlet />
                        </div>
                    </div>
                </div>
                {isOpen && data && (
                    <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full">
                            <div className="">
                                <div class="flex text-yellow-500 font-bold mb-3 text-2xl">
                                    <FaExclamationCircle className="text-3xl mr-3 text-yellow-500" />
                                    <span >Reminder to update gold price</span>
                                </div>
                                <div>
                                    It has been a while since you last updated the prices for the following items:
                                    <ul className="list-disc pl-5 mt-2">
                                        {data.map((item, index) => (
                                            <li key={index} className="flex items-center">
                                                <span className="mr-2 text-blue-500">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    Please proceed to update the prices of these items.
                                </div>
                            </div>
                            <button
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
