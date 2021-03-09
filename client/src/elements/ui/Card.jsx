//React
import React from 'react';
//CSS
import {Card, Loader, Image, Label, Icon, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './uiStyle.css';
import {capitalizeFirstLetter, getViews, momentFr} from "../../utils/function";

function CardCustom({post, views}) {
    if (Array.isArray(post) && post.length > 0) {
        return <Card.Group className='card-format'>
            {post.map(p => {
                return <Card key={p._id}>
                    <Image src={`uploads/posts/thumb_${p.attachment}`}/>
                    <Card.Content>
                        <Card.Header>
                            <Link to={`/blog/post/${p._id}`}>{capitalizeFirstLetter(p.title)}</Link>
                        </Card.Header>
                        <Card.Description>
                            <Label color='grey'>
                                {momentFr(p.created_at, 'time')}
                            </Label>
                            <Label className='right floated'>
                                {p.author.username}
                            </Label>
                        </Card.Description>
                        <Card.Description>
                            <Card.Meta>
                                {p.categories.map((c, i) => <Label key={i}
                                                                   className='mt-10'>{capitalizeFirstLetter(c.name)}</Label>)}
                            </Card.Meta>
                        </Card.Description>
                    </Card.Content>
                    <Card.Description className='p-14'>
                        <Link className='ui button teal' to={`/blog/post/${p._id}`}>Lire</Link>
                        <Button className='right floated blue-3F3D56 no-cursor'> <Icon
                            name='eye'/> {getViews(p._id, views)}</Button>
                    </Card.Description>
                </Card>

            })}
        </Card.Group>
    } else {
        return <h2>Aucun post disponible ...</h2>
    }
}

export default function CardPost({posts, postLoading, views}) {
    return posts === null || postLoading ? <Loader active inline="centered"/> : <CardCustom post={posts} views={views}/>;
};