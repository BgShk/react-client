import React from "react";
import Department from "./Department";
import departments from "../departments";
import "./style.css"

export default class DepartmentList extends React.Component{
    constructor(props){
        super(props);
        this.state = {departmentsList: departments,
            value: '',
            newName:'',
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
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleNameChange.bind(this)}/>

                    </label>
                    <select onChange={this.selectChange.bind(this)}>
                        <option value="addDepartment">Add department</option>
                        <option value="replaceDepartment">Replace department</option>
                        <option value="updateDepartment">Update department</option>
                        <option value="deleteDepartment">Delete department</option>
                    </select>
                    <button onClick={this.onSubmit.bind(this)}>Submit</button>
                    <div className={this.state.isHidden ? 'hidden' : ''}>
                        New name:
                        <input type="text" onChange={this.handleNewNameChange.bind(this)}/>
                    </div>
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
             || event.target.value === 'updateDepartment'){

             this.setState({isHidden: false});
         }else{
             this.setState({isHidden: true});
         }

        console.log(event.target.value);
    }

    handleNameChange(event){
        this.setState({value: event.target.value});
    }

    handleNewNameChange(event){
        this.setState({newName: event.target.value});
    }

    onSubmit(event){
        event.preventDefault();
        var data;

        switch(this.state.action){
            case 'addDepartment':
                data = {
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
                        this.updateTable();
                    })
                    .catch (error =>{
                        console.log('Request failed (POST)', error);
                    });

                break;

            case 'updateDepartment':
                data = {
                    "name": this.state.newName
                }
                fetch('http://localhost:8080/departments/' + this.state.value, {
                    method: 'PATCH',
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
                        this.updateTable();
                    })
                    .catch (error =>{
                        console.log('Request failed (PATCH)', error);
                    });

                break;

            case 'deleteDepartment':
                fetch('http://localhost:8080/departments/' + this.state.value , {
                    method: 'DELETE',
                    }).then(response => {
                        return response.json;
                    })
                    .then(result => {
                        console.log(result.json);
                        this.updateTable();
                    })
                    .catch (error =>{
                        console.log('Request failed (DELETE)', error);
                    });
                break;

            case 'replaceDepartment':
                data = {
                    "name": this.state.newName
                }
                fetch('http://localhost:8080/departments/' + this.state.value, {
                    method: 'PUT',
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
                        this.updateTable();
                    })
                    .catch (error =>{
                        console.log('Request failed (PUT)', error);
                    });

                break;
            default:
                console.log("Unknown selection");
                break;
        }
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

