import React, {useReducer} from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
} from "../../types";

const AuthState = ({children}) => {//ó (props)

    const initialState = {
        token:'',
        autenticado:null,
        usuario:null,
        mensaje:null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios',datos);

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
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    const usuarioAutenticado = (nombre) => {
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload:nombre
        });
    }

    return(
        <authContext.Provider
            value={{
                token:state.token,
                autenticado:state.autenticado,
                usuario:state.usuario,
                mensaje:state.mensaje,
                registrarUsuario,
                usuarioAutenticado 
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;