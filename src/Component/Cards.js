import React from 'react'

export default function Cards(props){
    let badgeText
    if (props.items.avail <= 100){
        badgeText = 'BOOKED'
    }else if(props.items.avail >= 100){
        badgeText = 'SOLD OUT'
    }else{
        badgeText = 'AVAILABLE'
    }

    return(
        <div className='containerroom'>
             <div className='container1'>
            { badgeText && <div className='badge'>{badgeText}</div>}
                <img src={props.items.img} alt='room'className='roombed'  />

                <div className='rate'> 
                    <strong><span>{props.items.Rate}</span></strong> 
                    </div>
                    <div className='para1'>
                        <p>{props.items.para}</p>
                    </div>

                        </div>

                        </div>
    );
}