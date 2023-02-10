import React, { useEffect, useRef } from 'react';

function Modal({ id, title, children, btnProps, onClose }) {
    const ref = useRef(null);
    const closeBtn = useRef(null);
    useEffect(()=> {
        ref.current.addEventListener('hide.bs.modal', onClose);
    }, []);

    async function handleCb() {
        // Closing button hack because I didn't use the correct bootstrap package for react
        const result = await btnProps.cb();
        if (result) closeBtn.current.click();
    }

    return (
        <div ref={ref} className='modal fade' id={id} data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                <div className='modal-header'>
                    <h5 className='modal-title' id='staticBackdropLabel'>{ title }</h5>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                    { children }
                </div>
                <div className='modal-footer'>
                    <button ref={closeBtn} style={{ display: 'none' }} type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                    <button type='button' className='btn btn-primary' onClick={ handleCb }>{ btnProps.text }</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
