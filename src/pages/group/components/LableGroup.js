import "./LableGroup.css"
export default function LableGroup({image,name}) {
    return (
        <div className="labelItem">
            <div className="image-group">
                <img className="img-gr" src={image} alt="anh"/>
                

            </div>
            <div className="name-group">
                <h4 style={{margin:"5px 0 0 0"}}> {name}</h4>

            </div>

        </div>
    )
}