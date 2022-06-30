import React from "react";
import axios from "axios";
import Card from "./Card";

function Main() {

    const [bounties, setBounties] = React.useState([]);

    const formInit = {
        first: "",
        last: "",
        type: "",
        amount: ""
    }
    const [formData, setFormData] = React.useState(formInit)

    const getBounties = () => {
        axios.get("/bounty").then(res => {
            console.log(res.data);
            setBounties(res.data);
        })
    }

    const updateBounty = (obj, id) => {
        axios.put(`/bounty/${id}`, obj).then(res => {
            setBounties(res.data);
        })
    }

    const handleSubmit = () => {
        axios.post("/bounty", formData).then(res => {
            setBounties(res.data);
        });
        setFormData(formInit)
    }

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDelete = (id) => {
        axios.delete(`/bounty/${id}`).then(res=>{
            setBounties(res.data);
        })
    }

    React.useEffect(() => {
        getBounties();
    }, [])

    return (
        <div>

            <div style={{ textAlign: "center" }}>
                <form onSubmit={handleSubmit}>
                    <input name="first" placeholder="first" value={formData.first} onChange={handleChange} required />
                    <input name="last" placeholder="last" value={formData.last} onChange={handleChange} required />
                    <input name="type" placeholder="type" value={formData.type} onChange={handleChange} required />
                    <input name="amount" placeholder="bounty" value={formData.amount} onChange={handleChange} required />
                    <button>submit</button>
                </form>
            </div>

            {bounties.map((bounty, index) => {
                return <Card {...bounty} delete={handleDelete} update={updateBounty} key={index} />
            })}
        </div>
    )
}

export default Main;