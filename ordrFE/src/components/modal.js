import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


const style = {
  position: 'relative',
  width: '100%',
  bgcolor: 'background.paper',
  border: '1px solid #DCDDE0',
  borderRadius: '8px',
  outline: 'none',
  margin: '20px auto',
  p: 4,

};

export const CustomModal = (props) => {
  return (
    <div>
      <Modal
        {...props}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{overflow: 'auto'}}
      >
        <div className="mainModalBox" style={{...props.style}}>
          <Box sx={style}>
            <CloseRoundedIcon
              className="closeIconDesign"
              onClick={()=>{
                props.onClose()
              }}
              />
            { props.body }
          </Box>
        </div>
      </Modal>
    </div>
  );
}
