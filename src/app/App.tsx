import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getUsersTC} from "./app-reducer";
function App() {

    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(getUsersTC())
    }, [dispatch])

  return (
    <div>
      111
    </div>
  );
}

export default App;
