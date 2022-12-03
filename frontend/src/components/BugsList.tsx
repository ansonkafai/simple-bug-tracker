import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { IBug } from '../types/BugType'

import '../App.css';

export const BugsList = (triggerBugsListReload: any) => {
    const [bugs, setBugs] = useState<IBug[]>([])

    const loadBugsList = () => {
        // Call API for getting bugs list. For swagger doc, refer to http://127.0.0.1:5000/swagger-ui
        axios.get('http://127.0.0.1:5000/bugs').then(r => {
            setBugs(r.data)
        })
    }

    useEffect(() => {
        // Parent page trigger bugs list reload by changing triggerBugsListReload value.
        if (triggerBugsListReload) {
            loadBugsList()
        }
    }, [triggerBugsListReload]);

    // Page rendering.
    return (
        <div>
            <h3>Users List</h3>
            <div className='tableFixHead bordered'>
                <table className='table table-sm table-striped bordered hover'>
                    <thead className='myThead'>
                        <tr>
                            <th scope='col'>Id</th>
                            <th scope='col'>Title</th>
                            <th scope='col'>Description</th>
                            <th scope='col'>Assignee User Id</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Create Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bugs.map((bug: IBug, idx: number) => {
                                return (
                                    <tr key={idx}>
                                        <td>{bug.id}</td>
                                        <td>{bug.title}</td>
                                        <td>{bug.description}</td>
                                        <td>{bug.assignee}</td>
                                        <td>{bug.status}</td>
                                        <td>{bug.create_time}</td>
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
