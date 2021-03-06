import React, { useState, useEffect } from 'react';
import { Paper, IconButton, Button, Menu, MenuItem, Table, TableHead, TableBody, TableSortLabel, TableRow, TableCell, TableContainer } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import EditModal from '../modals/edit-modal';
import { MoreVert as MoreIcon } from "@material-ui/icons";
import AuthService from "../../authServices/apicalls";
import DeleteDialog from '../modals/delete-modal'
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
    priority: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "700",
        borderRadius: "10px",
        padding: "5px"
    },
    text: {
        fontSize: 16,
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

const CommonTable = ({ fetchData, LeadHeadCells, filterValue, tableData, updateData }) => {
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

    const handleRequestSort = (property) => (event) => {
        const isAsc = orderBy === property && Order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setFilterData({ ...filterData, order: Order, orderBy: orderBy });
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

    const deleteHandler = () => {
        AuthService.deleteLeadById(dataId).then(
            (data) => {
                setdeleteModal(false);
                fetchData();
            },
            (error) => {
                setdeleteModal(false);
            }
        );
    }

    const PriorityChecker = (value) => {
        return (
            <React.Fragment>
                {value === 'Hot' ? (<div className={classes.priority} style={{ backgroundColor: "#ef3d00" }}>{value}</div>) : ''}
                {value === 'Neutral' ? (<div className={classes.priority} style={{ backgroundColor: "#ff8800" }}>{value}</div>) : ''}
                {value === 'Cold' ? (<div className={classes.priority} style={{ backgroundColor: "#01579b" }}>{value}</div>) : ''}
            </React.Fragment>
        )
    }

    return (
        <Paper className={classes.paper}>
            {openmodal ? <EditModal id={dataId} reload={fetchData} openModal={openmodal} organization={filterData.organization} closeModal={editHandler} /> : ''}
            {deleteModal ? <DeleteDialog deleteModal={deleteModal} CloseDeleteModal={CloseDeleteModal} deleteHandler={deleteHandler}  /> : ''}
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
                            {LeadHeadCells.map((headCell) => (
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
                            {filterData.organization === "radix" ?
                                <TableCell className={classes.bold}>
                                    Doctor Name
                                </TableCell> : ""
                            }
                            {filterData.organization === "relp" ?
                                <TableCell className={classes.bold}>
                                    Property Name
                                </TableCell>
                                : ""
                            }
                            {filterData.organization === "relp" ?
                                <TableCell className={classes.bold}>
                                    Remarks
                                </TableCell>
                                : ""
                            }
                            {filterData.organization === "woodapple" ?
                                <TableCell className={classes.bold}>
                                    Category
                                </TableCell> : ""
                            }
                            {filterData.organization === "anardana" ?
                                <TableCell className={classes.bold}>
                                    Center
                                </TableCell> : ""
                            }
                            <TableCell className={classes.bold}>Status</TableCell>
                            <TableCell className={classes.bold}>Logs</TableCell>
                            <TableCell className={classes.bold}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableData.map((data, index) => (
                                <TableRow key={index} className={classes.li}
                                >
                                    <TableCell className={classes.text}>{index + 1}</TableCell>
                                    <TableCell className={classes.text}>{moment(data.date).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell className={classes.text}>{data.name}</TableCell>
                                    <TableCell className={classes.text}>{data.phone}</TableCell>
                                    <TableCell className={classes.text}>{data.source}</TableCell>
                                    {
                                        filterData.organization === "radix" ?
                                            <TableCell className={classes.text}>{data.doctor}</TableCell>
                                            : " "
                                    }
                                    {
                                        filterData.organization === "woodapple" ?
                                            <TableCell className={classes.text}>{data.category}</TableCell>
                                            : " "
                                    }
                                    {
                                        filterData.organization === "anardana" ?
                                            <TableCell className={classes.text}>{data.center}</TableCell>
                                            : " "
                                    }
                                    {
                                        filterData.organization === "relp" ?
                                            <TableCell className={classes.text}>{data.propertyName}</TableCell>
                                            : " "
                                    }
                                    {
                                        filterData.organization === "relp" ?
                                            <TableCell className={classes.text} style={{ wordBreak: "break-all" }}>{data.remark}</TableCell>
                                            : " "
                                    }
                                    <TableCell className={classes.text}>{PriorityChecker(data.priority)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ margin: "5px auto", background: "#01579b", color: "#fff" }}
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

                                    </TableCell>
                                </TableRow>
                            ))
                        }
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
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default CommonTable;