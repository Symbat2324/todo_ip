import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1)
    },iconbutton:{
        color:'white',
        width:'20px',
        marginLeft:'50px',
     }
  }));

export default function RenderTodo(props) {
   const classes = useStyles();

  return (
        <div>
            {props.data ?
             props.data.map(el=>{
                 return(
                     <div key={el.id} classes = "useStyles"
                     style={{
                        width:'470px',
                        height:'100px',
                        color:'white',
                        marginLeft:'30%',
                        outline: 'none',
                        borderRradius: '10px',
                        boxShadow: '-1px 1px 10px rgba(0, 0, 0, 0.75)',
                        textAlign:'center' 
                     }}
                     >
                         <h2>{el.title}</h2>
                         <div key={el.id} style={el.status ? {background:'#465945'} :{background:'#2E2552'}}>
                             {!el.status ? 
                                <IconButton aria-label="delete" 
                                 onClick={event=>{props.doneTodo(el.id)
                                }}
                                className={classes.iconbutton}>
                                    <DoneAllIcon
                                fontSize="large" />
                                </IconButton>

                               :null}

                               <IconButton aria-label="delete" 
                                 onClick={event=>{
                                        props.deleteTodo(el.id)
                                    }}
                                className={classes.iconbutton}>
                                 <DeleteIcon fontSize="large" />
                              </IconButton>


                              <IconButton aria-label="delete"  
                            //    onClick={props.setEdit}
                               value={el.id}
                               data-title = {el.title}
                                    onClick={event=>{
                                        props.openModal(el.id, el.title)
                                    }}
                               className={classes.iconbutton}
                               >
                                  <EditIcon fontSize="large" />
                              </IconButton>
                         </div>
                     </div>
                 )
             })
             : <h3>Пока нет данных</h3>
            }
        </div>
    )
}
