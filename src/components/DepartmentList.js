import React from "react";
import Department from "./Department";
import departments from "../departments";

export default class DepartmentList extends React.Component{
    constructor(props){
        super(props);
        this.state = {departmentsList: departments, value: ''};
    }

    render(){
        const departmentsList = this.state.departmentsList.map(department =>
            <Department key={department.id} department={department}/>)
        return(
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </label>
                    <button onClick={this.onSubmit.bind(this)}>Add department</button>
                </form>
               <button onClick={this.changeName.bind(this)}>Update table</button>
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

    handleChange(event){
        this.setState({value: event.target.value});
    }

    onSubmit(event){
        event.preventDefault();

        var data = {
            "name": this.state.value
        }


        console.log(data);

        fetch('http://localhost:8080/departments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function (response) {
                return response.json;
            })
            .then(function (result) {
                console.log(result.json);
            })
            .catch (function (error) {
                console.log('Request failed', error);
            });
    }

    changeName() {
        /*const newList = this.state.departmentsList;
        newList[0].name = "test";
        this.setState({departments: newList});*/

      fetch('http://localhost:8080/departments', {method: 'GET', cache: 'default'})
            .then( result => result.json())
            .then( data => {
                this.setState({departmentsList: data})
            });

       /* fetch('http://localhost:8080/departments')
            .then(response => response.json())
            .then(data => this.setState({departmentList: data}));*/
    }

}

