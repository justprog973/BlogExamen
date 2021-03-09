import React from 'react';
import {Form} from 'semantic-ui-react';
import {capitalizeFirstLetter} from './function';

export default function MultiSelect({categories,...props}) {
    let options = [];
    if (categories !== null) {
        categories.forEach(c => {
            options.push({key: c._id, value: c._id, text: capitalizeFirstLetter(c.name)});
        });
    }
    return <Form.Dropdown
        selection
        multiple
        options={options}
        {...props}
    />
}