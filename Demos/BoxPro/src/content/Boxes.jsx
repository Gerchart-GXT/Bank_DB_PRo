import React, { Component } from 'react';
import Box from './Box';

const Boxes = (props) => {
    return (
        <React.Fragment>
            <button onClick={props.clickForReset} type="button" className="btn btn-warning m-2">
                reset
            </button>
            {
                props.boxes.map(box => (
                    <Box
                        key={box.id}
                        box={box}
                        handleDel={props.handleDel}
                        clickForRightMove={props.clickForRightMove}
                        clickForLeftMove={props.clickForLeftMove}
                    >
                        <h3>Box</h3>
                        <p style={{color: "red", fontSize: "30px", margin: "10px"}}>{box.id}</p>
                    </Box>
                ))
            }
        </React.Fragment>
    );
}
 
export default Boxes;