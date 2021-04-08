import React, {useState, useEffect} from 'react';
import {Paper, IconButton, Button, Menu, MenuItem, Table, TableHead, TableBody, TableSortLabel, TableRow, TableCell, TableContainer} from '@material-ui/core';
import { Dialog,DialogActions, DialogTitle, DialogContentText, DialogContent, Slide }from '@material-ui/core';
import {lighten, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import EditModal from '../modals/edit-modal';
import { MoreVert as MoreIcon } from "@material-ui/icons";
import AuthService from "../../authServices/apicalls";

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
        // textTransform: "capitalize",
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
  
const CommonTable = ({fetchData, LeadHeadCells, filterValue, tableData, updateData}) => {
    const classes = useStyles();
    const [Order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = React.useState('date');
    const [deleteModal, setdeleteModal] = useState(false)
    const [filterData, setFilterData] = useState(filterValue);
    var [ButtonRef, setButtonRef] = useState(null);
    const open = Boolean(ButtonRef);
    const [openmodal, setOpenModal] = useState(false);
    const [dataId, setdataId] = useState('')
    
    const editHandler = () => {        
      if (openmodal) {
        setOpenModal(false);
      } else {
        setOpenModal(true);
      }
    };
     
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

    const CloseDeleteModal = () => {
        setdeleteModal(false);
    };
    
    const OpenDeleteModal = () => {
        setdeleteModal(true);
    };

    const handleClick = (event, data) => {
        setdataId(data._id);
        setButtonRef(event.currentTarget);
    };
    const handleClose = () => {
        setButtonRef(null);
    };
    
    const deleteHandler = () =>{
        const payload ={
            id:dataId
        }
        AuthService.deleteLeadbyId(payload).then(
            (data) => {
                setdeleteModal(false);
                fetchData();
            },
            (error) => {
                setdeleteModal(false);
            }
          );
    }

    const DeleteDialog = () =>{
        return(
            <React.Fragment>
                <Dialog 
                    open={deleteModal} 
                    TransitionComponent={Transition} 
                    keepMounted 
                    onClose={CloseDeleteModal}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Delete Lead Details?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            once you delete the lead details then you will not be able to see this in future.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={CloseDeleteModal} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={deleteHandler} color="primary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    return (
        <Paper className={classes.paper}>
            {openmodal && <EditModal id={dataId} reload={fetchData} openModal={openmodal} organization={filterData.organization} closeModal={editHandler} />}
            {deleteModal && <DeleteDialog /> }
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
                            <TableCell className={classes.bold}>Name</TableCell>
                            <TableCell className={classes.bold}>Phone</TableCell>
                            <TableCell className={classes.bold}>Food</TableCell>
                            <TableCell className={classes.bold}>Cleanliness</TableCell>                        
                            <TableCell className={classes.bold}>Place</TableCell>                        
                            <TableCell className={classes.bold}>Music</TableCell>                        
                            <TableCell className={classes.bold}>Service</TableCell>                        
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
                                <TableCell className={classes.text}>{data.review}</TableCell>
                                <TableCell className={classes.text}>{data.name}</TableCell>
                                <TableCell className={classes.text}>{data.ratings}</TableCell>
                                <TableCell className={classes.text}>{data.reply}</TableCell>
                                <TableCell className={classes.text}>{data.platform}</TableCell>
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
                                        onClick={(event) => handleClick(event, data)}
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
                                            <Button onClick={editHandler}>Edit</Button>
                                            </MenuItem>
                                            <MenuItem>
                                            <Button onClick={OpenDeleteModal}>Delete</Button>
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

export default CommonTable;