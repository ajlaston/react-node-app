import React from "react";

function Card(props) {

    const [editing, setEditing] = React.useState(false);

    const [cardData, setCardData] = React.useState({
        first : props.first,
        last : props.last,
        type : props.type,
        amount : props.amount
    })

    const toggleEdit = () => {
        setEditing(prev => !prev);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCardData(prev=>({
            ...prev,
            [name] : value
        }))
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        props.update(cardData, props._id);
        toggleEdit();
    }

    const handleDelete = () => {
        props.delete(props._id);
    }

    return (

        editing ?

            <div style={{ border: "1px solid", height: "116px", margin: "10px", padding: "20px" }}>
                <form onSubmit={handleUpdate}>
                    <label style={{marginRight : "33px"}}>first:</label>
                    <input id="first" name="first" placeholder="first" onChange={handleChange} value={cardData.first} required />
                    <br />
                    <label style={{marginRight : "35px"}}>last:</label>
                    <input id="last" name="last" placeholder="last" onChange={handleChange} value={cardData.last} required />
                    <br />
                    <label style={{marginRight : "29px"}}>type:</label>
                    <input id="type" name="type" placeholder="type" onChange={handleChange} value={cardData.type} required />
                    <br />
                    <label style={{marginRight : "10px"}}>bounty:</label>
                    <input style={{marginBottom: "10px"}} id="amount" name="amount" placeholder="bounty" onChange={handleChange} value={cardData.amount} required />
                    <br/>
                    <button>save</button>
                </form>

            </div>

            :

            <div style={{ border: "1px solid", padding: "20px", margin: "10px" }}>
                <h4 style={{ margin: 0 }}>name: {props.first} {props.last}</h4>
                <p style={{ margin: 0}}>type: {props.type}</p>
                <p style={{margin : 0, marginBottom: "10px" }}>bounty: {props.amount}</p>
                <button style={{ width: "60px", marginBottom: "5px" }} onClick={toggleEdit}>edit</button>
                <br />
                <button style={{ width: "60px" }} onClick={handleDelete}>delete</button>
            </div>
    )
}

export default Card;