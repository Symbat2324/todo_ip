import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'

export default function Main() {
    return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
            </Switch>   
    )
}

