import { List, Card, Button } from 'antd';
import CardLayout from '../pokemon-list/CardLayout';
import React from 'react';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

export default function CaughtList(){
    const dataList = useSelector(state => state.newArrPokemon);
    const history = useHistory();

    localStorage.removeItem('NEWNAMEPOKEMON');

    const listPage = () =>{
        history.push('/');
    }
    return(
        <div>
            <Button style={{margin: '8px 0'}} onClick={listPage}>Back to pokemon list page</Button>
            <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
            dataSource = {dataList}
            renderItem = {
                item =>(
                    <List.Item>
                        <Card title={item.name} >
                            {
                                <CardLayout urlPokemon={item.url} namePokemon={item.name}></CardLayout>
                            }
                        </Card>
                    </List.Item>
                )
            }>
            </List>
        </div>
    )
}