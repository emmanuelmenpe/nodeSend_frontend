import React, {useContext, useEffect} from 'react';
import { useRouter } from "next/router";
import Head from 'next/head';
import Layout from '../components/Layout';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import authContext from '../context/auth/authContext';
import Alerta from '../components/Alerta';

const login = () => {
    const router = useRouter();
    const AuthContext = useContext(authContext);
    const {mensaje,autenticado, iniciarSesion } = AuthContext;

    useEffect(() => {
        if (autenticado) {
            router.push('/');
        }
    }, [autenticado])

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema: Yup.object({//schema de validacion con un objeto de yup
            email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
            password: Yup.string().required('La contraseña es obligatoria')
        }),
        onSubmit: (valores) => {//al hacer submit
            iniciarSesion(valores); 
        }
    });

  return (
    <Layout>
        <Head>
            <title>Iniciar sesión</title>
        </Head>
        <div className="md:4/5 xl:w-3/5 mx-auto mb-32">
          <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Iniciar sesión</h2>
          {mensaje && <Alerta/>? <Alerta/>:null}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
                <form 
                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 md-4"
                    onSubmit={formik.handleSubmit}
                >
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
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email? 
                            <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.email}</p>
                            </div>:null
                        }
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
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password? 
                            <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.password}</p>
                            </div>:null
                        }
                    </div>
                    <input 
                        type="submit" 
                        value="Iniciar sesión" 
                        className="bg-red-500 hover:bg-red-600 w-full p-2 text-white uppercase font-bold"
                    />
                </form>
            </div>
          </div>
        </div>
    </Layout>
  )
};

export default login
