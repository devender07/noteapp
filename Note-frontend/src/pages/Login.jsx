import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';

const Login = () => {
  const [name , setName] = useState('')
  const [email, setEmail] = useState("test123@test.com");
  const [registerEmail, setRegisterEmail] = useState('');
  const [phone,setPhone] = useState('')
  const [password, setPassword] = useState('test@123');
  const [registerPassword, setRegisterPassword] = useState('');



  
  const note = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    } 
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await note.login(email.toLowerCase(), password);
    localStorage.setItem('token', response.token);
    navigate('/');
  };

  const handleRegister = async(e)=>{
    e.preventDefault();
    const response = await note.register(name,registerEmail.toLowerCase(),phone, registerPassword);
    localStorage.setItem('token', response.token);
    navigate('/');
  }

  return (
    <div className='flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='h-auto max-w-md w-full space-y-8 bg-white rounded-lg shadow-lg p-8'>
        {note.loaded ? <h3 className='text-center text-green-700'>Connected</h3> : <h3 className='text-center text-red-700'>Connecting....</h3>}
        <h2 className='text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
        {note.error && <p className='text-red-500 text-center'>{note.error}</p>}
        <form className='mt-8 space-y-6' onSubmit={handleLogin}>
          <div>
            <input
              type='email'
              placeholder='Enter your email'
              required
              className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type='password'
              required
              placeholder='Password'
              className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
            >
              Sign in
            </button>
          </div>
        </form>
          <h3>Or</h3>

        <h2 className='text-center text-3xl font-extrabold text-gray-900'>Create your account</h2>
        <form className='mt-8 space-y-6' onSubmit={handleRegister}>
        <div>
            <input
              id='name'
              type='name'
              placeholder='Enter your name'
              required
              className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type='email'
              placeholder='Enter your email'
              required
              className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              id='phone'
              type='phone'
              required
              placeholder='Phone Number'
              className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              value={phone}
              onChange={(e) =>setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type='password'
              required
              placeholder='Password'
              className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              value={registerPassword}
              onChange={(e) =>setRegisterPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
            >
              Signup
            </button>
          </div>
        </form>



      </div>
    </div>
  );
};

export default Login;
