import React from 'react';
import './App.css'
import {AppBar, Container, IconButton, Toolbar} from "@material-ui/core";
import logo from './../assets/logo.png'
import {Users} from "../components/Users";
import {AppDispatchType, useAppDispatch} from "./store";


function App() {

    const dispatch: AppDispatchType = useAppDispatch();

    // const addUser = (title: string) => {
    //     dispatch(addUserTC(title))
    // };

    return (
        <div className='App'>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu"/>
                    <img src={logo} alt="Logo"/>
                    {/*<AddUserForm addItem={addUser}/>*/}
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Users/>
            </Container>
        </div>
    );
}

export default App;
