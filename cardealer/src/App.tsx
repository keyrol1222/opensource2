import React, { Fragment, ReactNode, Suspense } from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Views/Home";
import Login from "./Views/Login";
import CarType from "./Views/CarType";
import Error from "./Layout/Error";
import Fuel from "./Views/Fuel";
import Brand from "./Views/Brand";
import Model from "./Views/Model";
import Vehicle from "./Views/Vehicles";
import Client from "./Views/Client";
import Employee from "./Views/Employee";
import Rent from "./Views/Rent";

export function useUserRoles() {
  const Rol = localStorage.getItem("Role");
  const userRole = Rol && Rol !== "undefined" ? Rol : "public";
  return userRole;
}
export function RolesAuthRoute({
  children,
  rol,
}: {
  children: ReactNode;
  rol: Array<string>;
}) {
  const userRoles = useUserRoles();

  const canAccess = rol.some((userRole) => userRole.includes(userRoles));

  if (canAccess) return <Fragment>{children}</Fragment>;

  return <Navigate to="/login" />;
}
function App() {
  return (
   
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              
              element={
                <Suspense fallback={<></>}>
                  <RolesAuthRoute rol={["admin"]}>
                    <Home />
                  </RolesAuthRoute>
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Login />
              }
            />
            <Route
              path="/tipo-carro"
              element={
                
                <Suspense fallback={<></>}>
                  <RolesAuthRoute rol={["admin"]}>
                  <CarType />
                  </RolesAuthRoute>
                </Suspense>
              }
            />
            <Route
              path="/combustible"
              element={
                
                <Suspense fallback={<></>}>
                  <RolesAuthRoute rol={["admin"]}>
                  <Fuel />
                  </RolesAuthRoute>
                </Suspense>
              }
            />
             <Route
              path="/marca"
              element={
                
                <Suspense fallback={<></>}>
                  <RolesAuthRoute rol={["admin"]}>
                  <Brand />
                  </RolesAuthRoute>
                </Suspense>
              }
            />
             <Route
              path="/modelo"
              element={
                
                <Suspense fallback={<></>}>
                  <RolesAuthRoute rol={["admin"]}>
                  <Model />
                  </RolesAuthRoute>
                </Suspense>
              }
            />
             <Route
              path="/vehiculo"
              element={
                
                <Suspense fallback={<></>}>
                  <RolesAuthRoute rol={["admin"]}>
                  <Vehicle />
                  </RolesAuthRoute>
                </Suspense>
              }
            />
             <Route
              path="/cliente"
              element={
                
                <Suspense fallback={<></>}>
                <RolesAuthRoute rol={["admin"]}>
                <Client />
                </RolesAuthRoute>
              </Suspense>
              }
            />
             <Route
              path="/empleado"
              element={
                
                <Suspense fallback={<></>}>
                <RolesAuthRoute rol={["admin"]}>
                <Employee />
                </RolesAuthRoute>
              </Suspense>
              }
            />
             <Route
              path="/renta"
              element={
                
                <Suspense fallback={<></>}>
                <RolesAuthRoute rol={["admin"]}>
                <Rent />
                </RolesAuthRoute>
              </Suspense>
              }
            />
            <Route path="*" element={<Error/>} />
          </Routes>
        </BrowserRouter>
      </>
 
  );
}

export default App;
