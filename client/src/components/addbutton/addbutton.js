import React from "react";
import { Button } from "@material-ui/core";

const AddButton = ({ handleChange, children }) => {
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                style={{
                    float: "right",
                    margin: "5px auto",
                    background: "#01579b",
                    color: "#fff",
                }}
              onClick={handleChange}
            >
                {children}
            </Button>
        </div>
    );
};

export default AddButton;
