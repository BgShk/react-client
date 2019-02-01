import React from "react";
import Department from "./Department";
import departments from "../departments";

export default class DepartmentList extends React.Component{
    constructor(props){
        super(props);
        this.state = {departmentsList: departments};
    }

    render(){
        const departmentsList = this.state.departmentsList.map(department =>
            <Department key={department.id} department={department}/>)
        return(
            <div>
               <button onClick={this.changeName.bind(this)}>Change name</button>
                <table>
                    <tbody>
                    <tr>
                        <th>Department ID</th>
                        <th>Department Name</th>
                    </tr>
                    {departmentsList}
                    </tbody>
                </table>
            </div>

        )
    }

    changeName() {
        const newList = this.state.departmentsList;
        newList[0].name = "test";
        this.setState({departments: newList});
    }

}

