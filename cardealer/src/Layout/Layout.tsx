import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from "react-router-dom";

//get current route to set the current item in the navigation




function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({children}: {children: React.ReactNode}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { hash, pathname, search } = location;
  const navigation = [
    { name: 'Inicio', href: '/', current: pathname === '/' },
    { name: 'Tipos', href: 'tipo-carro', current: pathname === '/tipo-carro' },
    { name: 'Combustibles', href: 'combustible', current: pathname === '/combustible'},
    { name: 'Marcas', href: 'marca', current: pathname === '/marca'},
    { name: 'Modelos', href: 'modelo', current: pathname === '/modelo'},
    { name: 'Vehiculos', href: 'vehiculo', current: pathname === '/vehiculo'},
    { name: 'Clientes', href: 'cliente', current: pathname === '/cliente'},
    { name: 'Empleados', href: 'empleado', current: pathname === '/empleado'},
    { name: 'Renta y Devolucion', href: 'renta', current: pathname === '/renta'}

  ]
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
               
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'border-indigo-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button
                      type="button"
                      onClick={()=>{
                        localStorage.clear();
                        navigate("/login");

                      }}
                      className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="" >Salir</span>
                      
                    </button>

                   
                  </div>
                  
                </div>
              </div>

            </>
          )}
        </Disclosure>

        <div className="py-10">
         
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}