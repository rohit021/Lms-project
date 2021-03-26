import React, {useState, useEffect} from 'react';
import {Paper, IconButton, Button, Menu, MenuItem, Table, TableHead, TableBody, TableSortLabel, TableRow, TableCell, TableContainer} from '@material-ui/core';
import {lighten, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { MoreVert as MoreIcon } from "@material-ui/icons";
import AuthService from "../../authServices/apicalls";
import {ReviewHeadCells} from '../../helpers/utils';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        boxShadow: '1px 3px 5px 3px #d4d0d0',
        padding: 15,
        margin: "50px auto",
        flexGrow: 1,
    },
    bold: {
        fontFamily: "Poppins-Bold",
    },
    priority:{
        textAlign: "center",
        color: "#fff",
        fontWeight: "700",
        borderRadius: "10px",
        padding: "5px"
    },
    text:{
        fontSize:16,
        textTransform: "capitalize",
    },
    li: {
        '&:hover': {
            backgroundColor: lighten('#01579b', 0.85),
        }
    },
    table: {
      minWidth: 750,
    },    
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));
  
const ReviewTable = ({fetchData, tableData, filterValue, updateData}) => {
    const classes = useStyles();
    const [Order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = React.useState('date');
    const [filterData, setFilterData] = useState(filterValue);
    var [ButtonRef, setButtonRef] = useState(null);
    const open = Boolean(ButtonRef);
    
    const handleRequestSort = (property) =>(event) => {
        const isAsc = orderBy === property && Order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setFilterData({...filterData, order:Order, orderBy:orderBy});   
    };
    
    useEffect(() => {
        // console.log(filterData);
        updateData(filterData);
      }, [filterData]);

    const handleClick = (event) => {
        setButtonRef(event.currentTarget);
    };
    const handleClose = () => {
        setButtonRef(null);
    };
    
    const deletehandler = (data) =>{
        const payload ={
            id:data
        }
        AuthService.deleteReviewbyId(payload).then(
            (data) => {
                fetchData();
            },
            (error) => {
            }
          );
    }

  
    return (
        <Paper className={classes.paper}>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size='medium'
                    aria-label="enhanced table"
                >
                    <TableHead>                    
                        <TableRow>
                            <TableCell className={classes.bold}>S.No</TableCell>
                            {ReviewHeadCells.map((headCell)=>(
                            <TableCell 
                            className={classes.bold}
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? Order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? Order : 'asc'}
                                    onClick={handleRequestSort(headCell.id)}
                                    >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <span className={classes.visuallyHidden}>
                                        {Order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                    </TableSortLabel>
                            </TableCell>
                            ))                        
                            }
                            <TableCell className={classes.bold}>Daily Review</TableCell>
                            <TableCell className={classes.bold}>Reply</TableCell>
                            <TableCell className={classes.bold}>Name</TableCell>
                            <TableCell className={classes.bold}>Review Category</TableCell>
                            <TableCell className={classes.bold}>Actions</TableCell>                        


                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        tableData.map((data, index) => (
                            <TableRow key={index} className={classes.li}
                            >
                                <TableCell className={classes.text}>{index+1}</TableCell>
                                <TableCell className={classes.text}>{moment(data.date).format('DD-MM-YYYY')}</TableCell>
                                <TableCell className={classes.text}>{data.rating}</TableCell>
                                <TableCell className={classes.text}>{data.comment}</TableCell>
                                <TableCell className={classes.text}>{data.reply}</TableCell>
                                <TableCell className={classes.text}>{data.name}</TableCell>
                                <TableCell className={classes.text}>{data.organization}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-owns="widget-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreIcon />
                                    </IconButton>
                                    <Menu
                                        id="widget-menu"
                                        open={open}
                                        anchorEl={ButtonRef}
                                        keepMounted
                                        onClose={handleClose}
                                        disableAutoFocusItem
                                        >
                                            <MenuItem>
                                            <Button>Edit</Button>
                                            </MenuItem>
                                            <MenuItem>
                                            <Button onClick={(event) => deletehandler(data._id)}>Delete</Button>
                                            </MenuItem>                                            
                                        </Menu>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default ReviewTable;