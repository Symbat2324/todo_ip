
import React, { useState, useEffect } from 'react'
import { API } from '../../Config'
import RenderTodo from '../RenderTodo'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Home.css'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function Home(props) {
    const [todoInput, setToDoInput] = useState('')
    const [data, setData] = useState([])

    const classes = useStyles();

    const [modal, setModal] = useState(false)
    const [editElement, setEditElement] = useState('')
    const [editInput, setEditInput] = useState('')

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token == null) {
            props.history.push('/login')
        } else {
            getAllTodos()
        }
    }, [])
    const logOut = () => {
        localStorage.removeItem('token', ' ')
        props.history.push('/login')
    }

    const getAllTodos = async () => {
        let token = localStorage.getItem('token')
        try {
            let resp = await fetch(API, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'token ' + token
                }
            })
            let json = await resp.json()

            setData(json)
        } catch (err) {
            console.log(err)
        }
    }

    const createTodo = async () => {
        let id = localStorage.getItem('id')
        let token = localStorage.getItem('token')
        let data = {
            author: id,
            title: todoInput,
            body: todoInput
        }
        try {
            let resp = await fetch(API, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'token ' + token
                }
            })
            let json = await resp.json()
            setToDoInput('')
            getAllTodos()
        } catch (error) {
            console.log(error)
        }
    }

    const doneTodo = async (elId) => {
        let idElement = elId
        let id = localStorage.getItem('id')
        let token = localStorage.getItem('token')

        let data = {
            username: id,
            status: true
        }
        try {
            let resp = await fetch(API + idElement + '/', {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'token ' + token
                }
            })

            setToDoInput('')
            getAllTodos()
        } catch (error) {
            console.log(error)
        }
    }


    const openModal = (id, title) => {
        setModal(true)
        setEditInput(title)
        setEditElement(id)
    }

    const deleteTodo = async (elId) => {
        let idElement = elId
        let token = localStorage.getItem('token')


        try {
            let resp = await fetch(API + idElement + '/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'token ' + token
                }
            })
            setToDoInput('')
            getAllTodos()
        } catch (error) {
            console.log(error)
        }
    }


    // const setEdit = useState(false)
    // const [todo, setTodo] = useState('')
    // const [id, setId] = useState()
    // const [showModal, setShowModal] = useState(false)
    // const edit =(todo, id)=>{
    //     // setEdit(edit)
    //     setTodo(todo)
    //     setShowModal(true)
    //     setId(id)
    // }
    // const saveEdit =()=>{
    //     setShowModal(false)
    // }

    // const editTodo= async(elId)=>{
    //     let idElement = elId
    //     let token = localStorage.getItem('token')


    //     try{
    //         let resp = await fetch(API+idElement+'/',{
    //             method:'PATCH',
    //             headers:{
    //                 'Content-Type':'application/json',
    //                 Authorization:'token ' + token
    //             }
    //         })
    //         setToDoInput('')
    //         getAllTodos()
    //     }catch(error){
    //         console.log(error)
    //     }
    // }


    const saveEdit = async () => {
        let idElement = editElement
        let id = localStorage.getItem('id')
        let token = localStorage.getItem('token')
        let title = editInput
        let data = {
            username: id,
            title: title
        }
        try {
            let resp = await fetch(API + idElement + '/', {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'token ' + token
                }
            })

            setModal(false)
            getAllTodos()
        } catch (error) {
            console.log(error)
        }
    }

    // const handleClickOpen = () => {
    //     setEdit(true);
    //   };
    //   const handleClose = () => {
    //     setEdit(false);
    //   };


    return (
        <div>
            <div className='navbar'>
                <h1 className='h1'>Home</h1>
            </div>
            <p onClick={logOut}
                style={{
                    width: '70px', height: '70px', color: 'white',
                    marginLeft: '90%', marginTop: '-50px'
                }}
            >Выйти</p>
            <div>

                <input className='input_main'
                    type="text"
                    value={todoInput}
                    onChange={(event) => {
                        setToDoInput(event.target.value)
                    }}
                    placeholder='Введите значение'
                />
                <button className="button" onClick={() => {
                    createTodo()
                }}>ADD</button>


                <div>

                    <RenderTodo
                        data={data}
                        doneTodo={doneTodo}
                        deleteTodo={deleteTodo}
                        // setEdit={setEdit}
                        openModal={openModal}

                    />

                    {modal ?
                        <div className='modal'>
                            <span onClick={
                                () => setModal(false)
                            }
                                className='close'
                            >+</span>

                            <form className={classes.root} noValidate autoComplete="off">

                                <TextField  id="outlined-basic" label="Заменить" variant="outlined"  
                                //  style={{border:'1px solid white'}}
                                    value={editInput}
                                onChange={(event) => {
                                    setEditInput(event.target.value)
                                }}
                                />
                            </form>
                            {/* <TextField

                                type="text"
                                value={editInput}
                                onChange={(event) => {
                                    setEditInput(event.target.value)
                                }}
                            /> */}
                            
                            <Button onClick={() => {
                                saveEdit()
                            }} variant="contained" color="primary">
                                   Change
                             </Button>
                            
                        </div>
                        : null
                    }

                    {/* <div className='window'
                    style={
                        !edit ? 
                        {display:'none'} :
                        {
                            width: '200px',
                            height: '200px',
                            display: 'flex',
                            alignItems: 'center',
                            background: 'white'
                    }}>
                   
                    <div className='modalContant'>
                        <span className='closeWindow' 
                        style={{
                            marginLeft: '80%',
                        }}
                        onClick={handleClose}
                        >&times;</span>
                        <p>Вы действительно хотите<br/>
                         поменять значения</p>
                        <input  type="text"
                               onChange={(event)=>{
                        setToDoInput(event.target.value)
                    }}
                    placeholder='Введите значение'
                        />
                        <button>Yes</button>
                        <button 
                        onClick={()=>
                    setShowModal(false)
                    }
                        >No</button>
                    </div>

                </div> */}

                </div>
            </div>
        </div>
    )
}