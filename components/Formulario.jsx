import React, {useState, useContext} from 'react';
import appContext from '../context/app/appContext';

const Formulario = () => {
    const Appcontext = useContext(appContext);
    const {agregarPassword, agregarDescargas} = Appcontext;

    const [password, setPassword] = useState(false);

    const sobreCambios = () => {
        setPassword(!password);
        agregarPassword('');
    }

    return (
        <div className='w-full mt-20'>
            <div>
                <label className="text-lg text-gray-800">Cantidad de descargas:</label>
                <select 
                    defaultValue="1"
                    onChange={(e) => agregarDescargas(e.target.value) }
                    className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'
                >
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div className='mt-4 '>
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">Proteger con contraseña:</label>
                    <input type="checkbox" onChange={()=> {sobreCambios()}}/>
                    
                </div>
                {
                    password?
                    <input 
                        type="password" 
                        placeholder='Ingrese contraseña'
                        className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'
                        onChange={(e)=> agregarPassword(e.target.value)}
                    />: null
                }
            </div>
        </div>
    )
}

export default Formulario;
