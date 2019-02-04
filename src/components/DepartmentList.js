import React from "react";
import Department from "./Department";
import departments from "../departments";
import "./style.css"

export default class DepartmentList extends React.Component{
    constructor(props){
        super(props);
        this.state = {departmentsList: departments,
            value: '',
            action: 'addDepartment',
            isHidden: true};
    }

    render(){
        const departmentsList = this.state.departmentsList.map(department =>
            <Department key={department.id} department={department}/>)
        return(
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>
                        <div className={this.state.isHidden ? 'hidden' : ''}>
                            <input type="text" />
                        </div>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </label>
                    <select onChange={this.selectChange.bind(this)}>
                        <option value="addDepartment">Add department</option>
                        <option value="replaceDepartment">Replace department</option>
                        <option value="updateDepartment">Update department</option>
                        <option value="deleteDepartment">Delete department</option>
                    </select>
                    <button onClick={this.onSubmit.bind(this)}>Submit</button>
                </form>

               <button value={this.state.action} onClick={this.updateTable.bind(this)}>Update table</button>
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

    selectChange(event){
        this.setState({action: event.target.value});

         if(event.target.value === 'replaceDepartment'
             || event.target.value === 'updateDepartment'
             || event.target.value === 'deleteDepartment'){

             this.setState({isHidden: false});
         }else{
             this.setState({isHidden: true});
         }

        console.log(event.target.value);
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
        }).then(response => {
                return response.json;
            })
            .then(result => {
                console.log(result.json);
            })
            .catch (error =>{
                console.log('Request failed (POST)', error);
            });
    }

    updateTable() {
        /*const newList = this.state.departmentsList;
        newList[0].name = "test";
        this.setState({departments: newList});*/

      fetch('http://localhost:8080/departments', {method: 'GET', cache: 'default'})
            .then( result => result.json())
            .then( data => {
                this.setState({departmentsList: data})
            })
            .catch(error =>{
                console.log('request failed (GET)', error);
            });
    }

}

