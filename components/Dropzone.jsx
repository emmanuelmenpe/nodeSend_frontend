import React, { useCallback, useContext} from 'react';
import {useDropzone} from 'react-dropzone';
import clienteAxios from '../config/axios';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';
import Formulario from './Formulario';

const Dropzone = () => {
    const Appcontext = useContext(appContext);
    const {cargando, mostrarAlerta, subirArchivo, crearEnlace} = Appcontext;
    
    const AuthContext = useContext(authContext);
    const {usuario, autenticado} = AuthContext;
    
    const onDropRejected = () => {
        mostrarAlerta('no se pudo subir el archivo, limite 5MB, cree una cuenta para mas beneficios');
        
    }

    const onDropAccepted = useCallback(async(acceptedFiles) => {//useCallback evita que re repita multipla veces un renderizado o llamado de funcion 
        
        //crear un form data
        const formData = new FormData();
        formData.append('archivo',acceptedFiles[0]);
        subirArchivo(formData, acceptedFiles[0].path);
    }, []);

    const {
        getRootProps, 
        getInputProps, 
        isDragActive, //cambia a true cuando hay interaccion del dropzone con el archivo
        acceptedFiles //acepta los archivos
    } = useDropzone({
        //onDrop, //se ejecuta siempre que se sube archivo
        onDropAccepted, //acepta el archivo que pasa alguna validacion 
        onDropRejected,  //rechasa el archivo que no pasa alguna validacion
        maxSize:5000000//5 MB
    });

    const archivos = acceptedFiles.map(archivo => (
        <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold  text-xl">{archivo.path}</p>
            <p className="text-sm text-gray-500">{(archivo.size /Math.pow(1024, 2)).toFixed(2)} MB</p>
        </li>
    ))

    
    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
            
            {
                acceptedFiles.length > 0? (
                    <div className="mt-10 w-full">
                        <div className="text-2xl font-bold text-center mb-4">Arichivo</div>
                        <ul>
                            {archivos}
                        </ul>

                        {
                            autenticado? <Formulario />: null
                        }

                        {
                            cargando? <p className="my-10 text-center text-gray-600">Subiendo archivo...</p>: (
                                <button 
                                    onClick={()=>crearEnlace()}
                                    className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800">
                                    Crear enlace
                                </button>
                            )
                        }
                        
                    </div>
                    
                ):(
                <div {...getRootProps({className:'dropzone w-full py-32'})}>
                    <input className="h-100" {...getInputProps()}/>
                    {
                        isDragActive? 
                        <div className="text-center">
                            <p className="text-2xl text-gray-600">Suelta el archivo aquí</p> 
                        </div>
                        :
                        <div className="text-center">
                            <p className="text-2xl text-center text-gray-600">Selecciona un archivo o arrastra aquí</p>
                            <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800">Seleccionar archivo</button>
                        </div>
                    }
                </div>
                )
            }

            
            
        </div>
    )
}

export default Dropzone
