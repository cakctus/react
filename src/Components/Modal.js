import React, {useEffect, useState} from "react";
//import myModal from 'Components/Modal.css'

const styles = {
    myModal: {
        position: 'fixed',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        display: 'none',
        background: 'rgb(90, 90, 90, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    myModalActive: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    myModalContent: {
        padding: '20px',
        background: 'white',
        borderRadius: '5px',
        minWidth: '500px',
        minHeight: '300px',
        justifyContent: 'center',
        textAlign: 'center',
    }

}

function Modal({children, setVisible}) {

    return(
        <div style={styles.myModal} onClick={() => setVisible(false)}>
            <div style={styles.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal