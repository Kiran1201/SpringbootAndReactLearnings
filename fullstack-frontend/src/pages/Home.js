import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const result = await axios.get("http://localhost:8080/api/user/");
            setUsers(result.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/user/${id}`);
            loadUser();

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">SI No:</th>
                            <th scope="col">Code</th>
                            <th scope="col">Name</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link type="button" class="btn btn-info mx-2" to={`/view-user/${user.id}`}>View</Link>
                                    <Link type="button" class="btn btn-outline-primary mx-2" to={`/edit-user/${user.id}`} >Edit</Link>
                                    <button type="button" class="btn btn-danger mx-2" onClick={()=>deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
