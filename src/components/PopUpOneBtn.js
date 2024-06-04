import React from 'react';


const PopUpOneBtn = (props) => {
  return ( props.trigger ) ? (
    <div className='popUp'>
        <div className='popUp-inner' style={{boxSizing:'content-box',backgroundColor:'#d4ddf7', borderRadius:'16px', padding:'16px'}}>
            <div style={{color:'black',fontSize: '20px' }}>
              { props.children }
            </div>
            <button className="close-btn" onClick={()=>props.setTrigger(false)} aria-label="Close the message">
              Done
            </button>
        </div>
    </div>
  ) : "";
}

export default PopUpOneBtn