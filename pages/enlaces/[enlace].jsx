import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';

//maneja la respuesta que va obtener
export async function getServerSideProps({params}){// ó (props)//getStaticProps
    const {enlace} = params;
    const respuesta = await clienteAxios.get(`/api/enlaces/${enlace}`); 
    //console.log(respuesta);

    return {
        props: {
            enlace: respuesta.data
        }
    }
}

//ayuda ha accederal getStaticProps
export async function getServerSidePaths() {//getStaticPaths
    const respuesta = await clienteAxios('/api/enlaces');

    return {
        paths: respuesta.data.enlaces.map(enlace => ({
            params:{enlace: enlace.url}//enlace: hace referencia al nombre de este archivo, enlace.url: instancia de enlaces
        })),// string o array de urls
        fallback: false//boolean, true: muestra algo, false:muestra paguina 404
    }
}

export default ({enlace}) => {//enlace proviene de getStaticProps
    console.log(enlace);
    return(
        <Layout>
            <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
             <div className="flex items-center justify-center mt-10">
                 <a 
                    download
                    href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                    className="bg-red-500 text-center px-3 py-3 rounded uppercase font-bold text-white cursor-pointer"
                >Descargar</a>
             </div>
        </Layout>
    )
}