import "./LableGroup.css"
import { useNavigate } from    "react-router-dom"; 
export default function LableGroup({image,name,id}) {
    const navigate = useNavigate();
    const linktogroup = () => {
        navigate(`/groups/${id}` );
    };

    return (
        <button className="labelItem" onClick={linktogroup}> 
            <div className="image-group">
                <img className="img-gr" src={image} alt="anh"/>
                

            </div>
            <div className="name-group">
                <h4 style={{margin:"5px 0 0 5px",textAlign:'start'}}> {name}</h4>

            </div>

        </button>
    )
}