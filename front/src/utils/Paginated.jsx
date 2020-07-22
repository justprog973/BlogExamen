import React from 'react';
import {Pagination, Grid} from 'semantic-ui-react';

export default function Paginated({postsPerpage, totalPosts, paginate, setOldPage}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerpage); i++) {
        pageNumbers.push(i);
    }
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
                    onPageChange={(event, data) => {
                        setOldPage(data.activePage);
                        paginate(data.activePage)
                    }}
                    totalPages={pageNumbers.length}
                />
            </Grid.Column>
        </Grid.Row>
    </Grid>
}