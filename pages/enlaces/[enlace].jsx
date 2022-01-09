import React, {useState,useContext, Fragment} from 'react';
import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios';
import appContext from '../../context/app/appContext';
import Alerta from '../../components/Alerta'

//maneja la respuesta que va obtener
export async function getServerSideProps({params}){// ó (props)//getStaticProps
    const {enlace} = params;
    //console.log(enlace); //sí llega enlace
    const respuesta = await clienteAxios.get(`/api/enlaces/${enlace}`); 
    console.log('getServerSideProps:::::::::::::::::::::::::.');
    console.log(respuesta.data);

    return {
        props: {
            enlace: respuesta.data
        }
    }
}

//ayuda ha accederal getStaticProps
export async function getServerSidePaths() {//getStaticPaths
    const respuesta = await clienteAxios.get('/api/enlaces');
    console.log('getServerSidePaths::::::::::::::::::::');
    console.log(respuesta.data);
    return {
        paths: respuesta.data.enlaces.map(enlace => ({
            params:{enlace: enlace.url}//enlace: hace referencia al nombre de este archivo, enlace.url: instancia de enlaces
        })),// string o array de urls
        fallback: false//boolean, true: muestra algo, false:muestra paguina 404
    }
}

export default ({enlace}) => {//enlace proviene de getStaticProps
    console.log('[enlace].js enlace recibido: ');
    console.log(enlace);
    const [tienePassword, setTienePassword] = useState(enlace.password);
    const [password, setPassword] = useState('');

    const Appcontext = useContext(appContext);
    const {mostrarAlerta, mensaje_archivo} = Appcontext;

    const verificarPassword =  async(e) => {
        e.preventDefault();
        const data = {
            password
        }

        try {
            const respuesta = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
            //console.log(respuesta);  
            setTienePassword(respuesta.data.password)
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }
    }
    
    return(
        <Layout>
            {
                tienePassword?
                    <Fragment>
                        <p className='text-center'>Enlace protegido con contraseña</p>
                        {mensaje_archivo && <Alerta />}
                        <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form 
                                    onSubmit={(e) => verificarPassword(e)}
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 md-4"
                                >
                                    <div className="mb-4">
                                        <label 
                                            htmlFor="password" 
                                            className="block text-black text-sm font-bold mb-2"
                                        >Contraseña</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            id="password" 
                                            className="shadow apprearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" 
                                            placeholder="Ingrese contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <input 
                                        type="submit" 
                                        value="Validar contraseña" 
                                        className="bg-red-500 hover:bg-red-600 w-full p-2 text-white uppercase font-bold"
                                    />
                                </form>
                            </div>
                        </div>
                    </Fragment>
                :
                    <Fragment>
                        <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
                        <div className="flex items-center justify-center mt-10">
                            <a 
                                download
                                href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                                className="bg-red-500 text-center px-3 py-3 rounded uppercase font-bold text-white cursor-pointer"
                            >Descargar</a>
                        </div>
                    </Fragment>
                
            }
            
        </Layout>
    )
}