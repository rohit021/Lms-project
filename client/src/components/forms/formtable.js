import {TableContainer,Table,TableHead,makeStyles, TableRow,TableCell,TableBody} from '@material-ui/core';
import {Box,Paper} from '@material-ui/core';
import moment from 'moment';
const useStyles = makeStyles(theme => ({
    
    bold:{
        fontWeight:"600"
    },
}))
const FormTable = (props) => {
    const formData = props.tableData;
    const classes = useStyles();
    return(
        <Box m={3}>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.bold}>Name</TableCell>
                            <TableCell className={classes.bold}>Email</TableCell>
                            <TableCell className={classes.bold}>Phone</TableCell>
                            <TableCell className={classes.bold}>Organization</TableCell>
                            <TableCell className={classes.bold}>Source</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        formData.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                {/* <TableCell>{moment(data.date).format('DD-MM-YYYY')}</TableCell> */}
                                <TableCell>{data.phone}</TableCell>
                                <TableCell>{data.organization}</TableCell>
                                <TableCell>{data.source}</TableCell>
                                </TableRow>
                        ))
                    }
                    
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default FormTable;