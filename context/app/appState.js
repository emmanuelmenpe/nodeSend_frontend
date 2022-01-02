import React, {useReducer} from 'react';
import appReducer from './appReducer';
import appContext from './appContext';
import clienteAxios from '../../config/axios';
import { 
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    CREAR_ENLACE_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_ERROR
} from '../../types'

const AppState = ({children}) => {

    const initialState = {
        mensaje_archivo:null,
        nombre:null,
        nombre_original:null,
        cargando: false,
        descargas:1,
        password:'',
        autor:null, 
        url:''
    }

    const [state, dispatch] = useReducer(appReducer, initialState);

    const mostrarAlerta = (msg) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload:msg
        });
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 3000);
    }

    const subirArchivo = async(formData, nombreArchivo) => {
        try {
            const respuesta = await clienteAxios.post('/api/archivos', formData);
            //console.log(respuesta);
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload:{
                    nombre: respuesta.data.archivo,
                    nombre_original: nombreArchivo
                }
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload:error.response.data.msg
            })
        }
    }

    const crearEnlace = async() => {
        const data = {
            nombre:state.nombre,
            nombre_original:state.nombre_original,
            descargas:state.descargas,
            password:state.autor,
            autor:state.descargas
        }

        try {
            const resultado = await clienteAxios.post('/api/enlaces', data);
            dispatch({
                type:CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre:state.nombre,
                nombre_original:state.nombre_original,
                cargando:state.cargando,
                descargas:state.descargas,
                password:state.password,
                autor:state.autor,
                url:state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState;
