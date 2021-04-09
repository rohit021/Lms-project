import React from "react";
import { Typography,
    DialogTitle,
    DialogContent,
    IconButton,
    makeStyles,
    Dialog,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        width: "50px",
        flexDirection: "column",
        alignItems: "center",
    },
    dialogPaper: {
        position: "absolute",
        width: "33%",
        [theme.breakpoints.down("md")]: {
            width: "40%",
        },
        [theme.breakpoints.down("xs")]: {
            width: "80%",
        },
    },
    ratingStyle: {
        textAlign: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    closeButton: {
        backgroundColor: "#3f51b5",
        color: "#fff",
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // float: "right",
    }, 
    submit: {
        margin: "20px auto",
        background: "#01579b",
        color: "#fff",
    },
    selectStyle: {
        minWidth: "100%",
    },
}));

const CommonModal = ({ Title, children, openModal, closeModal }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                open={openModal}
                disableBackdropClick
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                <Typography component="h1" variant="h4" align="center">
        {Title}
      </Typography>
                    <IconButton  className={classes.closeButton} 
                        onClick={closeModal}
                    >
                        <CloseIcon />
                    </IconButton>                   
                </DialogTitle>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default CommonModal;
