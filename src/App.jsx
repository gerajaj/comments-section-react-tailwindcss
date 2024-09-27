/* import AmyRobson from "./assets/images/avatars/image-amyrobson.png" */
import IconReply from "./components/icons/iconReply.jsx"
import CommentSection from "./components/CommentSection/CommentSection.jsx"

/* 
Primero vamos a terminar la tarjeta 
Después vamos a crear la caja de comentarios
Más adelante vamos a hacer lo del JSON
Vamos a programar los botones de reply, delete y el contador
Y al fina vamos a afinar detalles
*/

const App = () => {
    return (
        <>
            <div className="bg-very-light-gray h-[600px] w-[375px] mx-auto">
                <CommentSection />
            </div >
        </>
    )
}
export default App;