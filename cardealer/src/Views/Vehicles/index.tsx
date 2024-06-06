import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
    TEInput,
    TESelect,
  } from "tw-elements-react";
import helpers, { states } from '../../Utils/helpers';
import { useApiData } from '../../Services/actions';
const rows = [
    { id: 1, name: 'gasolina', status: 1 },
    { id: 2, name: 'gasoil', status: 2 },
    { id: 3, name: 'gas', status: 3, brand: {
      name: 'ford'
    }},
    ]
    type item = { state: number, name: string, brand: number, id: number, type?: number, model?: number, fuel?: number, chasis?: string, motor?: string, plate?: string}
function Vehicle() {
    const [showModal, setShowModal] = useState(false);
    const [brands, setBrands] = useState([]);
    const [Models, setModels] = useState([]);
    const [Fuels, setFuels] = useState([]);
    const [Types, setTypes] = useState([]);
    const [rentList, setRentList] = React.useState<any[]>([]);

    const [selected, setSelected] = useState<item>({ state: 0, name: '', brand: 0, id: 0, type: 0, model: 0, fuel: 0, chasis: '', motor: '', plate: ''});
    const [mode, setMode] = useState('create');
    const useApi = useApiData('cars');
    const useApiBrand = useApiData('brands');
    const useApiModels = useApiData('models');
    const useApiFuels = useApiData('fuels');
    const useApiTypes = useApiData('types');
    const useApiRent = useApiData("rents");
    React.useEffect(() => {
      useApiBrand.callApi();
      useApi.callApi();
      useApiModels.callApi();
      useApiFuels.callApi();
      useApiTypes.callApi();
      useApiRent.callApi();
    }
    , [])
    React.useEffect(() => {
      if(useApiBrand.data){
        const filtered = useApiBrand.data.filter((e: any) => e.state ==="1")
        setBrands(filtered.map((item: any) => {
          return { text: item.desc, value: item.id }
        }))
      }
    }
    , [useApiBrand.data])
    React.useEffect(() => {
      setSelected({...selected,model: 0})
        if(useApiModels.data){
          const filtered = useApiModels.data.filter((e: any) => e.state ==="1" && e.brand.id === selected.brand)
          setModels(filtered.map((item: any) => {
            return { text: item.desc, value: item.id }
          }))
        }
      }
      , [useApiModels.data, selected.brand])
      
        React.useEffect(() => {
            if(useApiFuels.data){
            const filtered = useApiFuels.data.filter((e: any) => e.state ==="1")
            setFuels(filtered.map((item: any) => {
                return { text: item.desc, value: item.id }
            }))
            }
        }
        , [useApiFuels.data])
        React.useEffect(() => {
            if(useApiTypes.data){
            const filtered = useApiTypes.data.filter((e: any) => e.state ==="1")
            setTypes(filtered.map((item: any) => {
                return { text: item.desc, value: item.id }
            }))
            }
        }
        , [useApiTypes.data])
        React.useEffect(() => {
          if (useApiRent.data) {
            setRentList(useApiRent.data);
          }
          
        }, [useApiRent.data]);
      const getState = (value: number, id: number) => {
        //find if car id is in rent list item with status 3
        const rent = rentList.find((rent) => rent.car.id === id && +rent.state === 3);
        console.log(value)
        console.log(rentList)
        if(rent){
          return helpers.getStatesCar(3)
        }
        return helpers.getStatesCar(+value)
      }
  return (
    <>
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Crear
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
      <form >
        <div className="grid grid-cols-3 gap-4">
          <TEInput
            type="text"
            label="Descripcion"
            onChange={(e) => {
              setSelected({ ...selected, name: e.target.value });

            }
            }
            value={selected.name}
            className="mb-6"
          ></TEInput>
           <TEInput
            type="text"
            label="Chasis"
            onChange={(e) => {
              setSelected({ ...selected, chasis: e.target.value });

            }
            }
            value={selected.chasis}
            className="mb-6"
          ></TEInput>
           <TEInput
            type="text"
            label="Motor"
            onChange={(e) => {
              setSelected({ ...selected, motor: e.target.value });

            }
            }
            value={selected.motor}
            className="mb-6"
          ></TEInput>
           <TEInput
            type="text"
            label="Placa"
            onChange={(e) => {
              setSelected({ ...selected, plate: e.target.value });

            }
            }
            value={selected.plate}
            className="mb-6"
          ></TEInput>

<TESelect data={states} label="Estado" value={selected.state} 
onValueChange={(e: any) => {
  if(e){
  setSelected({ ...selected, state: e.value});
  }
}
}
/>
<TESelect data={[
  {
    value: 0,
    text: 'seleccionar marca',
},...brands
]} label="Marca" value={selected.brand} 
onValueChange={(e: any) => {
 if(e){
  setSelected({ ...selected, brand: e.value});
 }
}
}
/>
<TESelect data={[
  {
    value: 0,
    text: 'seleccionar tipo',
},...Types
]} label="Tipo" value={selected.type} 
onValueChange={(e: any) => {
 if(e){
  setSelected({ ...selected, type: e.value});
 }
}
}
/>
<TESelect data={[
    {
        value: 0,
        text: 'seleccionar modelo',
    },...Models
]} label="Modelo" value={selected.model}
onValueChange={(e: any) => {
    if(e){
    setSelected({ ...selected, model: e.value});
    }
}
}
/>
<TESelect data={[
    {
        value: 0,
        text: 'seleccionar combustible',
    },...Fuels
]} label="Combustible" value={selected.fuel}
onValueChange={(e: any) => {
    if(e){
    setSelected({ ...selected, fuel: e.value});
    }
}
}
/>
        </div>


   
     
        <TERipple rippleColor="light" className="w-full mt-2">
          <button
            type="button"
            disabled={selected.state === 0 || selected.name === '' || selected.brand === 0 || selected.type === 0 || selected.model === 0 || selected.fuel === 0}
            onClick={() => {
              if(selected.state === 0 || selected.name === '') {
                alert('Debe llenar todos los campos');
              }
              else{
                if(mode === 'create'){
                  console.log('create', selected)
                  const data = {
                    desc: selected.name,
                    state: selected.state,
                    brand: selected.brand,
                    type: selected.type,
                    model: selected.model,
                    fuel: selected.fuel,
                    chasis: selected.chasis,
                    motor: selected.motor,
                    plate: selected.plate

                  }
                  useApi.postData(data, ()=>{
                    setSelected({ state: 0, name: '', brand: 0, id: 0});
                    setShowModal(false);
                    useApi.callApi();
                  
                  });
                }
                else{
                  if(mode === 'edit'){
                    console.log('edit', selected)
                    const data = {
                      desc: selected.name,
                      state: selected.state,
                      brand: selected.brand,
                        type: selected.type,
                        model: selected.model,
                        fuel: selected.fuel,
                        chasis: selected.chasis,
                        motor: selected.motor,
                        plate: selected.plate
                    }
                    useApi.putData(selected.id, data, ()=>{
                      setSelected({ state: 0, name: '', brand: 0, id: 0});
                      setShowModal(false);
                        useApi.callApi();
                    
                    });
                  }
                }
              }
            }
            }
            className="block w-full rounded disabled:opacity-70 bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
          >
           {mode === 'create' ? 'Crear' : 'Editar'}
          </button>
        </TERipple>
      </form>
            </TEModalBody>
           
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    <Layout>
    <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Vehiculos</h1>
            </div>
          </header>
    <div className='m-2'>
        <button
        type="button"
        onClick={() => {
          setSelected({ state: 0, name: '', brand: 0, id: 0});
          setMode('create');
          setShowModal(true);
        }}
        className=" my-2 inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
      >
        Agregar
      </button>
      <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Descripcion</th>
                  <th scope="col" className="px-6 py-4">Marca</th>
                  <th scope="col" className="px-6 py-4">Modelo</th>
                  <th scope="col" className="px-6 py-4">Tipo</th>
                  <th scope="col" className="px-6 py-4">Combustible</th>
                    <th scope="col" className="px-6 py-4">Chasis</th>
                    <th scope="col" className="px-6 py-4">Motor</th>
                    <th scope="col" className="px-6 py-4">Placa</th>
                  <th scope="col" className="px-6 py-4">Estado</th>
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
           
               {(useApi.data || []).map((row: any) => (
                <tr key={row.id} className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4">{row.desc}</td>
                  <td className="whitespace-nowrap px-6 py-4">{row.brand?.desc}</td>
                    <td className="whitespace-nowrap px-6 py-4">{row.model?.desc}</td>
                    <td className="whitespace-nowrap px-6 py-4">{row.type?.desc}</td>
                    <td className="whitespace-nowrap px-6 py-4">{row.fuel?.desc}</td>
                    <td className="whitespace-nowrap px-6 py-4">{row.chasis}</td>
                    <td className="whitespace-nowrap px-6 py-4">{row.motor}</td>
                    <td className="whitespace-nowrap px-6 py-4">{row.plate}</td>
                  <td className="whitespace-nowrap px-6 py-4">{getState(row.state, row.id)}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                            <button
                              type="button"
                              onClick={() => {
                                setSelected({
                                  state: +row.state,
                                  name: row.desc,
                                  id: row.id,
                                  brand: row.brand.id,
                                    type: row.type.id,
                                    model: row.model.id,
                                    fuel: row.fuel.id,
                                    chasis: row.chasis,
                                    motor: row.motor,
                                    plate: row.plate
                                });
                                setMode("edit");
                                setShowModal(true);
                              }}
                              className="inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
                              >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                useApi.deleteData(row.id, () => {
                                  setSelected({ state: 0, name: "", id: 0, brand: 0});
                                  useApi.callApi();
                                });
                              }}
                              className="inline-block rounded-full bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                              >
                              Eliminar
                            </button>
                          </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
        
    </div>
    </Layout>
    </>
  )
}

export default Vehicle