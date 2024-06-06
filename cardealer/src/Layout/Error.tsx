import Layout from "./Layout";

export default function Error() {
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
       <Layout>
         
         <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
           <div className="max-w-lg">
             <p className="text-base font-semibold leading-8 text-indigo-600">404</p>
             <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Pagina no encontrada</h1>
             <p className="mt-6 text-base leading-7 text-gray-600">
               La página que buscas no existe. Por favor verifica la URL en la barra de direcciones y vuelve a intentarlo.
             </p>
             <div className="mt-10">
               <a href="/" className="text-sm font-semibold leading-7 text-indigo-600">
                 <span aria-hidden="true">&larr;</span> Volver a la página de inicio
               </a>
             </div>
           </div>
         </main>
       
       </Layout>
      </>
    )
  }
  