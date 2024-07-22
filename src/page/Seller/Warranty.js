
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// const Warranty = () => {
//     // States for each section of the description
//   const [policyTitle, setPolicyTitle] = useState('');
//   const [exchangePolicy, setExchangePolicy] = useState('');
//   const [giftPolicy, setGiftPolicy] = useState('');
//   const [warranty, setWarranty] = useState('');
//   const [buyBackPolicy, setBuyBackPolicy] = useState('');

//   useEffect(() => {
//     // Function to fetch data from API
//     const fetchPolicyData = async () => {
//       try {
//         const response = await axios.get('https://jssatsproject.azurewebsites.net/api/ReturnBuyBackPolicy/GetDisplayPolicy');
//         const description = response.data.data.description;

//         // Split the description by newline characters
//         const descriptionSections = description.split('\n');

//         // Set states based on the description sections
//         if (descriptionSections.length > 0) {
//           setPolicyTitle(descriptionSections[0]);
//           setExchangePolicy(descriptionSections[1]);
//           setGiftPolicy(descriptionSections[2]);
//           setWarranty(descriptionSections[3]);
//           setBuyBackPolicy(descriptionSections[4]);
//         }
//       } catch (error) {
//         console.error('Error fetching policy data:', error);
//       }
//     };

//     fetchPolicyData();
//   }, []);
//     return (<>

//         <div className=''>
//             <div className='flex flex-col gap-4 '>
//                 <h1 className='flex justify-center mt-20 text-[40px] font-medium text-[#1b2b72ee]'>Warranty and exchange policy</h1>
//                 <a href='#popupRE' id='openPopUp' className=' text-black rounded-lg text-sm px-5 py-2.5 text-center border border-black'>
//                     {/* 48H EXCHANGE */}
//                     Exchange Policy
//                 </a>
//                 <a href='#popupRE1' id='openPopUp' className=' text-black  rounded-lg text-sm px-5 py-2.5 text-center border border-black'>
//                     {/* AFTER 48H EXCHANGE */}
//                     Gift Policy
//                 </a>
//                 <a href='#popupRE2' id='openPopUp' className=' text-black rounded-lg text-sm px-5 py-2.5 text-center border border-black'>
//                     {/* PURCHASE */}
//                     Warranty
//                 </a>
//                 <a href='#popupRE3' id='openPopUp' className=' text-black rounded-lg text-sm px-5 py-2.5 text-center border border-black'>
//                     {/* GUARANTEE */}
//                     Buy Back Policy
//                 </a>
//             </div>
//             <h1>{policyTitle}</h1>
//       <h2>Exchange Policy</h2>
//       <p>{exchangePolicy}</p>
//       <h2>Gift Policy</h2>
//       <p>{giftPolicy}</p>
//       <h2>Warranty</h2>
//       <p>{warranty}</p>
//       <h2>Buy Back Policy</h2>
//       <p>{buyBackPolicy}</p>
//         </div>

//     </>)

// }

// export default Warranty

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Warranty = () => {
  // States for each section of the description
  const [policyTitle, setPolicyTitle] = useState('');
  const [exchangePolicy, setExchangePolicy] = useState('');
  const [giftPolicy, setGiftPolicy] = useState('');
  const [warranty, setWarranty] = useState('');
  const [buyBackPolicy, setBuyBackPolicy] = useState('');
  
  // State to control which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    // Function to fetch data from API
    const fetchPolicyData = async () => {
      try {
        const response = await axios.get('https://jssatsproject.azurewebsites.net/api/ReturnBuyBackPolicy/GetDisplayPolicy');
        const description = response.data.data.description;

        // Split the description by newline characters
        const descriptionSections = description.split('\n');

        // Set states based on the description sections
        if (descriptionSections.length > 0) {
          setPolicyTitle(descriptionSections[0]);
          setExchangePolicy(descriptionSections[1]);
          setGiftPolicy(descriptionSections[2]);
          setWarranty(descriptionSections[3]);
          setBuyBackPolicy(descriptionSections[4]);
        }
      } catch (error) {
        console.error('Error fetching policy data:', error);
      }
    };

    fetchPolicyData();
  }, []);

  // Handler to toggle the dropdown
  const handleDropdownToggle = (policy) => {
    setOpenDropdown(openDropdown === policy ? null : policy);
  };

  return (
    <>
      <div className='p-8'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-center text-[40px] font-medium text-[#1b2b72ee] mb-4'>Warranty and Exchange Policy</h1>
          
          <button 
            onClick={() => handleDropdownToggle('exchangePolicy')} 
            className='w-full md:w-[300px] bg-transparent text-[#1b2b72ee] border border-[#1b2b72ee] rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out hover:bg-[#1b2b72ee] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1b2b72ee]'>
            Exchange Policy
          </button>
          {openDropdown === 'exchangePolicy' && (
            <div className='p-4 border border-gray-300 rounded-lg mt-2'>
              <p>{exchangePolicy}</p>
            </div>
          )}
          
          <button 
            onClick={() => handleDropdownToggle('giftPolicy')} 
            className='w-full md:w-[300px] bg-transparent text-[#1b2b72ee] border border-[#1b2b72ee] rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out hover:bg-[#1b2b72ee] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1b2b72ee]'>
            Gift Policy
          </button>
          {openDropdown === 'giftPolicy' && (
            <div className='p-4 border border-gray-300 rounded-lg mt-2'>
              <p>{giftPolicy}</p>
            </div>
         ) }

          <button 
            onClick={() => handleDropdownToggle('warranty')} 
            className='w-full md:w-[300px] bg-transparent text-[#1b2b72ee] border border-[#1b2b72ee] rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out hover:bg-[#1b2b72ee] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1b2b72ee]'>
            Warranty
          </button>
          {openDropdown === 'warranty' && (
            <div className='p-4 border border-gray-300 rounded-lg mt-2'>
              <p>{warranty}</p>
            </div>
          )}

          <button 
            onClick={() => handleDropdownToggle('buyBackPolicy')} 
            className='w-full md:w-[300px] bg-transparent text-[#1b2b72ee] border border-[#1b2b72ee] rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out hover:bg-[#1b2b72ee] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1b2b72ee]'>
            Buy Back Policy
          </button>
          {openDropdown === 'buyBackPolicy' && (
            <div className='p-4 border border-gray-300 rounded-lg mt-2'>
              <p>{buyBackPolicy}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Warranty;
