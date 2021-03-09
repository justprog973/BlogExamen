import React, {useEffect, useState} from 'react';
import {Checkbox, Form, Grid, Icon, Loader, Table} from "semantic-ui-react";
import {ButtonPrimary, ButtonSecondary} from "../../elements/ui/Button";
import {useUsers} from "../../hooks/users";
import {capitalizeFirstLetter, momentFr} from "../../utils/function";
import Paginated from "../../utils/Paginated";
import {emailRegex} from "../../utils/regex";
import {formToJson} from "../../utils/api";
import notify from "../../utils/notify";


export default function GestionUsers({actions}) {

    const {fetchUser, users, loading, updateAdmin} = useUsers();
    const [currentPage, setCurrentPage] = useState(1);
    const [change, setChange] = useState(false);
    const postsPerpage = 4;

    const indexOfLastPost = currentPage * postsPerpage;
    const indexOfFirstPost = indexOfLastPost - postsPerpage;
    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // window.scrollTo({top: 0, behavior: "smooth"});

    useEffect(function () {
        fetchUser();
    });

    return <Grid>
        <Grid.Row>
            <Grid.Column>
                <ButtonPrimary width='150px' onClick={() => actions.gestion(false)}>Gerer posts</ButtonPrimary>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <TabUser
                    loading={loading}
                    users={users && users.slice(indexOfFirstPost, indexOfLastPost)}
                    actions={{change: setChange, edit: updateAdmin}}
                    change={change}

                />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <Paginated
                    totalPosts={users && users.length}
                    postsPerpage={postsPerpage}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </Grid.Column>
        </Grid.Row>
    </Grid>
}

function TabUser({users, loading, actions, change}) {

    const handleSubmit = async function (e) {
        const form = e.target;
        if (emailRegex.regex.test(form.email.value.trim())) {
            if (form.email.value.trim() !== change.email) {
                try {
                    await actions.edit(change, formToJson(form));
                    notify('success', 'Le profile a bien été modifié.');
                } catch (e) {
                    notify('error', e.errors.message);
                }
            }
            actions.change(false);
        } else {
            notify('error', emailRegex.message);
        }
    };

    if (!loading || users) {
        if (users) {
            return <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell data-tooltip="Clicker pour changer l'email">Email</Table.HeaderCell>
                        <Table.HeaderCell data-tooltip="active ou désactive le compte">Active</Table.HeaderCell>
                        <Table.HeaderCell data-tooltip="Date inscription">Inscrit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map(u => {
                        return <Table.Row key={u._id}>
                            <Table.Cell>
                                <Icon name='user'/>{capitalizeFirstLetter(u.username)}
                            </Table.Cell>
                            <Table.Cell className='email-select-tab' onClick={() => actions.change(u)}>
                                {!change ? <><Icon name='at'/>{u.email}</> : change._id === u._id ?
                                    <Form size='large' onSubmit={handleSubmit}>
                                        <Form.Group>
                                            <Form.Field width={10}>
                                                <Form.Input name='email' defaultValue={u.email}/>
                                            </Form.Field>
                                            <Form.Field width={6}>
                                                <ButtonSecondary className='mt-10-mb' width='auto'
                                                                 type='submit'>Changer</ButtonSecondary>
                                            </Form.Field>
                                        </Form.Group>
                                    </Form> : <><Icon name='at'/>{u.email}</>}
                            </Table.Cell>
                            <Table.Cell>
                                {<Checkbox  toggle checked={u.isActive} onChange={() => {
                                    actions.edit(u, JSON.stringify({isActive : !u.isActive}));
                                }}/>}
                            </Table.Cell>
                            <Table.Cell>
                                {momentFr(u.created_at)}
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        } else {
            return <p>Aucun utilisateur.</p>
        }
    }
    return <Loader active inline="centered"/>
}
