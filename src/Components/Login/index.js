import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../../Config'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './login.css'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    }
})); 


export default function Login(props) {
    const classes = useStyles();
    const [h, setH] = useState('Войти')
    const [p, setP] = useState('Зарегистрироваться')
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [authOrReg, setAuthOrReg] = useState('/login/')

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token != null) {
            props.history.push('/')
        }
    })

    const setParameters = () => {
        if (authOrReg == '/login/') {
            setH('Регистрация')
            setAuthOrReg('/registration/')
            setP("Войти")
        } else {
            setH('Войти')
            setAuthOrReg('/Login/')
            setP("Заригестрироваться")
        }
    }

    const sendRequest = (e) => {
        let val = e.target.value
        let data = {}
        if (val == '/login/') {
            data['username'] = login
            data['password'] = pass
        } else {
            data['username'] = login
            data['password1'] = pass
            data['password2'] = pass
        }
        let url = 'dj-rest-auth' + val
        const request = axios.post(API + url, data)
            .then((response) => {
                console.log(response)
                localStorage.setItem("token", response.data.key)
                localStorage.setItem('id', response.data.user.id)
                props.history.push('/')
            }, (error) => {
                console.log(error)
            }
            )
    }


    return (
        <div className='wrapper' 
        style={{
               paddingLeft:'15px',
               marginTop:'150px',
               marginLeft:'500px'
        }}>
            <div className="card">
                <h2>{h}</h2>
                <TextField 
                id="standard-basic" 
                label="user name"
                value={login}
                onChange={(event) => {
                    setLogin(event.target.value)
                }} />
<br/>
                <TextField 
                    color="white"
                    label='Password'
                    type='password'
                    placeholder="password"
                    value={pass}
                    onChange={(event) => {
                        setPass(event.target.value)
                    }}
                
                />

<br/>               
               
                    <button
                    style={{textAlign:'0',color:'black',marginTop:'10%',marginLeft:'60%'}}
                    value={authOrReg}
                    onClick={(event) => {
                        sendRequest(event)
                        
                    }}
                    > 
                      Войти 
                   </button>
                <p onClick={setParameters}
                style={{textAlign:'0',color:'white',marginTop:'10%'}}>{p}</p>
            </div>
        </div>
    )
}
