import React from 'react';
import PropTypes from 'prop-types';

export default function Cards(props) {
    let badgeText;
    if (props.items.avail === 0) {
        badgeText = 'SOLD OUT';
    } else if (props.items.avail > 0 && props.items.avail <= 100) {
        badgeText = 'BOOKED';
    } else {
        badgeText = 'AVAILABLE';
    }

    return (
        <div className='containerroom'>
            <div className='container1'>
                {badgeText && <div className='badge'>{badgeText}</div>}
                <img src={props.items.img} alt={props.items.name || 'Room'} className='roombed' />
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

Cards.propTypes = {
    items: PropTypes.shape({
        avail: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        Rate: PropTypes.string.isRequired,
        para: PropTypes.string.isRequired,
        name: PropTypes.string,
    }).isRequired,
};
