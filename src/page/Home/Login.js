import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faEyeSlash, faEye, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
 import backgroundVideo from '../../assets/0719.mp4';

export default function LoginToStore() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Username/Password is required!!!');
      return;
    }
    setLoadingApi(true);
    try {
      const data = await axios.post('https://jssatsproject.azurewebsites.net/api/login', {
        username: username,
        password: password,
      });
      const user = data.data;
      if (user && user.token) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('staffId', user.staffId);
        localStorage.setItem('name', user.name);
        switch (user.role) {
          case 'admin':
            navigate('/admin/Dashboard');
            break;
          case 'seller':
            navigate('/public');
            break;
          case 'manager':
            navigate('/manager/Dashboard');
            break;
          case 'cashier':
            navigate('/cs_public/cs_order/cs_waitingPayment');
            break;
          default:
            toast.error('Unknown user role');
            break;
        }
      }
    } catch (error) {
      toast.error('Invalid username or password');
    }
    setLoadingApi(false);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={backgroundVideo}
        autoPlay
        loop
        muted
      />
      <div className="bg-white bg-opacity-5 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md ">
        <h2 className="text-3xl font-bold mb-6 font-dancing text-center text-white">Jewelry Store</h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className=" w-full p-3 text-sm text-white bg-transparent border border-gray-300 rounded-lg placeholder-gray-300 focus:outline-none focus:border-blue-400 transition-colors duration-200"
          />
        </div>
        <div className="relative mb-6">
          <input
            type={isShowPassword ? 'text' : 'password'}
            placeholder="Password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-3 text-sm text-white bg-transparent border border-gray-300 rounded-lg placeholder-gray-300 focus:outline-none focus:border-blue-400 transition-colors duration-200"
          />
          <span className="absolute right-3 top-3 cursor-pointer text-gray-300">
            <FontAwesomeIcon
              icon={isShowPassword ? faEye : faEyeSlash}
              onClick={() => setIsShowPassword(!isShowPassword)}
            />
          </span>
        </div>
        <button
          className={`w-full py-3 font-bold text-black bg-white rounded-lg hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-opacity duration-200 ${username && password ? 'opacity-100' : 'opacity-50'
            }`}
          disabled={!username || !password}
          onClick={() => handleLogin()}
        >
          {loadingApi && (
            <FontAwesomeIcon
              icon={faSpinner}
              className="fa-spin-pulse fa-spin-reverse fa-1.5x me-2"
            />
          )}
          Login
        </button>
      </div>

    </div>
  );
}
