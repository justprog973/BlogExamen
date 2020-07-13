import React from 'react';
import {Select} from 'semantic-ui-react';

export default function SelectCategory({categories, ...props}) {
    let options = [{key: 'all', value: 'all', text: 'Categories'}];
    if (categories !== null) {
        categories.forEach(c => {
            options.push({key: c._id, value: c._id, text: c.name});
        });
    }
    return <Select placeholder="Categories" className={categories === null ? "loading" : null}
                   options={options} {...props}/>;
}