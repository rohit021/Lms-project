import React from 'react'
import { Dialog, Button, DialogActions, DialogTitle, DialogContentText, DialogContent, Slide }from '@material-ui/core';
  const DeleteDialog = ({deleteModal, CloseDeleteModal, deleteHandler}) =>{
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

export default DeleteDialog;