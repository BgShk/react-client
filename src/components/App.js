import React from "react";
import DepartmentList from "./DepartmentList";

export default class App extends React.Component{
    render(){
        return (
            <div>
                <h1>App</h1>
                <DepartmentList/>
                {/*<Department department={departments[1]}/>*/}
            </div>
        )
    }
}

