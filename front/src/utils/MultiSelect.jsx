import React, {useState} from 'react';
import {Dropdown} from 'semantic-ui-react';

export default function MultiSelect({categories, value, handleChange, ...props}) {
    let options = [];
    if (categories !== null) {
        categories.forEach(c => {
            options.push({key: c._id, value: c._id, text: c.name});
        });
    }
    return <Dropdown
        selection
        multiple
        options={options}
        {...props}
    />
}