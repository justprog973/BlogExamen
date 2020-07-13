import React from 'react';
import {Pagination, Grid} from 'semantic-ui-react';

export default function Paginated({postsPerpage, totalPosts, paginate}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerpage); i++) {
        pageNumbers.push(i);
    }
    console.log(pageNumbers.length);
    return <Grid>
        <Grid.Row>
            <Grid.Column>
                <Pagination
                    boundaryRange={0}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    onPageChange={(event, data) => paginate(data.activePage)}
                    totalPages={pageNumbers.length}
                />
            </Grid.Column>
        </Grid.Row>
    </Grid>
}