import axios from "axios";
import { useEffect, useState } from "react";




export function Home() {
    const { token } = JSON.parse(localStorage.getItem("user"));
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getALlUsers();
    }, [])


    const getALlUsers = () =>{
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        axios.get("http://localhost:3000/users", { headers: headers }).then((response) => {
            if (response.status == '200') {
                alert("loaded scucessfully");
                setUsers(response.data);
            }
        }).catch(err => {
            alert("erro" + err);
        })
    }

    const handleDelete = (index)=>{
        let email = users[index].email;
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        axios.delete(`http://localhost:3000/users/${email}`, { headers: headers }).then((response) => {
            if (response.status == '204') {
                alert("Deleted scucessfully");
                setUsers([]);
                getALlUsers();
            }
        }).catch(err => {
            alert("erro" + err);
        })
    }

    return (
        <div>
            {
                users !== null && users?.length > 0 ?
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(users[0]).map(x => <th>{x}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((row,index) => {
                                        return (
                                            <tr>
                                                {
                                                    Object.values(row).map(x => <td>{x}</td>)
                                                }
                                                
                                             <td onClick={handleDelete(index)}><svg viewBox="-0.5 0 19 19" width={'28px'} height={'28px'} fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="out" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" > <path d="M4.91666667,14.8888889 C4.91666667,15.3571429 5.60416667,16 6.0625,16 L12.9375,16 C13.3958333,16 14.0833333,15.3571429 14.0833333,14.8888889 L14.0833333,6 L4.91666667,6 L4.91666667,14.8888889 L4.91666667,14.8888889 L4.91666667,14.8888889 Z M15,3.46500003 L12.5555556,3.46500003 L11.3333333,2 L7.66666667,2 L6.44444444,3.46500003 L4,3.46500003 L4,4.93000007 L15,4.93000007 L15,3.46500003 L15,3.46500003 L15,3.46500003 Z" id="path" fill="#000000" sketchType="MSShapeGroup"> </path> </g> </g></svg></td>
                                                
                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                        </table>
                    </div> : ''
            }
            <h1>Home</h1>
        </div>
    )
}