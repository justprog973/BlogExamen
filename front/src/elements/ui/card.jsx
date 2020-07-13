//React
import React from 'react';
//CSS
import {Card, Image, Label} from 'semantic-ui-react';
import './uiStyle.css';

export default function card({post}) {
    return <Card.Group className="card-group">
        {post.map(p => {
            return <Card key={p._id}>
                <Card.Content>
                    <Image
                        floated='right'
                        size='tiny'
                        src={`uploads/posts/thumb_${p.attachment}`}
                        rounded
                    />
                    <Card.Header>{p.title}</Card.Header>
                    <Card.Meta><Label icon="user" content={"  " + p.author.username}/></Card.Meta>
                    <Card.Meta>{p.categories.map(c => c.name)}</Card.Meta>
                </Card.Content>
                <Card.Content>
                    <Card.Meta><Label icon="hourglass half" content={"  " + p.created_at}/></Card.Meta>
                    <Card.Description>
                        Steve wants to add you to the group <strong>best friends</strong>
                    </Card.Description>
                </Card.Content>
            </Card>
        })}
    </Card.Group>
}