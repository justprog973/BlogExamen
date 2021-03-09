import React from 'react';
import {Select} from 'semantic-ui-react';
import {capitalizeFirstLetter} from "./function";

export default function SelectCategory({categories, oldPage, actions, ...props}) {
    let options = [{key: 'all', value: 'all', text: 'Categories'}];
    if (categories !== null) {
        categories.forEach(c => {
            options.push({key: c._id, value: c._id, text: capitalizeFirstLetter(c.name)});
        });
    }
    return <Select
        placeholder="Categories"
        className={categories === null ? "loading" : null}
        options={options} {...props}
        onChange={(e,v) => {
            if(v.value === 'all'){
                actions.page(oldPage);
                actions.filter(null);
            }else{
                actions.page(1);
                actions.filter(v.value);
            }
        }}
    />;
}