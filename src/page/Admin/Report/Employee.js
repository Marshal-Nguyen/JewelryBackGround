
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { IoIosSearch } from "react-icons/io";
import axios from "axios";

const Employee = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11
    const currentYear = currentDate.getFullYear();

    const [originalListaccount, setOriginalListaccount] = useState([]);
    const [listaccount, setListaccount] = useState([]);
    const [listStaff, setListStaff] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    // list revenue of all staff
    const [revenueData, setRevenueData] = useState({});

    const accountsPerPage = 10;

    useEffect(() => {
        getaccount();
        getStaff();
    }, []);

    useEffect(() => {
        if (selectedMonth && selectedYear) {
            const start = new Date(selectedYear, selectedMonth - 1, 1);
            const end = new Date(selectedYear, selectedMonth, 0);
            setStartDate(start.toISOString().split('T')[0]);
            setEndDate(end.toISOString().split('T')[0]);
        }
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        if (startDate && endDate) {
            fetchRevenueData();
        }
    }, [startDate, endDate]);

    const fetchRevenueData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const res = await axios.get(`https://jssatsproject.azurewebsites.net/api/staff/getall?startDate=${startDate}&endDate=${endDate}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('... check revenue data', res);
            if (res && res.data && res.data.data) {
                const revenueData = res.data.data.reduce((acc, staff) => {
                    acc[staff.id] = staff.totalRevenue;
                    return acc;
                }, {});
                setRevenueData(revenueData);
            }
        } catch (error) {
            console.error('Error fetching revenue data:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    const getStaff = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const res = await axios.get(`https://jssatsproject.azurewebsites.net/api/staff/getall`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('... check staff', res);
            if (res && res.data && res.data.data) {
                const staffs = res.data.data;
                setListStaff(staffs);
            }
        } catch (error) {
            console.error('Error fetching staffs:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    const getaccount = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const res = await axios.get('https://jssatsproject.azurewebsites.net/api/account/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('... check account', res);
            if (res && res.data && res.data.data) {
                const account = res.data.data;
                const accountSeller = account.filter(acc => acc.roleId === 1);
                setOriginalListaccount(accountSeller);
                setListaccount(accountSeller);
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSearch = () => {
        if (searchQuery === '') {
            // If search query is empty, reset to original list of accounts
            setListaccount(originalListaccount);
        } else {
            const filteredaccounts = originalListaccount.filter((account) =>
                account.id.toString() === searchQuery // Convert id to string to ensure it can be searched
            );

            // Update state with filtered accounts
            setListaccount(filteredaccounts);
        }
        setSearchQuery('');
    };
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(value);
    };



    const indexOfLastaccount = currentPage * accountsPerPage;
    const indexOfFirstaccount = indexOfLastaccount - accountsPerPage;
    const currentaccounts = listaccount.slice(indexOfFirstaccount, indexOfLastaccount);
    const totalPages = Math.ceil(listaccount.length / accountsPerPage);
    const placeholders = Array.from({ length: accountsPerPage - currentaccounts.length });

    // Merge account and staff data based on id
    const mergedData = currentaccounts.map(account => {
        const staff = listStaff.find(staff => staff.id === account.id) || {};
        return {
            ...account,
            firstname: staff.firstname || '', lastname: staff.lastname || '', totalRevenue: revenueData[account.id] || '',
            phone: staff.phone || '',
            email: staff.email || '',
            status: staff.status || ''
        };
    });


    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' }
    ];
    const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white mx-5 pt-5 mb-5 rounded">
            <div>
                <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">Staff revenue report</h1>
                <div className="flex mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by Id"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="px-3 py-2 border border-gray-300 rounded-md w-[400px]"
                        />
                        <IoIosSearch className="absolute top-0 right-0 mr-3 mt-3 cursor-pointer text-gray-500" onClick={handleSearch} />
                    </div>
                </div>

                <div className="flex space-x-4 mb-4">
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                    >
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-[1200px] overflow-hidden ">
                    <table className="font-inter w-full table-auto border-separate border-spacing-y-1 text-left">
                        <thead className="w-full rounded-lg bg-sky-300 text-base font-semibold text-white sticky top-0">
                            <tr className="whitespace-nowrap text-sm font-bold text-[#212B36] ">
                                <th className="py-3 pl-3 rounded-l-lg">ID</th>
                                <th >Name</th>
                                <th >Phone</th>
                                <th >Email</th>
                                <th >Status</th>
                                <th className=" rounded-r-lg ">Revenue</th>

                            </tr>
                        </thead>
                        <tbody>
                            {mergedData.map((item, index) => (
                                // hover:shadow-2xl
                                <tr key={index} className="cursor-pointer font-normal text-[#637381] bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] text-base hover:shadow-2xl">
                                    <td className="rounded-l-lg pl-3  py-4 text-black">{item.id}</td>
                                    <td >{item.firstname} {item.lastname}</td>
                                    <td >{item.phone}</td>
                                    <td >{item.email}</td>
                                    <td >{item.status}</td>
                                    <td >{formatCurrency(item.totalRevenue ? item.totalRevenue : 0)}</td>
                                </tr>
                            ))}
                            {placeholders.map((_, index) => (
                                <tr key={`placeholder-${index}`} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)]">
                                    <td className="rounded-l-lg pl-3 text-base font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base font-normal text-[#637381] py-4">-</td>
                                    < td className="text-base font-normal text-[#637381] py-4">-</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
                <div className="flex justify-center my-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={clsx(
                                "mx-1 px-3 py-1 rounded",
                                { "bg-blue-500 text-white": currentPage === i + 1 },
                                { "bg-gray-200": currentPage !== i + 1 }
                            )}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>


            </div>
        </div>
    );
}

export default Employee;
