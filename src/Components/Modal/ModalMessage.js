import React, { useEffect } from 'react';

const ModalMessage = ({modalContent, closeModal}) => {
    console.log(closeModal)
  useEffect(() => {
    setTimeout(() => {
        closeModal(false)
    }, 2000)
  })

  return <div className='model'>
          <p>{modalContent}</p>
         </div>;
  
};
export default ModalMessage