import React, {useState, useEffect} from 'react';
// import {Dialog,D }
import {Paper, 
    IconButton, Button, Menu, MenuItem, Table, TableHead, TableBody, TableSortLabel, TableRow, TableCell, TableContainer} from '@material-ui/core';
import {lighten, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { MoreVert as MoreIcon } from "@material-ui/icons";
import AuthService from "../../authServices/apicalls";
import {LeadHeadCells} from '../../helpers/utils';

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
  
const LeadTable = ({fetchData, tableData, updateData}) => {
    const classes = useStyles();
    const [Order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = React.useState('date');
    // const [deleteModal, setdeleteModal] = useState(false)
    const [filterData, setFilterData] = useState('');
    var [ButtonRef, setButtonRef] = useState(null);
    const open = Boolean(ButtonRef);
    
    const handleRequestSort = (property) =>(event) => {
        const isAsc = orderBy === property && Order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setFilterData({order:Order, orderBy:orderBy});   
    };
    
    useEffect(() => {
        console.log(filterData);
        updateData(filterData);
      }, [filterData]);

    // const CloseDeleteModal = () => {
    //     setdeleteModal(false);
    // };
    
    // const OpenDeleteModal = (data) => {
    //     console.log("check",data);
    //     // setdeleteModal(true);
    // };
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
        AuthService.deleteLeadbyId(payload).then(
            (data) => {
                fetchData();
                // setdeleteModal(false);
            },
            (error) => {
                // setdeleteModal(false);
            }
          );
    }

    const PriorityChecker =(value) =>{
        return(
            <React.Fragment>
                {value === 'hot' ? (<div className={classes.priority} style={{backgroundColor: "#ef3d00"}}>{value}</div>):''}
                {value === 'neutral' ? (<div className={classes.priority} style={{backgroundColor: "#ff8800"}}>{value}</div>):''}
                {value === 'cold' ? (<div className={classes.priority} style={{backgroundColor: "#01579b"}}>{value}</div>):''}
            </React.Fragment>
        )
    }

    // const DeleteDialog = (data) =>{
    //     console.log(data);
    //     return(
    //         <React.Fragment>
    //              <Dialog
    //         open={deleteModal}
    //         TransitionComponent={Transition}
    //         keepMounted
    //         onClose={CloseDeleteModal}
    //         aria-labelledby="alert-dialog-slide-title"
    //         aria-describedby="alert-dialog-slide-description"
    //       >
    //         <DialogTitle id="alert-dialog-slide-title">{"Delete Lead Details?"}</DialogTitle>
    //         <DialogContent>
    //           <DialogContentText id="alert-dialog-slide-description">
    //             once you delete the delete the lead details then you will not be able to see this in future.
    //           </DialogContentText>
    //         </DialogContent>
    //         <DialogActions>
    //           <Button onClick={CloseDeleteModal} color="primary">
    //             Disagree
    //           </Button>
    //           <Button onClick={handleClick11(name)} color="primary">
    //             Agree
    //           </Button>
    //         </DialogActions>
    //       </Dialog>
    //         </React.Fragment>
    //     )
    // }
    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="up" ref={ref} {...props} />;
    // });
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
                            {LeadHeadCells.map((headCell)=>(
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
                            <TableCell className={classes.bold}>Logs</TableCell>
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
                                <TableCell className={classes.text}>{data.name}</TableCell>
                                <TableCell className={classes.text}>{data.email}</TableCell>
                                <TableCell className={classes.text}>{data.phone}</TableCell>
                                <TableCell className={classes.text}>{data.center}</TableCell>
                                <TableCell className={classes.text}>{PriorityChecker(data.priority)}</TableCell>
                                <TableCell className={classes.text}>{data.source}</TableCell>
                                <TableCell>
                                    <Button
                                     variant="contained"
                                     color="primary"
                                     style={{ margin:"5px auto",background:"#01579b", color:"#fff" }}
                                    //  onClick={handleChange}
                                     >
                                         View Logs
                                    </Button>
                                </TableCell>
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

export default LeadTable;
