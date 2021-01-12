import React from 'react'
import Main from './Components/Main'
import PostAddIcon from '@material-ui/icons/PostAdd';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
save:{
  position:'absolute',
  height:'35px',
  margin:'20px',
  marginTop:'18px'
},
  textfield: {
    marginLeft:'500px',
  }
}));

export default function App() {
  return (
    <div>
    
      <Main/>

    </div>
  )
}

