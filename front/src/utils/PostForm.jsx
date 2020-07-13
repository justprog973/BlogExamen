import React, {useState, useRef, useEffect} from 'react';
import ReactQuill from 'react-quill';
import MultiSelect from './MultiSelect';
import {ButtonPrimary} from '../elements/ui/button';
import {Grid, Form, Segment, Checkbox, Icon, Label} from 'semantic-ui-react';

export default function PostForm({categories, name = null, loadingPost}, action) {
    const [valueCategories, setValueCategories] = useState([]);
    const [filename, setFileName]               = useState("");
    const [content, setContent]                 = useState("");
    const [lengthEditor, setLengthEditor]       = useState(0);
    const [suggested, setSuggested]             = useState(false);
    const [errorsPost, setErrorsPost]           = useState({});


    const quill = useRef(null);
    function handleChange  (e, {value}) {
        setValueCategories([value]);
    }
    function handleChangeContent(content){
        let quillPrive = quill.current.editor.getLength();
        if(quillPrive >= 1){
            quillPrive --;
        }
        setLengthEditor(quillPrive);
        setContent(content);
    }
    function handleChangeSuggested(e,{checked}){
        setSuggested(checked);
    }
    function handleSubmit(e){
        e.preventDefault();

        let title   = {};
        let file    = {};
        let contentText = {};
        let categories = {};
        const extensions = ['png','jpeg','jpg'];
        setErrorsPost({});

        if(e.target.title.value.length < 5){
            title = {title: {message : 'Le titre doit contenir au moins 5 caratéres.'}};
        }

        if(filename.length === 0){
            file = {file: {message : 'L\' importation d\'image est obligatoire.'}};
        }else if(filename.length > 0){
            if(!extensions.includes(e.target.attachment.files[0].type.split('/')[1])){
                file = {file: {message : 'Les extensions accepter sont exclusivement les suivant : jpeg et png.'}}
            }
        }
        if(content.length > 1250  ||  content.length < 12500){
            contentText = {content: {message: 'Le contenu doit être compris entre 1250  et 12500 caratéres.'}}
        }
        if(valueCategories.length === 0){
            categories = {categories: {message: 'La nouvelle doit correspondre a au moins une catégories.'}}
        }

        setErrorsPost({...title, ...file, ...contentText, ...categories});
        if(setErrorsPost){
            return false;
        }else{
            console.log('OK');
        }

    }

    return <Grid.Row>
        <Grid.Column>
            <Form size="large" onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.Input name="title" label='Titre' placeholder="Tire"/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="categories">Catégories</label>
                        <MultiSelect
                            name="categories"
                            placeholder="Choisir une ou plusieur catégories"
                            categories={categories}
                            value={valueCategories}
                            loading={categories && false}
                            onChange={handleChange}/>
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field size="tiny">
                        <label htmlFor="suggested">Publier</label>
                        <Segment compact>
                            <Checkbox id="suggested" name="suggested" toggle onChange={handleChangeSuggested}/>
                        </Segment>
                    </Form.Field>
                    <Form.Field>
                        <label>Obligatoire</label>
                        <Segment>
                            <Label width="4" as="label" color={filename ? "blue" : 'grey'} htmlFor="attachment" size="large" className="input-file-post-form">
                                <Icon name="file"/>
                                {!filename ? "Image" : filename}
                            </Label>
                            <input id="attachment" name="attachment" hidden type="file" onChange={(e) => setFileName(e.currentTarget.value.split(/(\\|\/)/g).pop())}/>
                        </Segment>
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <label htmlFor="content">Ps: Toute publication est soumise a l'approbation de l'administrateur.</label>
                    <ReactQuill preserveWhitespace={true} ref={quill} name="content" id="content" defaultValue={content} onChange={handleChangeContent} theme="snow" className="mt-10"/>
                </Form.Field>
                <Form.Field>
                    <Label>
                        {lengthEditor}
                    </Label>
                </Form.Field>
                <Form.Field>
                    <ButtonPrimary type="submit" className="ui button teal btn-post-form">
                        {name || "Enregistrer"}
                    </ButtonPrimary>
                </Form.Field>
            </Form>
        </Grid.Column>
    </Grid.Row>
}