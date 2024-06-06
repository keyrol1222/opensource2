import React, { useEffect, useState } from "react";
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
import { getStateRent, states } from "../../Utils/helpers";
import * as XLSX from "xlsx";
import { useApiData } from "../../Services/actions";
type item = {
  state: number;
  amount: number;
  days: number;
  comment: string;
  date: string;
  Employee: number;
  car: number;
  user: number;
  id: number;
};
function Rent() {
  const [showModal, setShowModal] = useState(false);
  const [ShowValidation, setShowValidation] = useState(false);
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [selected, setSelected] = useState<item>({
    state: 0,
    amount: 0,
    days: 0,
    comment: "",
    Employee: 0,
    car: 0,
    user: 0,
    id: 0,
    date: "",
  });
  const [filter, setFilter] = useState<any>({
    state: 0,
    amount: 0,
    days: 0,
    comment: "",
    Employee: 0,
    car: 0,
    user: 0,
    id: 0,
    returnDate: "",
    rentDate: "",
  });
  const [revision, setRevision] = useState<any>({
    scratch: false,
    fuel: "",
    etc: "",
    tire: false,
    jack: false,
    brokenGlass: false,
    tireState: {
      frontLeft: false,
      frontRight: false,
      backLeft: false,
      backRight: false,
    },
  });
  const [filteredData, setFilteredData] = useState([]);
  const [Inspeccions, setInspeccions] = useState([]);
  const [currentCLient, setCurrentClient] = useState<any>({});
  const [LimitExceeded, setLimitExceeded] = useState(false);
  const [mode, setMode] = useState("create");
  const useApi = useApiData("rents");
  const useApiUsers = useApiData("users");
  const useApiCars = useApiData("cars");
  const useApiInspeection = useApiData("inspections");
  React.useEffect(() => {
    useApiUsers.callApi();
    useApi.callApi();
    useApiCars.callApi();
  }, []);
  React.useEffect(() => {
    if (useApi.data) {
      setFilteredData(useApi.data);
    }
  }, [useApi.data]);
  React.useEffect(() => {
    if(selected.user){
      const user = useApiUsers.data.find((e: any) => e.id === +selected.user);
      setCurrentClient(user);
    }
  }, [selected.user]);
  React.useEffect(() => {
    if (useApiInspeection.data) {
      setInspeccions(useApiInspeection.data);
    }
  }, [useApiInspeection.data]);
  useEffect(() => {
    const applyFilter = (item: {
      state: number;
      user: { id: number };
      car: { id: number };
      amount: number;
      days: number;
      comment: string;
      returnDate: string;
      rentDate: string;
    }) => {
      const formatDateForFIlter = (date: string) => {
        // const d = new Date(formatDate(date)).toISOString();
        return date.split("T")[0];
      };
      return (
        (filter.state === 0 || item.state === filter.state) &&
        (filter.user === 0 || item.user.id === filter.user) &&
        (filter.car === 0 || item.car.id === filter.car) &&
        (filter.amount === 0 ||
          `${item.amount}`.includes(`${filter.amount}`)) &&
        (filter.days === 0 || `${item.days}`.includes(`${filter.days}`)) &&
        (filter.comment === "" || item.comment.includes(filter.comment)) &&
        (filter.returnDate === "" ||
          formatDateForFIlter(item.returnDate).includes(
            formatDateForFIlter(filter.returnDate)
          )) &&
        (filter.rentDate === "" ||
          formatDateForFIlter(item.rentDate).includes(filter.rentDate))
      );
    };

    const filtered =
      filter.state !== 0 ||
      filter.user !== 0 ||
      filter.car !== 0 ||
      filter.amount !== 0 ||
      filter.days !== 0 ||
      filter.comment !== "" ||
      filter.returnDate !== "" ||
      filter.rentDate !== ""
        ? useApi.data.filter(applyFilter)
        : useApi.data;

    setFilteredData(filtered);
  }, [filter]);
  React.useEffect(() => {
    if (useApiUsers.data) {
      const filtered = useApiUsers.data.filter((e: any) => e.state === "1");
      setUsers(
        filtered.map((item: any) => {
          return { text: item.name, value: item.id };
        })
      );
    }
  }, [useApiUsers.data]);
  React.useEffect(() => {
    if (useApiCars.data) {
      const filtered = useApiCars.data.filter((e: any) => e.state === "1");
      setCars(
        filtered.map((item: any) => {
          return { text: item.desc, value: item.id };
        })
      );
    }
  }, [useApiCars.data]);
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  };
  const exportToExcel = () => {
    const formattedData = filteredData.map(
      (item: {
        id: any;
        rentDate: string | number | Date;
        returnDate: string | number | Date;
        amount: any;
        days: any;
        comment: any;
        state: any;
        employee: {
          name: any;
          lastName: any;
          dni: any;
          workTime: any;
          email: any;
        };
        car: {
          desc: any;
          chasis: any;
          motor: any;
          plate: any;
          type: { desc: any };
          brand: { desc: any };
          model: { desc: any };
          fuel: { desc: any };
        };
        user: { name: any; lastName: any; dni: any; email: any; type: any };
      }) => ({
        ID: item.id,
        "Fecha de Alquiler": new Date(item.rentDate).toLocaleDateString(
          "es-ES"
        ),
        "Fecha de Devolución": item.returnDate
          ? new Date(item.returnDate).toLocaleDateString("es-ES")
          : "",
        Monto: item.amount,
        Días: item.days,
        Comentario: item.comment,
        Estado: item.state,
        "Empleado Nombre": `${item.employee.name} ${item.employee.lastName}`,
        "Empleado DNI": item.employee.dni,
        "Empleado Horario": item.employee.workTime,
        "Empleado Email": item.employee.email,
        "Carro Descripción": item.car.desc,
        "Carro Chasis": item.car.chasis,
        "Carro Motor": item.car.motor,
        "Carro Placa": item.car.plate,
        "Carro Tipo": item.car.type.desc,
        "Carro Marca": item.car.brand.desc,
        "Carro Modelo": item.car.model.desc,
        "Carro Combustible": item.car.fuel.desc,
        "Usuario Nombre": `${item.user.name} ${item.user.lastName}`,
        "Usuario DNI": item.user.dni,
        "Usuario Email": item.user.email,
        "Usuario Tipo": item.user.type,
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

    XLSX.writeFile(workbook, "reporte.xlsx");
  };

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
                <TESelect
                    data={[
                      {
                        value: 0,
                        text: "seleccionar cliente",
                      },
                      ...users,
                    ]}
                    label="Cliente"
                    value={selected.user}
                    onValueChange={(e: any) => {
                      setLimitExceeded(false);
                      
                      if (e) {
                        setSelected({ ...selected, user: e.value, amount: 0});
                      }
                    }}
                  />
                  
                  <TESelect
                    data={[
                      {
                        value: 0,
                        text: "seleccionar carro",
                      },
                      ...cars,
                    ]}
                    label="Vehiculo"
                    value={selected.car}
                    onValueChange={(e: any) => {
                      if (e) {
                        setSelected({ ...selected, car: e.value });
                      }
                    }}
                  />
                  <TEInput
                    type="number"
                    label="Monto"
                    max={currentCLient.creditLimit || 0}
                    min={0}
                    onChange={(e) => {
                      setLimitExceeded(false);
                      if(+e.target.value > currentCLient.creditLimit){
                        setLimitExceeded(true);
                      }
                      setSelected({ ...selected, amount: +e.target.value });
                    }}
                    value={selected.amount}
                    className="mb-6"
                  ></TEInput>

                 
                  <TEInput
                    type="number"
                    label="Dias"
                    min={0}
                    onChange={(e) => {
                      setSelected({ ...selected, days: +e.target.value });
                    }}
                    value={selected.days}
                    className="mb-6"
                  ></TEInput>
                   <TEInput
                    type="text"
                    label="Comentarios"
                    onChange={(e) => {
                      setSelected({ ...selected, comment: e.target.value });
                    }}
                    value={selected.comment}
                    className="mb-6"
                  ></TEInput>
                 
                </div>
                    {
                      LimitExceeded && (
                        <div className="text-red-500 text-xs">
                          El monto excede el limite de credito
                        </div>
                      )
                    }
                <TERipple rippleColor="light" className="w-full mt-2">
                  <button
                    type="button"
                    disabled={
                      selected.amount === 0 ||
                      selected.days === 0 ||
                      selected.car === 0 ||
                      selected.user === 0 ||
                      LimitExceeded
                    }
                    onClick={() => {
                      if (
                        selected.amount === 0 ||
                        selected.days === 0 ||
                        selected.car === 0 ||
                        selected.user === 0 ||
                        LimitExceeded
                      ) {
                        alert("Debe llenar todos los campos");
                      } else {
                        if (mode === "create") {
                         
                          const employeeId =
                            localStorage.getItem("userId") || 0;
                          const data = {
                            state: "3",
                            amount: selected.amount,
                            days: selected.days,
                            comment: selected.comment,
                            employee: +employeeId,
                            car: selected.car,
                            user: selected.user,
                            rentDate: new Date().toISOString(),
                            returnDate: "",
                          };
                          useApi.postData(data, () => {
                            setSelected({
                              state: 0,
                              amount: 0,
                              days: 0,
                              comment: "",
                              Employee: 0,
                              car: 0,
                              user: 0,
                              id: 0,
                              date: "",
                            });
                            setShowModal(false);
                            useApi.callApi();
                          });
                        } else {
                          if (mode === "edit") {
                            console.log("edit", selected);
                            const data = {};
                            useApi.putData(selected.id, data, () => {
                              setSelected({
                                state: 0,
                                amount: 0,
                                days: 0,
                                comment: "",
                                Employee: 0,
                                car: 0,
                                user: 0,
                                id: 0,
                                date: "",
                              });
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
      <TEModal show={ShowValidation} setShow={setShowValidation}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Inspección
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
                {/* 
Tiene Ralladuras
Cantidad Combustible (1/4, ½, ¾, lleno) 
Tiene Goma respuesta
Tiene Gato
Tiene roturas cristal
Estado gomas (un check para cada una)
Etc. 


                */}
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      value={revision.scratch}
                      onChange={(e) => {
                        setRevision({ ...revision, scratch: e.target.checked });
                      }}
                      id="scratch"
                    />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="scratch"
                    >
                      Tiene Ralladuras
                    </label>
                  </div>
               
                  <div>
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow
          -[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:absolute checked:focus:after:z-[1] checked:focus:after:block checked:focus:after:h-[0.875rem] checked:focus:after:w-[0.875rem] checked:focus:after:rounded-[0.125rem] checked:focus:after:content-[''] dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      value={revision.tire}
                      onChange={(e) => {
                        setRevision({ ...revision, tire: e.target.checked });
                      }}
                      id="tire"
                    />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="tire"
                    >
                      Tiene Goma respuesta
                    </label>
                  </div>
                  <div>
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow
          -[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:absolute checked:focus:after:z-[1] checked:focus:after:block checked:focus:after:h-[0.875rem] checked:focus:after:w-[0.875rem] checked:focus:after:rounded-[0.125rem] checked:focus:after:content-[''] dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      value={revision.jack}
                      onChange={(e) => {
                        setRevision({ ...revision, jack: e.target.checked });
                      }}
                      id="jack"
                    />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="jack"
                    >
                      Tiene Gato
                    </label>
                  </div>
                  <div>
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow
          -[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:absolute checked:focus:after:z-[1] checked:focus:after:block checked:focus:after:h-[0.875rem] checked:focus:after:w-[0.875rem] checked:focus:after:rounded-[0.125rem] checked:focus:after:content-[''] dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      value={revision.brokenGlass}
                      onChange={(e) => {
                        setRevision({
                          ...revision,
                          brokenGlass: e.target.checked,
                        });
                      }}
                      id="brokenGlass"
                    />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="brokenGlass"
                    >
                      Tiene roturas cristal
                    </label>
                  </div>
                 
                </div>
                <hr />
                <div className="grid grid-cols-2 gap-4 mt-3 border-gray-700 p-4">
                 <div>
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow
          -[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:absolute checked:focus:after:z-[1] checked:focus:after:block checked:focus:after:h-[0.875rem] checked:focus:after:w-[0.875rem] checked:focus:after:rounded-[0.125rem] checked:focus:after:content-[''] dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      value={revision.tireState.frontLeft}
                      onChange={(e) => {
                        setRevision({
                          ...revision,
                          tireState: {
                            ...revision.tireState,
                            frontLeft: e.target.checked,
                          },
                        });
                      }}
                      id="tireStateFrontLeft"
                    />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="tireStateFrontLeft"
                    >
                      Estado gomas ( izquierda delantera)
                    </label>
                  </div>
                  <div>
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow
          -[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:absolute checked:focus:after:z-[1] checked:focus:after:block checked:focus:after:h-[0.875rem] checked:focus:after:w-[0.875rem] checked:focus:after:rounded-[0.125rem] checked:focus:after:content-[''] dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      value={revision.tireState.frontRight}
                      onChange={(e) => {
                        setRevision({
                          ...revision,
                          tireState: {
                            ...revision.tireState,
                            frontRight: e.target.checked,
                          },
                        });
                      }}
                      id="tireStateFrontRight"
                    />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="tireStateFrontRight"
                    >
                      Estado gomas ( derecha delantera)
                    </label>
                  </div>
                  <div>
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow
          -[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:absolute checked:focus:after:z-[1] checked:focus:after:block checked:focus:after:h-[0.875rem] checked:focus:after:w-[0.875rem] checked:focus:after:rounded-[0.125rem] checked:focus:after:content-[''] dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      value={revision.tireState.rearLeft}
                      onChange={(e) => {
                        setRevision({
                          ...revision,
                          tireState: {
                            ...revision.tireState,
                            rearLeft: e.target.checked,
                          },
                        });
                      }}
                      id="tireStateRearLeft"
                    />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="tireStateRearLeft"
                    >
                      Estado gomas ( izquierda trasera) 
                    </label>
                  </div>
                  <div>
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow
          -[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:absolute checked:focus:after:z-[1] checked:focus:after:block checked:focus:after:h-[0.875rem] checked:focus:after:w-[0.875rem] checked:focus:after:rounded-[0.125rem] checked:focus:after:content-[''] dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      value={revision.tireState.rearRight}
                      onChange={(e) => {
                        setRevision({
                          ...revision,
                          tireState: {
                            ...revision.tireState,
                            rearRight: e.target.checked,
                          },
                        });
                      }}
                      id="tireStateRearRight"
                    />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="tireStateRearRight"
                    >
                      Estado gomas (derecha trasera)
                    </label>
                  </div>
                  
                 </div>
                 <hr />
                 <div className="grid grid-cols-2 gap-4 p-4 mt-3" >   <TESelect
                    data={[
                      {
                        value: "1/4",
                        text: "1/4",
                      },
                      {
                        value: "1/2",
                        text: "1/2",
                      },
                      {
                        value: "3/4",
                        text: "3/4",
                      },
                      {
                        value: "lleno",
                        text: "lleno",
                      },
                    ]}
                    label="Combustible"
                    value={revision.fuel}
                    onValueChange={(e: any) => {
                      if (e) {
                        setRevision({ ...revision, fuel: e.value });
                      }
                    }}
                  />
                   <TEInput
                    type="text"
                    label="Extra"
                    onChange={(e) => {
                      setRevision({ ...revision, etc: e.target.value });
                    }}
                    value={revision.etc}
                    className="mb-6"
                  ></TEInput>
                  
                  </div>
                <TERipple rippleColor="light" className="w-full mt-2">
                  <button
                    type="button"
                    disabled={
                      revision.scratch === false ||
                      revision.tire === false ||
                      revision.jack === false ||
                      revision.brokenGlass === false ||
                      revision.fuel === ""
                    }
                    onClick={() => {
                      if (
                        revision.scratch === false ||
                        revision.tire === false ||
                        revision.jack === false ||
                        revision.brokenGlass === false ||
                        revision.fuel === ""
                      ) {
                        alert("Debe llenar todos los campos");
                      } else {
                        if (mode === "create") {
                          console.log("create", revision);
                          const employeeId =
                            localStorage.getItem("userId") || 0;
                          const getAmountOfGoodWheels = () => {
                            let amount = 0;
                            if (revision.tireState.frontLeft) amount++;
                            if (revision.tireState.frontRight) amount++;
                            if (revision.tireState.rearLeft) amount++;
                            if (revision.tireState.rearRight) amount++;
                            return amount;
                          };
                          const data = {
                            car: selected.car,
                            user: selected.user,
                            employee: employeeId,
                            rent: selected.id,
                            haveScratch: revision.scratch,
                            haveSubstitute: revision.tire,
                            haveCat: revision.jack,
                            haveBrokenGlass: revision.brokenGlass,
                            gasAmount: revision.fuel,
                            wheelState: getAmountOfGoodWheels(),
                            date: new Date().toISOString(),
                            etc: revision.etc,
                            state: "4",
                          };
                          
                          useApiInspeection.postData(data, () => {
                            setSelected({
                              state: 0,
                              amount: 0,
                              days: 0,
                              comment: "",
                              Employee: 0,
                              car: 0,
                              user: 0,
                              id: 0,
                              date: "",
                            });
                            const dataRent = {
                              state: "4",
                              amount: selected.amount,
                              days: selected.days,
                              comment: selected.comment,
                              employee: +employeeId,
                              car: selected.car,
                              user: selected.user,
                              rentDate: selected.date,
                              returnDate: new Date().toISOString(),
                              id: selected.id,
                            };
                            setRevision({
                              scratch: false,
                              tire: false,
                              jack: false,
                              brokenGlass: false,
                              fuel: "",
                              tireState: {
                                frontLeft: false,
                                frontRight: false,
                                rearLeft: false,
                                rearRight: false,
                              },
                              etc: "",
                            });
                            useApi.putData(selected.id, dataRent, () => {
                              setSelected({
                                state: 0,
                                amount: 0,
                                days: 0,
                                comment: "",
                                Employee: 0,
                                car: 0,
                                user: 0,
                                id: 0,
                                date: "",
                              });
                              setRevision({
                                scratch: false,
                                tire: false,
                                jack: false,
                                brokenGlass: false,
                                fuel: "",
                                tireState: {
                                  frontLeft: false,
                                  frontRight: false,
                                  rearLeft: false,
                                  rearRight: false,
                                },
                                etc: "",
                              });
                              setShowModal(false);
                              setShowValidation(false);
                              useApi.callApi();
                              useApiInspeection.callApi();
                            });
                           
                            
                          });
                        } else {
                          if (mode === "edit") {
                            console.log("edit", selected);
                            const data = {};
                            useApi.putData(selected.id, data, () => {
                              setSelected({
                                state: 0,
                                amount: 0,
                                days: 0,
                                comment: "",
                                Employee: 0,
                                car: 0,
                                user: 0,
                                id: 0,
                                date: "",
                              });
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
              Renta y devolución
            </h1>
          </div>
        </header>
        <div className="m-2">
          <button
            type="button"
            onClick={() => {
              setSelected({
                state: 0,
                amount: 0,
                days: 0,
                comment: "",
                Employee: 0,
                car: 0,
                user: 0,
                id: 0,
                date: "",
              });
              setMode("create");
              setShowModal(true);
            }}
            className=" my-2 inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
          >
            Agregar
          </button>
          {/* create selects to filter the table */}
          <div className="grid grid-cols-3 gap-4">
            <TESelect
              data={states}
              label="Estado"
              value={filter.state}
              onValueChange={(e: any) => {
                if (e) {
                  setFilter({ ...filter, state: e.value });
                }
              }}
            />
            <TESelect
              data={[
                {
                  value: 0,
                  text: "seleccionar carro",
                },
                ...users,
              ]}
              label="Cliente"
              value={filter.user}
              onValueChange={(e: any) => {
                if (e) {
                  setFilter({ ...filter, user: e.value });
                }
              }}
            />
            <TESelect
              data={[
                {
                  value: 0,
                  text: "seleccionar cliente",
                },
                ...cars,
              ]}
              label="Vehiculo"
              value={filter.car}
              onValueChange={(e: any) => {
                if (e) {
                  setFilter({ ...filter, car: e.value });
                }
              }}
            />
            <TEInput
              type="number"
              label="Monto"
              onChange={(e) => {
                setFilter({ ...filter, amount: +e.target.value });
              }}
              value={filter.amount}
              className="mb-6"
            ></TEInput>
            <TEInput
              type="number"
              label="Dias"
              onChange={(e) => {
                setFilter({ ...filter, days: +e.target.value });
              }}
              value={filter.days}
              className="mb-6"
            ></TEInput>
            <TEInput
              type="text"
              label="Comentarios"
              onChange={(e) => {
                setFilter({ ...filter, comment: e.target.value });
              }}
              value={filter.comment}
              className="mb-6"
            ></TEInput>
            
            <TEInput
              type="date"
              label="Fecha de renta"
              onChange={(e) => {
                setFilter({ ...filter, rentDate: e.target.value });
              }}
              value={filter.rentDate}
              className="mb-6"
            ></TEInput>
            <TEInput
              type="date"
              label="Fecha de devolución"
              
              onChange={(e) => {
                setFilter({ ...filter, returnDate: e.target.value });
              }}
              value={filter.returnDate}
              className="mb-6"
            ></TEInput>
            {/* exportar a csv */}
          </div>
          <div className="m-2">
            <button
              type="button"
              onClick={exportToExcel}
              className=" my-2 inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            >
              Exportar a CSV
            </button>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Monto
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Dias
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Comentarios
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Empleado
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Carro
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Usuario
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Fecha de renta
                        </th>
                        <th scope="col" className="px-6 py-4">
                        Fecha de devolución
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Estado
                        </th>
                        <th scope="col" className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {(filteredData || []).map((row: any) => (
                        <tr
                          key={row.id}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.amount}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.days}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.comment}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.employee.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.car.desc}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.user.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {formatDate(row.rentDate)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.returnDate !== '' && row.returnDate !== undefined && row.returnDate !== null ? formatDate(row.returnDate) : ''}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {getStateRent(row.state)}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                           {
                            row.state != 4 ? ( <button
                              type="button"
                              onClick={() => {
                                setShowValidation(true);
                                setSelected({
                                  state: row.state,
                                  amount: row.amount,
                                  days: row.days,
                                  comment: row.comment,
                                  Employee: row.employee.id,
                                  car: row.car.id,
                                  user: row.user.id,
                                  id: row.id,
                                date: row.rentDate,
                                });
                              }}
                              className="inline-block rounded-full bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                            >
                              Devolver
                            </button>) : null
                           }
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

export default Rent;
