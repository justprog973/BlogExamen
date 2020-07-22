import React, {useState, useRef, useEffect} from 'react';
import ReactQuill from 'react-quill';
import MultiSelect from './MultiSelect';
import {ButtonPrimary, ButtonSecondary} from '../elements/ui/Button';
import {Grid, Form, Segment, Checkbox, Icon, Label, Message, Image} from 'semantic-ui-react';
import {ApiErrors} from "./api";
import 'notyf/notyf.min.css';
import {Notyf} from "notyf";


export default function PostForm({categories, action, editPost, errors, setEditPost}) {

    //State
    const [valueCategories, setValueCategories]     = useState([]);
    const [attachment, setAttachment]               = useState('');
    const [content, setContent]                     = useState('');
    const [lengthEditor, setLengthEditor]           = useState(0);
    const [suggested, setSuggested]                 = useState(editPost ? editPost.suggested : false);
    const [errorsPost, setErrorsPost]               = useState([]);
    const [loading, setLoading]                     = useState(false);
    const [newPost, setNewPost]                     = useState(true);
    const [title, setTitle]                         = useState('');

    //instance of notyf
    const notyf = new Notyf({
        duration: 4000,
        position: {
            x: 'right',
            y: 'bottom',
        }
    });

    //Ref
    const quill = useRef(null);

    //Effect
    useEffect(function () {
        if (editPost) {
            setValueCategories(editPost.categories);
            setSuggested(editPost.suggested);
            setContent(editPost.content);
            quill.current.editor.pasteHTML(editPost.content);
            setErrorsPost('');
            setNewPost(false);
            setTitle(editPost.title);
        }
    }, [editPost]);

    //Function

    const handleChangeCategories = function (e, {value}) {
        setValueCategories(value);
    };

    const handleChangeContent = function (content) {
        let quillPrive = quill.current.editor.getLength();
        if (quillPrive >= 1) {
            quillPrive--;
        }
        setLengthEditor(quillPrive);
        setContent(content);
    };

    const handleChangeSuggested = function (e, {checked}) {
        setSuggested(checked);
    };

    const handleChangeTitle = function (e, {value}) {
        setTitle(value);
    };

    const handleCreating = function () {
        setContent('');
        setValueCategories([]);
        quill.current.editor.pasteHTML('');
        setNewPost(true);
        setSuggested(false);
        setEditPost(null);
        setTitle('');
        setAttachment('');
        errors= null;
    };

    const handleSubmit = async function (e) {
        e.preventDefault();
        setLoading(true);
        let titleE = '';
        let file = '';
        let contentText = '';
        let category = '';
        const extensions = ['png', 'jpeg', 'jpg'];
        setErrorsPost([]);

        //Check error form
        if (title.trim().length < 5) {
            titleE = 'Le titre doit contenir au moins 5 caratéres.';
        }
        if (attachment.length === 0 && !editPost && newPost) {
            file = 'L\' importation d\'une illustration est obligatoire.';
        } else if (attachment.length > 0) {
            if (!extensions.includes(e.target.attachment.files[0].type.split('/')[1])) {
                file = 'Les extensions accepter sont exclusivement les suivant : jpeg et png.';
            }
        }
        if (lengthEditor < 1250 || lengthEditor > 12500) {
            contentText = 'Le contenu doit être compris entre 1250  et 12500 caratéres.';
        }
        if (valueCategories.length === 0) {
            category = 'La nouvelle doit correspondre a au moins une catégories.';
        }
        setErrorsPost([titleE ? titleE : undefined, file ? file : null, contentText ? contentText : null, category ? category : null]);

        if (titleE === '' && file === '' && category === '' && contentText === '') {
            setErrorsPost([]);

            if(editPost && !newPost){
                console.log(editPost);
                const data = {
                    title       : title,
                    categories  : valueCategories,
                    suggested   : suggested,
                    content     : content
                };
                try{
                    await action.edit(editPost,data);
                    handleCreating();
                    notyf.success('Le poste a été edité avec success.');
                }catch (e) {
                    if(e instanceof  ApiErrors){
                        notyf.error('Ce poste est déjà existant veuillez modifiez le contenu !');
                    }else{
                        throw e;
                    }
                }
            }else{
                const data = new FormData();
                data.append('title', title);
                data.append('categories', valueCategories);
                data.append('attachment', e.target.attachment && e.target.attachment.files[0]);
                data.append('suggested', suggested);
                data.append('content', content);
               try{
                    await action.create(data);
                   handleCreating();
                   notyf.success('Le poste a été creer avec success.');
               }catch (e) {
                   if(e instanceof  ApiErrors){
                       notyf.error('Ce poste est déjà existant veuillez modifiez le contenu !');
                   }else{
                       throw e;
                   }
               }
            }

            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    return <Grid.Row>
        <Grid.Column>
            {Array.isArray(errorsPost) && errorsPost.length !== 0 &&
            <Message
                error
                header='Vous avez des erreurs !'
                list={errorsPost}
            />}
            <Form size="large" onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.Input name="title" label='Titre' placeholder="Tire" value={title} onChange={handleChangeTitle}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="categories">Catégories</label>
                        <MultiSelect
                            name="categories"
                            placeholder="Choisir une ou plusieur catégories"
                            categories={categories}
                            value={valueCategories}
                            loading={categories && false}
                            onChange={handleChangeCategories}/>
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field size="tiny">
                        <label htmlFor="suggested">Publier</label>
                        <Segment compact>
                            <Checkbox id="suggested" name="suggested" toggle checked={suggested} onChange={handleChangeSuggested}/>
                        </Segment>
                    </Form.Field>
                    <Form.Field>
                        <label>Illustration</label>
                        {editPost && !newPost ? <Image src={`uploads/posts/thumb_${editPost.attachment}`} size='tiny'/> :
                            <Segment>
                                <Label width="4" as="label" color={attachment ? "blue" : 'grey'} htmlFor="attachment"
                                       size="large" className="input-file-post-form">
                                    <Icon name="file"/>
                                    {!attachment ? "Image" : attachment}
                                </Label>
                                <input id="attachment" name="attachment" hidden type="file"
                                       onChange={(e) => setAttachment(e.currentTarget.value.split(/(\\|\/)/g).pop())}/>
                            </Segment>}
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <label htmlFor="content">Ps: Toute publication est soumise a l'approbation de
                        l'administrateur.</label>
                    <ReactQuill
                        ref={quill} name="content" id="content"
                        defaultValue={content}
                        onChange={handleChangeContent}
                        theme="snow"
                        className="mt-10"
                    />
                </Form.Field>
                <Form.Field>
                    <Label color={lengthEditor > 1250 ? "teal" : "grey"}>
                        {lengthEditor}
                    </Label>
                </Form.Field>
                <Form.Field>
                    <ButtonPrimary id='postFormSubmit' width='150' type="submit" loading={loading}
                                   className={`ui button ${editPost && !newPost && 'teal'} btn-post-form`}>
                        {editPost && !newPost && <Icon name='edit'/>}{editPost && !newPost ? `Editer` : "Creer"}
                    </ButtonPrimary>
                    {editPost && !newPost &&
                    <ButtonSecondary width='150' className="ui button btn-post-form" onClick={handleCreating}>
                        Nouveau
                    </ButtonSecondary>}
                </Form.Field>
            </Form>
        </Grid.Column>
    </Grid.Row>
}