import React from "react";

function Department(props){
    const {department} = props

    console.log("---Departments", props)

    return (
                <tr>
                    <th>{department.id}</th>
                    <th>{department.name}</th>
                </tr>
    )
}

export default Department