import React from 'react'
import { NavLink } from 'react-router-dom'
import { hover } from '@testing-library/user-event/dist/hover'
import { useState } from 'react'
import logo_v2_seller from '../../assets/logo-Photoroom-removebg-preview.png'
import { sidebarMenuCashier } from '../../ultis/MenuOfCashier/MenuCashier'
import icons from "../../ultis/icon"
const {TbLogout2} = icons
const notActive =
  'py-3 px-[25px] font-thin font-noto-serif-ethiopic italic flex gap-3 items-center text-white text-[14px]';
const activeStyle =
  'py-3 justify-center  w-[90%] ml-[10px] rounded-2xl font-noto-serif-ethiopic italic flex gap-3 items-center font-thin text-white text-[14px] bg-[#887f7f4f]';

const notActiveJew =
  'py-1  font-[300] font-sans italic flex gap-3 items-center text-white text-[14px]';
const activeStyleJew =
  'py-1 gap-4 w-[94%] rounded-xl font-serif italic flex font-bold text-white text-[14px] bg-[#887f7f4f] mt-[10px]';
const Cs_SidebarLeft = () => {
  const [isOrderSubmenuOpen, setIsOrderSubmenuOpen] = useState(false);

  const handleOrderSubmenuToggle = () => {
    setIsOrderSubmenuOpen(!isOrderSubmenuOpen);
  };

  const handleMenuItemClick = (item) => {
    if (item.text !== 'Order') {
      setIsOrderSubmenuOpen(false);
    }
    // Xử lý sự kiện nhấp vào menu item ở đây
  };
  const handleLogOut = () => {
    localStorage.clear();
  }
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  function capitalizeFirstLetter(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  return (
    <div className="relative h-full container_sidebarleft flex flex-col">
      <div className="relative w-full mb-12 h-[70px] mt-[70px] pb-[60px] flex flex-col gap-2 font-serif text-white text-[25px] justify-center items-center">
        <img className=" w-[120px] object-contain" src={logo_v2_seller} alt="logo" />
        <span className='absolute top-12 font-dancing text-4xl'>Jewelry Store</span>
      </div>

      <div className="flex flex-col pb-16">
        {sidebarMenuCashier.map((item) => (
          <div key={item.path}>
            <NavLink
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center p-4 text-white transition-colors ${isActive || (item.text === 'Order' && isOrderSubmenuOpen)
                  ? activeStyle
                  : notActive
                }`
              }
              onClick={item.text === 'Order' ? handleOrderSubmenuToggle : () => handleMenuItemClick(item)}>
              {item.icons}
              <span className="ml-4">{item.text}</span>
            </NavLink>
          </div>
        ))}

      </div>
      <div class="absolute bottom-1 left-[5%] flex items-center justify-center px-2 w-11/12 h-20 bg-[#aeb0b1] rounded-md shadow-lg my-2">
        <section class="flex justify-center items-center mr-3 w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
          <svg viewBox="0 0 15 15" class="w-7 fill-gray-700">
            <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z">
            </path>
          </svg>
        </section>

        <section class="block border-l border-gray-300 m">
          <div class="pl-3">
            <h3 class="text-gray-600 font-semibold text-sm">{name}</h3>
            <h3 class="bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-lg font-bold flex items-center gap-2">{capitalizeFirstLetter(role)} {'|'} 
            <NavLink to='/login' onClick={handleLogOut} >
              <TbLogout2 size={24} color='black' className="mr-2 cursor-pointer hover:bg-white hover:rounded-xl bg-slate-400 rounded-xl p-1" />
            </NavLink>
              </h3>
          </div>
        </section>
      </div>  
    </div>
  );
};

export default Cs_SidebarLeft;