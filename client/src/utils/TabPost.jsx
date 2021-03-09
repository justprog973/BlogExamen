//React
import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";
import PropTypes from 'prop-types';
//CSS
import {
    Loader,
    Button,
    Modal,
    Label,
    Image,
    Card,
    Grid,
    Checkbox,
    Icon
} from 'semantic-ui-react';
import Paginated from './Paginated';
import notify from "./notify";
import {ApiErrors} from "./api";
import {capitalizeFirstLetter, momentFr, getViews} from "./function";;


/**
 *
 * @param posts
 * @param setStatutPost
 * @param editPost
 * @param user
 * @param categories
 * @returns {*}
 * @constructor
 */
export default function TabPost({
                                    posts,
                                    actions,
                                    editPost,
                                    user,
                                    categories,
                                    views
                                }) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerpage = 6;

    const indexOfLastPost = currentPage * postsPerpage;
    const indexOfFirstPost = indexOfLastPost - postsPerpage;
    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return !posts ?
        <Loader active inline="centered"/>
        :
        <TabCustom
            posts={posts.slice(indexOfFirstPost, indexOfLastPost)}
            totalPosts={posts.length}
            editPost={editPost}
            user={user}
            actions={actions}
            categories={categories}
            currentPage={currentPage}
            paginate={paginate}
            postsPerpage={postsPerpage}
            views = {views}
        />;
};


/**
 *
 * @param posts
 * @param setStatutPost
 * @param totalPosts
 * @param postsPerpage
 * @param paginate
 * @param currentPage
 * @param editPost
 * @param user
 * @param categories
 * @returns {*}
 * @constructor
 */
function TabCustom({
                       posts,
                       totalPosts,
                       postsPerpage,
                       paginate,
                       currentPage,
                       actions,
                       editPost,
                       user,
                       categories,
                       views
                   }) {
    if (Array.isArray(posts) && posts.length !== 0) {
        return <>
            <Card.Group className='card-format'>
                {posts.map(p => {
                    return <Card key={p._id}>
                        <Card.Content>
                            <Card.Header>
                                {capitalizeFirstLetter(p.title)}
                            </Card.Header>
                            <Card.Description>
                                <Label color='grey'>{momentFr(p.created_at, 'time')}</Label>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content>
                            <Card.Meta>
                                <Label content={capitalizeFirstLetter(p.author.username)}/>
                            </Card.Meta>
                            <Card.Description>
                                <Label color={p.suggested ? 'teal' : 'red'}
                                       content={`Poster : ${p.suggested ? 'OUI' : 'NON'}`}/>
                                {user.isAdmin && p.suggested ?
                                    <Checkbox className='right floated' toggle checked={p.published} onChange={() => {
                                        actions.edit(p, {published: !p.published})
                                    }}/>
                                    : p.published ? <Label className="right floated teal">Accepter</Label>
                                        : <Label className="right floated grey">Traitement</Label>}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            {!p.suggested ?
                                <Button color={!editPost ? 'teal' : editPost._id === p._id ? 'black' : 'teal'}
                                        onClick={() => {
                                            !editPost ? actions.setEditPost(p)
                                                : editPost._id === p._id ? actions.setEditPost(null)
                                                : actions.setEditPost(p)
                                        }}
                                        icon={!editPost ? 'edit' : editPost._id === p._id ? 'remove' : 'edit'}
                                        disabled={!editPost ? false : editPost._id !== p._id}
                                /> : user.isAdmin && !p.published &&
                                <Button color={!editPost ? 'teal' : editPost._id === p._id ? 'black' : 'teal'}
                                        onClick={() => {
                                            !editPost ? actions.setEditPost(p)
                                                : editPost._id === p._id ? actions.setEditPost(null)
                                                : actions.setEditPost(p)
                                        }}
                                        icon={!editPost ? 'edit' : editPost._id === p._id ? 'remove' : 'edit'}
                                />
                            }
                            <Modal trigger={<Button icon='eye' className='blue-3F3D56'/>} closeIcon>
                                <Modal.Header>{p.title}</Modal.Header>
                                <Image
                                    width='100%'
                                    src={`uploads/posts/${p.attachment}`}
                                />
                                <Modal.Content>
                                    <Modal.Description>
                                        <Label color='teal'><Icon name='user'/>{p.author.username}</Label>
                                        {categories && p.categories.map((c0, i) => <Label
                                            key={i}>{categories.map(c1 => c0 === c1._id && c1.name)}</Label>)}
                                        <Label color='blue'><Icon name='eye'/>{getViews(p._id, views)}</Label>
                                        <ReactMarkdown className='mt-10' source={p.content} escapeHtml={false}/>
                                    </Modal.Description>
                                </Modal.Content>
                            </Modal>
                            {!p.suggested ? <Modal
                                size='mini'
                                trigger={<Button disabled={!editPost ? false : editPost._id === p._id} icon='trash'
                                                 color='red'/>}
                                header='SUPPRESSION'
                                content={`Voulez vous vraiment supprimer le poste ${p.title}`}
                                actions={['NON', {
                                    key: 'done', content: 'OUI', negative: true, onClick: async () => {
                                        try {
                                            await actions.delete(p);
                                            notify('success', 'Le post a bien été suppirmé !');
                                        } catch (e) {
                                            if (e instanceof ApiErrors) {
                                                notify('error', e.errors.message);
                                            } else {
                                                throw e;
                                            }
                                        }
                                    }
                                }]}
                            /> : user.isAdmin && <Modal
                                size='mini'
                                trigger={<Button disabled={!editPost ? false : editPost._id === p._id} icon='trash'
                                                 color='red'/>}
                                header='SUPPRESSION'
                                content={`Voulez vous vraiment supprimer le poste ${p.title}`}
                                actions={['NON', {
                                    key: 'done', content: 'OUI', negative: true, onClick: async () => {
                                        try {
                                            await actions.delete(p);
                                            notify('success', 'Le post a bien été suppirmé !');
                                        } catch (e) {
                                            if (e instanceof ApiErrors) {
                                                notify('error', e.errors.message);
                                            } else {
                                                throw e;
                                            }
                                        }
                                    }
                                }]}
                            />}
                        </Card.Content>
                    </Card>
                })}
            </Card.Group>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Paginated
                            totalPosts={totalPosts}
                            postsPerpage={postsPerpage}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>

    }
    return <h3>Vous avez fait aucun post</h3>
}

TabPost.propTypes = {
    posts: PropTypes.array,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    editPost: PropTypes.object,
    categories: PropTypes.array
};

