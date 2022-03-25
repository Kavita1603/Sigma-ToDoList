import React from "react";

const List = ({items, removeItem, editItem}) => {
    return (
        <div className="='container">
            {items.map((item) => {
                const {id, title, date, status,action } = item;
                return ( 
                    <table className="list-group list-group-flush" key={id}>
                        <thead className="list-group-item d-flex justify-content-between align-items-center">
                    
                            <th>{title}</th>
                            <th>{date}</th>
                            <th>{status}</th>
                            <th>{action}</th>
                            {/* <div style={{float: "right"}}> */}
                               <th> <button style={{float: "right"}} type="button" className="edit-btn" onClick={() => editItem(id)}>Edit</button></th>
                                <th><button style={{float: "right"}} type="button" className="delete-btn" onClick={() => removeItem(id)}>Delete</button></th>
                            {/* </div> */}
                        </thead>
                    </table>
                )
            })}

        </div>
    )
}

export default List;