import React, {useReducer} from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OCULTAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from "../../types";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({children}) => {//ó (props)

    const initialState = {
        /* next corre en el cliente y servidor, en el servidor no existe locaStorage.
            se hace una evaluacio para ver si window no esta indefinida
        */
        token: typeof window !== 'undefined'? localStorage.getItem('token') : '',
        autenticado:null,
        usuario:null,
        mensaje:null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios',datos);
            console.log(respuesta);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload:respuesta.data.msg
            });
        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: REGISTRO_ERROR,
                payload:error.response.data.msg
            });
        }

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000);
    }

    const iniciarSesion = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth',datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload:respuesta.data.token
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload:error.response.data.msg
            });
            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALERTA
                })
            }, 3000);
        }
    }

    const usuarioAutenticado = async(nombre) => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);    
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            
            if (respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                });   
            }
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                //payload:error.response.data.msg
            });
            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALERTA
                })
            }, 3000);
        }
    }

    const cerrarSesion = async () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <authContext.Provider
            value={{
                token:state.token,
                autenticado:state.autenticado,
                usuario:state.usuario,
                mensaje:state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;