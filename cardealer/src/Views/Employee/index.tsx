import React, { useState } from "react";
import Layout from "../../Layout/Layout";
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
import helpers from "../../Utils/helpers";
import { useApiData } from "../../Services/actions";

type item = { state: number; name: string; id: number, lastName: string, email: string, dni: string,password: string, startDate: string,workTime: string,percentage: string};
function Employee() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<item>({ state: 0, name: "", id: 0, lastName: "", email: "", dni: "",password: "", startDate: "",workTime: "",percentage: ""});
  const [mode, setMode] = useState("create");
  const useApi = useApiData("employees");
  const [ShowDNIError, setShowDNIError] = useState(false);

  React.useEffect(() => {
    useApi.callApi();
  }, []);
  React.useEffect(() => {
    setShowDNIError(false);
    if (selected.dni && selected.dni.length === 11) {
      useApi.validateCedula(selected.dni, (res) => {
        if(res.valid === false){
          setShowDNIError(true);
        }
      });
    }
  }, [selected.dni]);
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
              <form>
                <div className="grid grid-cols-2 gap-4">
                  <TEInput
                    type="text"
                    label="Nombre"
                    onChange={(e) => {
                      setSelected({ ...selected, name: e.target.value });
                    }}
                    value={selected.name}
                    className="mb-6"
                  ></TEInput>
                  <TEInput
                    type="text"
                    label="Apellido"
                    onChange={(e) => {
                      setSelected({ ...selected, lastName: e.target.value });
                    }}
                    value={selected.lastName}
                    className="mb-6"
                  ></TEInput>
                  <TEInput
                    type="email"
                    label="Email"
                    onChange={(e) => {
                      setSelected({ ...selected, email: e.target.value });
                    }}
                    value={selected.email}
                    className="mb-6"
                  ></TEInput>
                  <TEInput
                    type="text"
                    label="DNI"
                    onChange={(e) => {
                      setSelected({ ...selected, dni: e.target.value });
                    }}
                    value={selected.dni}
                    className="mb-6"
                  ></TEInput>
                  <TEInput
                    type="password"
                    label="Contraseña"
                    onChange={(e) => {
                      setSelected({ ...selected, password: e.target.value });
                    }}
                    value={selected.password}
                    className="mb-6"
                  ></TEInput>
                  <TEInput
                    type="date"
                    label="Fecha de inicio"
                    onChange={(e) => {
                      setSelected({ ...selected, startDate: e.target.value });
                    }}
                    value={selected.startDate}
                    className="mb-6"
                  ></TEInput>
                   <TESelect
                    data={[
                      { text: "Seleccione Horario", value: "" },
                      { text: "Mañana", value: "Mañana" },
                      { text: "Tarde", value: "Tarde" },
                      { text: "Noche", value: "Noche" },
                    ]}
                    label="Horario"
                    value={selected.workTime}
                    onValueChange={(e: any) => {
                      if (e) {
                        setSelected({ ...selected, workTime: e.value });
                      }
                    }}
                  />
                  <TEInput
                    type="text"
                    label="Porcentaje"
                    onChange={(e) => {
                      if(+e.target.value > 100){
                        setSelected({ ...selected, percentage: "100" });
                      }else{
                        setSelected({ ...selected, percentage: e.target.value });

                      }
                    }}
                    value={selected.percentage}
                    className="mb-6"
                  ></TEInput>


                  <TESelect
                    data={helpers.states}
                    label="Estado"
                    value={selected.state}
                    onValueChange={(e: any) => {
                      if (e) {
                        setSelected({ ...selected, state: e.value });
                      }
                    }}
                  />
                </div>
                    {
                      ShowDNIError &&                   <p className="text-red-500">El DNI no es valido</p>

                    }
                <TERipple rippleColor="light" className="w-full mt-2">
                  <button
                    type="button"
                    disabled={selected.state === 0 || selected.name === "" || selected.lastName === "" || selected.email === "" || selected.dni === "" || selected.password === "" || selected.startDate === "" || selected.workTime === "" || selected.percentage === "" || ShowDNIError}
                    onClick={() => {
                      if (selected.state === 0 || selected.name === "") {
                        alert("Debe llenar todos los campos");
                      } else {
                        if (mode === "create") {
                          console.log("create", selected);
                          const data = {
                            name: selected.name,
                            state: selected.state,
                            lastName: selected.lastName,
                            email: selected.email,
                            dni: selected.dni,
                            password: selected.password,
                            startDate: selected.startDate,
                            workTime: selected.workTime,
                            percentage: selected.percentage,


                          };
                          useApi.postData(data, () => {
                            setSelected({ state: 0, name: "", id: 0, lastName: "", email: "", dni: "",password: "", startDate: "",workTime: "",percentage: ""});
                            setShowModal(false);
                            useApi.callApi();
                          });
                        } else {
                          if (mode === "edit") {
                            console.log("edit", selected);
                            const data = {
                              name: selected.name,
                              state: selected.state,
                              lastName: selected.lastName,
                              email: selected.email,
                              dni: selected.dni,
                              password: selected.password,
                              startDate: selected.startDate,
                              workTime: selected.workTime,
                              percentage: selected.percentage,

                            };
                            useApi.putData(selected.id, data, () => {
                              setSelected({ state: 0, name: "", id: 0, lastName: "", email: "", dni: "",password: "", startDate: "",workTime: "",percentage: ""});
                              setShowModal(false);
                              useApi.callApi();
                            });
                          }
                        }
                      }
                    }}
                    className="block w-full rounded disabled:opacity-70 bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
                  >
                    {mode === "create" ? "Crear" : "Editar"}
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
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Empleados
            </h1>
          </div>
        </header>
        <div className="m-2">
          <button
            type="button"
            onClick={() => {
              setSelected({ state: 0, name: "", id: 0, lastName: "", email: "", dni: "",password: "", startDate: "",workTime: "",percentage: ""});
              setMode("create");
              setShowModal(true);
            }}
            className=" my-2 inline-block rounded bg-success
         px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal
          text-white shadow-[0_4px_9px_-4px_#14a44d]
           transition duration-150 ease-in-out
            hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]
             focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]
              focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
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
                       
                        <th scope="col" className="px-6 py-4">
                          Nombre
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Apellido
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Cedula
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Fecha de inicio
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Horario
                        </th>
                        <th scope="col" className="px-6 py-4">
                          porcentaje
                        </th>
                       
                        <th scope="col" className="px-6 py-4">
                          Estado
                        </th>
                        
                        <th scope="col" className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {(useApi.data || []).map((row: any) => (
                        <tr
                          key={row.id}
                          className="border-b dark:border-neutral-500"
                        >
                        
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.lastName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.email}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.dni}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.startDate}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.workTime}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.percentage}%
                          </td>
                        
                          <td className="whitespace-nowrap px-6 py-4">
                            {helpers.getState(+row.state)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <button
                              type="button"
                              onClick={() => {
                                setSelected({
                                  state: +row.state,
                                  name: row.name,
                                  id: row.id,
                                  lastName: row.lastName,
                                  email: row.email,
                                  dni: row.dni,
                                  password: row.password,
                                  startDate: row.startDate,
                                  workTime: row.workTime,
                                  percentage: row.percentage,
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
                                  setSelected({ state: 0, name: "", id: 0, lastName: "", email: "", dni: "",password: "", startDate: "",workTime: "",percentage: ""});
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
  );
}

export default Employee;
