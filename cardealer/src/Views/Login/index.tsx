import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import { Container, ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import axios from 'axios';
interface LoginProps {
   
}


const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();

    const location = useLocation();
    const { pathname } = location;
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [init, setInit] = useState(false);
    const loginCall = async (email: string, password: string) => {
  
    if(email === '' || password === '') {
      setError('Por favor complete los campos');
      return;
    }
    //if email is not valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      setError('Por favor ingrese un correo valido');
      return;
    }
    else{
      axios.post('http://localhost:3002/employees/login', {
        email: email,
        password: password
      },{
      headers:{
        Accept: 'application/json',
       'Content-Type': 'application/json',
    }
    })
      .then(function (response) {
        if(response.data.id){
          console.log(response.data.id);
          localStorage.setItem("Role", 'admin');
          localStorage.setItem("userId", response.data.id);
          navigate("/");
    
        }
      })
      .catch(function (error) {
        console.log(error);
        setError('Usuario o contraseña incorrectos')
      });
    }
    }
    useEffect(() => {
        initParticlesEngine(async (engine) => {
           
          await loadSlim(engine);
        }).then(() => {
          setInit(true);
        });
        localStorage.removeItem("token");
    
      }, []);
    
      const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container);
      };
    
      const options: ISourceOptions = useMemo(
        () => ({
          background: {
            color: {
              value: "#fff",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#2596be",
            },
            links: {
              color: "#2596be",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }),
        [],
      );
    const [userType, setUserType] = React.useState('admin'); // ['admin', 'user'
    const [error, setError] = React.useState('');
    const handleLogin = () => {
        // Lógica de autenticación aquí

        if (pathname.includes('Admin')) {
            setUserType('admin');
        } else {
            setUserType('user');
        }
    };
React.useEffect(() => {
    handleLogin();
}
, []);
    return (
        <>
        
           <div className="flex min-h-full flex-1 relative">
             <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6  xl:px-24 ">
               <div className="mx-auto w-full max-w-sm lg:w-96">
                 <div>
                   {/* <img
                     className="h-10 w-auto"
                     src="./logo.png"
                     alt="Your Company"
                   /> */}
                   <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-[#2596be]">
                     Ingresa en tu cuenta
                   </h2>
                   {/* <p className="mt-2 text-sm leading-6 text-gray-500">
                    no tienes cuenta?{' '}
                     <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                       Registrate Ahora!
                     </a>
                   </p> */}
                 </div>
       
                 <div className="mt-10">
                   <div>
                     <form action="#" method="POST" className="space-y-6">
                       <div>
                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#2596be]">
                         Email
                         </label>
                         <div className="mt-2">
                           <input
                             id="username"
                             name="Email"
                             type="email"
                             autoComplete="username"
                             pattern=""
                             title="Por favor ingrese un correo valido"
                             onChange={(e) => {
                              setEmail(e.target.value)
                              setError('')
                             }}
                             required
                              value={email}
                             className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           />
                         </div>
                       </div>
       
                       <div>
                         <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#2596be]">
                           Contraseña
                         </label>
                         <div className="mt-2">
                           <input
                             id="password"
                             onChange={(e) => {
                              setError('')
                              setPassword(e.target.value)}}
                             name="Contraseña"
                             type="password"
                             
                             autoComplete="current-password"
                             required
                             value={password}
                             className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           />
                         </div>
                       </div>
       
                      
       
                       <div>
                        
                         <button
      type="button"
      onClick={() => {
        console.log("Login");
        loginCall(email, password);
        
      }}
      className="inline-block rounded w-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
    >
                                 Ingresar

    </button>
                       </div>
                     </form>
                     {error && <p className="text-red-500 text-center">{error}</p>}
                     
                   </div>
       
                   
                 </div>
               </div>
             </div>
            
           </div>
         </>
    );
};

export default Login;