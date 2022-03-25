import React, {useState} from 'react';
import List from "./component/List";
import Alert from './component/Alert';

const App = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(" ");
  const [status, setStatus] = useState(" ");
  const [action, setAction] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIdEditing] = useState("false");
  const [editID, setEditID] = useState("null");
  const [alert, setAlert] = useState({show: false, msg: "", type: ""});

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      showAlert(true, "danger", "Please Enter value");
    } else if(name && isEditing){
      setList(
        list.map((item) => {
          if(item.id === editID) {
            return {...item, title: name}
          }
          return item
        })
      );
      setName("");
      setDate("");
      setStatus("");
      setAction("");
      setIdEditing(false);
      setEditID(null);
      setAlert(true, "success", "Value Changes");
    } else {
      showAlert(true, "success", "Item added to the List");
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setDate("");
      setStatus("");
      setName("");
      setAction("");
      setIdEditing(false);
      setEditID(null);
      setAlert(true, "success", "Value Changes");
    }
  };
  const showAlert = (show= false, type = " ", msg = " ") => { 
    setAlert({show, type, msg});
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "Task Deleted");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIdEditing(true);
    setEditID(id);
    setName(editItem.title);
  };
  const clearList = () => {
    showAlert(true, "danger", "Empty List");
    setList([]);
  };

  return (

      <section className="section-center">
        <form onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h1 style={{marginBottom: "1.5rem", textAlign: "center"}}>To Do List App</h1>
          <div className='mb-3 form'>
          <input type="date" id="dt" name="dt" onChange={(e) => setDate(e.target.value)}
             value={date} required/><br></br> <br></br>
          <input
             type="text"
             placeholder="Task Name" onChange={(e) => setName(e.target.value)}
             value={name} required /> 
             <br></br><br></br>
        <select>
          <option onChange={(e) => setStatus(e.target.value)}
             value={status} >Status</option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select><br></br><br></br>
        <input type="text" placeholder='Action' onChange={(e) => setAction(e.target.value)}
             value={action} required />
          </div>

          <div className='mb-3 form'>
             <button type='submit' className="btn btn-success">
               {isEditing ? "Submit" : "Submit"}
             </button> 
         
          </div>
        </form>
 
      {list.length > 0 && (
          <div>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <div className="text-center">
              <button className="btn btn-warning" onClick={clearList}>Clear Items</button>
             
            </div>
          </div>
        )}       
      </section>
   
  );
};

export default App;


