import React from "react";
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    paper: {
      margin: 10,
      float: "left",
      padding: 8,
      textAlign: "center",
      width: 330,
      height: 350
    }
  }));

const Product = (props) => {
    const { classes } = useStyles();
    let navigate = useNavigate();
 
    const productDetails = () => {
        navigate(props.url);
    }

    return(
            <Paper elevation={3} className={classes.paper}>
                <img src={props.data.image} width="300"/>
                <div>
                    <h2>
                        {props.data.productName}
                    </h2>
                    <span>{props.data.cost}</span>
                    <IconButton onClick={productDetails}>
                        <InfoIcon/>
                    </IconButton>
                </div>
            </Paper>
    )
}

export default Product;