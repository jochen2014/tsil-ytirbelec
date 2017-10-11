import React from 'react';

const supportedFilterTypes = ['select', 'text'];
const FilterItem = props => {
    const {type = 'select', className, labelText, selectedValue, options, value} = props;
    if (supportedFilterTypes.lastIndexOf(type) === -1) {
        return null;
    }
    const onSelectionChanged = e => {
        const {target: {value}} = e;
        props.onSelectionChanged(value);
    }
    const onValueChanged = e => {
        const {target: {value}} = e;
        props.onValueChanged(value);
    }
    return <div className={className}>
        <div>
            <label >{labelText}</label></div>
        <div>
            {type === 'select' ? <select value={selectedValue} onChange={onSelectionChanged}>
                {options.map(o =>
                    <option key={`option_${o.val}`} value={o.val}>{o.text}</option>)
                }
            </select> :
                <input value={value} onChange={onValueChanged} />
            }
        </div>
    </div>
}

export default FilterItem;