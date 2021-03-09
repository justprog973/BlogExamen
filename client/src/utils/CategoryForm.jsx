import React, {useEffect, useState} from 'react';
import {Form, Message, Icon} from "semantic-ui-react";
import {ButtonPrimary, ButtonSecondary} from "../elements/ui/Button";
import {ApiErrors} from "./api";
import notify from "./notify";
import {categoryRegex} from "./regex";


export default function CategoryForm({actions, editCategory, loadingCategory}) {
    const [errors, setErrors] = useState('');
    const [valueCategories, setValueCategories] = useState(editCategory ? editCategory.name : '');

    useEffect(function () {
        if(editCategory){
            setValueCategories(editCategory.name);
            setErrors('');
        }else{
            setValueCategories('');
        }
    },[editCategory]);

    const handleChangeCategories = function ({value}) {
        setValueCategories(value);
    };

    const handleSubmit = async function (e) {
        e.preventDefault();
        setErrors('');
        const form = e.target;
        if (categoryRegex.regex.test(e.target.name.value) && !editCategory) {
            await actions.create({name: form.name.value});
            setValueCategories('');
        } else if (categoryRegex.regex.test(e.target.name.value) && editCategory) {
            try {
                await actions.edit(editCategory, {name: form.name.value});
                notify('success', 'La catégories a bien été modifié !');
                actions.setEditCategory(null);
                setValueCategories('');
            } catch (e) {
                if (e instanceof ApiErrors) {
                    notify('error', e.errors.message);
                } else {
                    throw e;
                }
            }
        } else {
            setErrors(categoryRegex.message);
        }
    };
    return <>
        {errors && <Message error
                            header='Vous avez des erreurs !'
                            list={[errors]}/>}
        <Form size='large' onSubmit={handleSubmit}>
            <Form.Field>
                <label htmlFor='name'>Nom</label>
                <Form.Input name='name' value={valueCategories} onChange={handleChangeCategories}/>
            </Form.Field>
            <Form.Field>
                <ButtonPrimary type='submit' width='150' className="btn-post-form" loading={loadingCategory}>
                    {editCategory ? <><Icon name='edit'/> Editer</> : 'Creer'}
                </ButtonPrimary>
                {editCategory && <ButtonSecondary type='submit'
                                                  width='150'
                                                  className="btn-post-form"
                                                  loading={loadingCategory}
                                                  onClick={()=>{
                                                      actions.setEditCategory(null);
                                                      setValueCategories('');
                                                  }}
                >
                    Nouveau
                </ButtonSecondary>}
            </Form.Field>
        </Form>
    </>
};