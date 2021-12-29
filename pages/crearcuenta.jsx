import React from 'react';
import Layout from '../components/Layout';

const crearcuenta = () => {
  return (
    <Layout>
      <div className="md:4/5 xl:w-3/5 mx-auto mb-32">
          <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Crear cuenta</h2>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
                <form action="" className="bg-white rounded shadow-md px-8 pt-6 pb-8 md-4">
                    <div className="mb-4">
                        <label 
                            htmlFor="nombre" 
                            className="block text-black text-sm font-bold mb-2"
                        >Nombre</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            id="nombre" 
                            className="shadow apprearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" 
                            placeholder="Nombre de usuario"
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="email" 
                            className="block text-black text-sm font-bold mb-2"
                        >Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="shadow apprearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" 
                            placeholder="Ingrese su email"
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="password" 
                            className="block text-black text-sm font-bold mb-2"
                        >contraseña</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            className="shadow apprearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" 
                            placeholder="Ingrtese su contraseña"
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Crear cuenta" 
                        className="bg-red-500 hover:bg-red-600 w-full p-2 text-white uppercase font-bold"
                    />
                </form>
            </div>
          </div>
      </div>
    </Layout>
  )
};

export default crearcuenta;
