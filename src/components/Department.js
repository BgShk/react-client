import React from "react";

export default class Department extends React.Component{

    render() {
        const {department} = this.props;

        return (
            <tr>
                <th>{department.id}</th>
                <th>{department.name}</th>
            </tr>
        )
    }
}

