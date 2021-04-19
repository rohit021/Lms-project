import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  
  root: {
    minWidth: 275,
    borderRadius:10,
    position:"relative",
    display:"inline-block",
    // display:"flex",
    padding:"auto",
    justifyContent:"space-between"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 26,
    fontWeight:700,
    color:'#000',
    textAlign:"center"
  },
  icon:{
     display:"flex",
     justifyContent:"space-between",
     fontSize:50
  },
  pos: {
    justifyContent:"space-between",
    fontSize: 36,
    fontWeight:700,
    textAlign:"center",
    color:'#000'
  },
  Button:{
     alignSelf:"center"
  }
});

const CardModal=({header,icon,footer,data})=> {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         {header}
        </Typography>
        <Typography>
            {icon}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {data}
        </Typography>
      </CardContent>
      <CardActions className={classes.Button} >
        <Button size="medium" >{footer}</Button>
      </CardActions>
    </Card>
  );
}
export default CardModal;