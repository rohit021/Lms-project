import React, { useState } from "react";
import {Grid,ListItem, Link, Divider, Table,TableHead,makeStyles, TableRow,TableCell,TableBody, IconButton, Menu, MenuItem, Typography, Button} from '@material-ui/core';
import {Box,Dialog,DialogContent, DialogContentText, DialogTitle, DialogActions} from '@material-ui/core';
import { MoreVert as MoreIcon } from "@material-ui/icons";
import AuthService from "../../authServices/apicalls";
import Slide from '@material-ui/core/Slide'
import moment from 'moment';
const useStyles = makeStyles(theme => ({
    listItem:{
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 10
    },
      inlineStyle: {
          display: 'inline-flex',
          justifyContent: 'space-evenly'
      },
      li: {
          '&:hover': {
              backgroundColor: '#dcdcdc'
          }
      }
  }))

  
const FormTable = (props) => {
    const classes = useStyles();
    const formData = props.tableData;
    const index = props.index;
    const [Open, setOpen] = useState(false)
    var [moreButtonRef, setMoreButtonRef] = useState(null);
    const [opendeleteModal, SetopendeleteModal] = React.useState(false);

    const handleClickOpen = () => {
        SetopendeleteModal(true);
    };
  
    const handleClose = () => {
        SetopendeleteModal(false);
    };
    

    const handleDelete = () =>{
        const data ={
            id:formData._id
        }
        AuthService.deleteLeadbyId(data).then(
            (data) => {
                props.fetchData();
                SetopendeleteModal(false);
            },
            (error) => {
                SetopendeleteModal(false);
            }
          );
    }
    const DeleteDialog = () =>{
        return(
            <React.Fragment>
                 <Dialog
            open={opendeleteModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Delete Lead Details?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                once you delete the delete the lead details then you will not be able to see this in future.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={handleDelete} color="primary">
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
    
    return(
        <Box className={classes.li}>
		<ListItem className={classes.listItem}>
			<Grid container spacing={1}>
				<Grid item md={1} xs={1} sm={1}>
					<Typography className={"textLabel"}>	
						{index+1}
					</Typography>
				</Grid>
                <Grid item md={2} xs={2} sm={2}>
					<Typography className={"textLabel"}>	
						{formData.name}
					</Typography>
				</Grid>
                <Grid item md={1} xs={4} sm={2}>
					<Typography className={"textLabel"}>	
                    {moment(formData.date).format('DD-MM-YYYY')}
					</Typography>
				</Grid>
                <Grid item md={3} xs={4} sm={4}>
					<Typography className={"textLabel"}>	
						{formData.email}
					</Typography>
				</Grid>
                <Grid item md={1} xs={4} sm={2}>
					<Typography className={"textLabel"}>	
						{formData.phone}
					</Typography>
				</Grid>
                <Grid item md={2} xs={3} sm={3}>
					<Typography className={"textLabel"}>	
						{formData.organization}
					</Typography>
				</Grid>			
                <Grid item md={1} xs={2} sm={2}>
					<Typography className={"textLabel"}>	
						{formData.source}
					</Typography>
				</Grid>    
                <Grid item md={1} xs={1} sm={1}>
                    <IconButton
                        aria-owns="widget-menu"
                        aria-haspopup="true"
                        onClick={() => setOpen(true)}
                        buttonRef={setMoreButtonRef}
                    >
                        <MoreIcon />
                    </IconButton>
                    <Menu
                    id="widget-menu"
                    open={Open}
                    anchorEl={moreButtonRef}
                    onClose={() => setOpen(false)}
                    disableAutoFocusItem
                    >
                        <MenuItem>
                        <Button>Edit</Button>
                        </MenuItem>
                        <MenuItem>
                        <Button onClick={handleClickOpen} >Delete</Button>
                        </MenuItem>
                        
                    </Menu>
                </Grid>            
			</Grid>
		</ListItem>
		<Divider />
        <DeleteDialog/>
            {/* <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.bold}></TableCell>
                            <TableCell className={classes.bold}>Name</TableCell>
                            <TableCell className={classes.bold}>Date</TableCell>
                            <TableCell className={classes.bold}>Email</TableCell>
                            <TableCell className={classes.bold}>Phone</TableCell>
                            <TableCell className={classes.bold}>Organization</TableCell>
                            <TableCell className={classes.bold}>Source</TableCell>
                            <TableCell className={classes.bold}>Actions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        formData.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{moment(data.date).format('DD-MM-YYYY')}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.phone}</TableCell>
                                <TableCell>{data.organization}</TableCell>
                                <TableCell>{data.source}</TableCell>
                                
                                <TableCell>
                                    <IconButton
                                        aria-owns="widget-menu"
                                        aria-haspopup="true"
                                        onClick={() => setOpen(true)}
                                        buttonRef={setMoreButtonRef}
                                    >
                                        <MoreIcon />
                                    </IconButton>
                                    <Menu
                                    id="widget-menu"
                                    open={Open}
                                    anchorEl={moreButtonRef}
                                    onClose={() => setOpen(false)}
                                    disableAutoFocusItem
                                >
                                    <MenuItem>
                                    <Typography>Edit</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                    <Typography>Copy</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                    <Typography>Delete</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                    <Typography>Print</Typography>
                                    </MenuItem>
                                </Menu>
                                </TableCell>
                             
                            </TableRow>
                        ))
                    }
                    
                    </TableBody>
                </Table>
            </TableContainer> */}
            </Box>
    )
}

export default FormTable;