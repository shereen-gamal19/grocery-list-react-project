import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

//finally , if we enter some items and then we refresh the page then we will find that the items is removed so we will make a local storage to store that we had entered them
const getLocalStorage = () =>{
  //localStorage.getItem , getItem give us a list if there is an items or give us an empty array
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  } else{
    return []
  }
}

function App() {
  const [name , setName] = useState('')
  const [list , setList] = useState(getLocalStorage)
  //we will make the is editing state value and we will make edit state value for each item
  const [isediting , setIsediting] = useState(false)
  const [editID , setEditID] = useState(null)
//here we will make a state value for alert so that we will have two kinds for alert one for adding item and one for removing item
  // and so that the alert will be an object
  const [alert , setAlert] = useState({
    show : false,
    msg:'' ,
    type : '' })// type is two options : success or dangers
  const handleSubmit =(e) =>{
      e.preventDefault()
      console.log("hi")
  //here we will add conditions : one for if the name is empty i.e. the user doesn't enter anything ,
  //second for if the user has entered an item and he want to edit it
  // third if the user just entered an item and he want to add it 
      if (!name) {
        //display an alert
        showAlert(true , 'please enter an item' ,'danger')     
      }
      else if(name && isediting){
        //  deal with the editing , if the item that we selected has isediting true i.e when we map through the list and if there is an item its id matching with the id that is in editId state then we will return all list and the new item with the new name which is in the state 
          setList(list.map((item)=>{
            if(item.id === editID){
              return{...item,title:name}
            }
            return item
          }))
          setName('')
          setEditID(null)
          setIsediting(false)
          setAlert(true,'the value is changed' , 'success')
      }
     
      else{
        showAlert(true, 'the item is added successfully!' , 'success')
        //add the item and since we deal with a list then we want a unique id 
        const newItem = {id:new Date().getTime().toString() , title:name}
        setList([...list , newItem])
        setName('')
      } 
  }
     //here we will make a fn and we will set a parameters as a default values that we will change in the alert object here and in the Alert component
  const showAlert = (show = false , msg ='' , type ='')=>{
      setAlert({show, msg , type})
  }
  // to clear the list
  const clearlist = ()=>{
    showAlert(true , 'empty list' , 'danger')

    setList([])
  }
  const removeItem =(id)=>{
    showAlert(true, 'the item is deleted','success')
    setList(list.filter((item)=> item.id !== id))
  }
  // to edit a specific item
  const editItem =(id)=>{
    const specificitem = list.find((item)=>item.id === id)
    setIsediting(true)
    setEditID(id)
    setName(specificitem.title)
  }
  useEffect(() => {
    localStorage.setItem('list' ,JSON.stringify(list))

  },[list])
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert}list={list}/>}

          <h3>grocery list</h3>
        <div className='form-control'>

          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e)=> setName(e.target.value)} ></input>
          <button className='submit-btn'>
            {isediting ? 'edit' : 'submit'}
          </button>

        </div>
      </form>
      {/*we want to add a condition that if we has any item then we will show the List component */}
      {list.length >0 &&
       <div className='grocery-container'>
         <List items={list} removeItem={removeItem} editItem={editItem}/>
         <button className='clear-btn' onClick={clearlist}>clear items</button>
        </div>  
      }
     

    </section>
  )
}

export default App
