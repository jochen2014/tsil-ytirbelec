import React from 'react';
import {toCurrency} from '../../common';

const RichList = ({ richList ,currencyCode}) => {

    return <div className="data-list">
        {richList.map((r, index) => (<div className="data-item" key={`item_${index}`}>
            <div className="rank"> <span>No: {r.rank}</span></div>
            <div><span>Name: {r.name}</span></div>
            <div><span>Net Worth: {toCurrency(r.netWorth, currencyCode)}</span></div>
            <div><span>Age: {r.age}</span></div>
            <div><span>Country of Birth: {r.country}</span></div>
        </div>))
        }
    </div>
}
export default RichList;