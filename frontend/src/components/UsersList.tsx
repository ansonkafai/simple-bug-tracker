import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { IUser } from '../types/UserType'

import '../App.css';

export const UsersList = (triggerUsersListReload: any) => {
    const [users, setUsers] = useState<IUser[]>([])

    const loadUsersList = () => {
        // Call API for getting users list. For swagger doc, refer to http://127.0.0.1:5000/swagger-ui
        axios.get('http://127.0.0.1:5000/users').then(r => {
            setUsers(r.data)
        })
    }

    useEffect(() => {
        // Parent page trigger users list reload by changing triggerUsersListReload value.
        if (triggerUsersListReload) {
            loadUsersList()
        }
    }, [triggerUsersListReload]);

    return (
        <div>
            <h3>Users List</h3>
            <div className='tableFixHead bordered'>
                <table className='table table-sm table-striped bordered hover'>
                    <thead className='myThead'>
                        <tr>
                            <th scope='col'>Id</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>First Name</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>Create Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user: IUser, idx: number) => {
                                return (
                                    <tr key={idx}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.create_time}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
