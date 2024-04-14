import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function ViewUser() {


    const [user, setUser] = useState({
        name: '',
        username: '',
        email: ''
    });

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/api/user/${id}`);
            setUser(result.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    return (
        <div className="container">
            <div className="row ">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">User Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of User id: {user.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Name:</b>
                                    {user.name}
                                </li>
                                <li className="list-group-item">
                                    <b>UserName:</b>
                                    {user.username}
                                </li>
                                <li className="list-group-item">
                                    <b>Email:</b>
                                    {user.email}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Link className="btn btn-primary my-2" to={"/"}>BackToHome</Link>
                </div>
            </div>
        </div>
    )
}

export default ViewUser;