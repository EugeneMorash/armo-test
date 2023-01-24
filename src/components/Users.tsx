import React, {ChangeEvent, useEffect} from 'react';
import {AppDispatchType, store, useAppDispatch, useAppSelector} from "../app/store";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete as DeleteIcon} from "@material-ui/icons";
import {changeAccessStatusTC, deleteUserTC, getUsersTC} from "./users-reducer";
import {Loader} from "./Loader/Loader";
import './Users.scss'

export function Users() {

    const dispatch: AppDispatchType = useAppDispatch();

    const isLoading = useAppSelector((state) => state.app.isLoading)

    const users = useAppSelector(() => store.getState().users.users)

    useEffect(() => {
        dispatch(getUsersTC())
    }, [dispatch])

    const dayjs = require('dayjs')

    return (
        isLoading ? <Loader/> : (
            <table className='table'>
                <thead className='table-head'>
                <tr>
                    <th>Access</th>
                    <th>Name</th>
                    <th>Birth Date</th>
                    <th>e-mail</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => {
                    const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeAccessStatusTC(u.id, e.currentTarget.checked))
                    };

                    const onClickHandler = () => {
                        dispatch(deleteUserTC(u.id))
                    };

                    return <tr key={u.id} className={u.access ? 'access-status' : ''}>
                        <td><Checkbox checked={u.access} onChange={onCheckHandler}/></td>
                        <td>{u.lastName} {u.firstName}</td>
                        <td>{dayjs(u.birthDate).format('D. M. YYYY')}</td>
                        <td>{u.email}</td>
                        <td><IconButton onClick={onClickHandler}
                                        aria-label="delete"
                                        size="medium"
                                        color="secondary"
                        >
                            <DeleteIcon/>
                        </IconButton></td>
                    </tr>
                })}
                </tbody>
            </table>
        )
    );
}
