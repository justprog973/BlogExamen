import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Grid, Loader, Modal, Table} from "semantic-ui-react";
import {capitalizeFirstLetter} from "./function";
import Paginated from "./Paginated";




export default  function TabCategory({categories, actions, editCategory, loadingCategory}){
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerpage = 4;

    const indexOfLastPost = currentPage * categoriesPerpage;
    const indexOfFirstPost = indexOfLastPost - categoriesPerpage;
    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return   !categories ? <Loader active/> :
        <TabCustom
            totalCategories         ={categories.length}
            currentPage             ={currentPage}
            paginate                ={paginate}
            categoriesPerpage       ={categoriesPerpage}
            categories              ={categories.slice(indexOfFirstPost, indexOfLastPost)}
            actions                 ={actions}
            editCategory            ={editCategory}
            loadingCategory         ={loadingCategory}
        />
}


function TabCustom({categories, totalCategories, currentPage, categoriesPerpage, paginate, actions, editCategory, loadingCategory}){
    if(loadingCategory){
        return <Loader active/>;
    }
    if(categories.length !== 0){
        return <>
            <Table celled striped selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nom</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {categories.map(c => {
                    return <Table.Row key={c._id}>
                        <Table.Cell collapsing>
                            {capitalizeFirstLetter(c.name)}
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='right'>
                            <Button color={!editCategory ? 'teal' : editCategory._id === c._id ? 'black' : 'teal'} icon={!editCategory ? 'edit' : editCategory._id === c._id ? 'remove' : 'edit'} onClick={()=>{
                                !editCategory ? actions.setEditCategory(c)
                                    : editCategory._id === c._id ? actions.setEditCategory(null)
                                    : actions.setEditCategory(c);
                            }}/>
                            <Modal
                                size='mini'
                                trigger={<Button icon='trash' color='red' disabled={!editCategory ? false : editCategory._id === c._id}/>}
                                header='SUPPRESSION'
                                content={`Voulez vous vraiment supprimer la categorie ${c.name} ?`}
                                actions={['NON', {
                                    key: 'done', content: 'OUI', negative: true, onClick: async () => {
                                            await actions.delete(c);
                                    }
                                }]}
                            />
                        </Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
        <Grid>
           <Grid.Row>
             <Grid.Column>
                  <Paginated
                        totalPosts     ={totalCategories}
                        postsPerpage   ={categoriesPerpage}
                        paginate       ={paginate}
                        currentPage    ={currentPage}
                  />
              </Grid.Column>
           </Grid.Row>
         </Grid>
        </>;
    }else{
        return <p>Aucune catégorie</p>
    }
}


TabCategory.propTypes = {
    categories : PropTypes.array,
    actions    : PropTypes.object.isRequired
};

TabCustom.propTypes = {
    totalCategories     : PropTypes.number.isRequired,
    currentPage         : PropTypes.number.isRequired,
    paginate            : PropTypes.func.isRequired,
    categoriesPerpage   : PropTypes.number.isRequired,
    categories          : PropTypes.array.isRequired,
    actions             : PropTypes.object.isRequired
};

