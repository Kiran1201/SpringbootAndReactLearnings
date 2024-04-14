import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditUser() {

    const [user, setUser] = useState({
        name: '',
        username: '',
        email: ''
    });

    const {id} = useParams();

    let navigate = useNavigate();

    const { name, username, email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/api/user/${id}`, user);
        navigate("/");
    }



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
                    <h2 className="text-center m-4">Edit User</h2>
                    <form onSubmit={(e) => { onSubmit(e) }}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type={"text"} className="form-control" placeholder="Enter name" name="name" value={name} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type={"text"} className="form-control" placeholder="Enter username" name="username" value={username} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type={"text"} className="form-control" placeholder="Enter Email" name="email" value={email} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='container d-flex justify-content-center'>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link  className="btn btn-outline-danger mx-2" to="/" >Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default EditUser;