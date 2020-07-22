//React
import React from 'react';
import {Link} from 'react-router-dom';

//CSS
import {
    Table,
    Icon,
    Loader,
    Button,
    Modal
} from 'semantic-ui-react';



function TabCustom({posts,setEditPost, deletePost, editPost}) {
    if (Array.isArray(posts)) {
        return <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Titre</Table.HeaderCell>
                    <Table.HeaderCell>Poster</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {posts.map(p => {
                    return <Table.Row key={p._id}>
                        <Table.Cell collapsing>
                            <Icon name='file outline'/> {p.title}
                        </Table.Cell>
                        <Table.Cell collapsing>
                            <Icon name='low vision'/> {p.suggested ? 'Oui' : 'Non'}
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='right'>
                            {!p.suggested && <Button color='teal' content='Editer' onClick={()=>setEditPost(p)} icon='chevron left'/>}
                            <Link to={`post/${p._id}`}><Button icon='eye' color='blue'/></Link>
                            {!p.suggested &&  <Modal
                                size='mini'
                                trigger={<Button disabled={!!editPost} icon='trash' color='red'/>}
                                header='SUPPRESSION'
                                content={`Voulez vous vraiment supprimer le poste ${p.title}`}
                                actions={['NON', { key: 'done', content: 'OUI', negative: true, onClick: ()=>{deletePost(p)}}]}
                            />}
                        </Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
    }
    return <h3>Vous avez fait aucun poste</h3>
}

export default function TabPost({posts, setEditPost, deletePost, editPost}) {
    console.log(posts);
    return !posts ? <Loader active inline="centered"/> : <TabCustom posts={posts} editPost={editPost} setEditPost={setEditPost} deletePost={deletePost}/>;
};


