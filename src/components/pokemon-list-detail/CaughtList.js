import { List, Card, Button } from 'antd';
import CardLayout from '../pokemon-list/CardLayout';
import React from 'react';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './CaughtList.css';

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
            grid={{ gutter: 1, xs: 1, sm: 2, md: 4, lg: 2, xl: 4, xxl: 4 }}
            dataSource = {dataList}
            renderItem = {
                item =>(
                    <List.Item>
                        <Card className="card" title={item.name} >
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