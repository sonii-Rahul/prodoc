import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate,Link  } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  //Form validation
  const validateForm = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await axios.post('/api/v1/users/login', { username, password }, { withCredentials: true });
      console.log(response)

      navigate('/dashboard');
    } catch (error) {
      // Handle server errors
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 401) {
       
        alert('Wrong password or username. Please try again.');
      }
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{' '}

            <Link to="/signup" className="font-semibold text-black transition-all duration-200 hover:underline">
                Create a free account
              </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex items-center justify-between">
                  <label htmlFor="username" className="text-base font-medium text-gray-900">
                    username
                  </label>
                 
                </div>
            <div className="space-y-5">
            
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <input
                    id="username"
                    className={`flex h-10  w-full rounded-md border ${errors.username ? 'border-red-500' : 'border-gray-300'
                      } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    Password
                  </label>
                 
                </div>
                
                <div className="mt-2">
                  <input
                    id="password"
                    className={`flex h-10 w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'
                      } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                  
                </div>
                <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                    Forgot password?
                  </a>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Login <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
