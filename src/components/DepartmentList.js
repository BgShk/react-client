import React from "react";
import Department from "./Department";
import departments from "../departments";

function DepartmentList(props){
    const departmentsList = departments.map(department =>
        <Department key={department.id} department={department}/>)

    return(
        <table>
            <tbody>
            <tr>
                <th>Department ID</th>
                <th>Department Name</th>
            </tr>
            {departmentsList}
            </tbody>
        </table>
    )
}

export default DepartmentList