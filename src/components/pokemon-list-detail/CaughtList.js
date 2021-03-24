import { List, Card, Button } from 'antd';
import CardLayout from '../pokemon-list/CardLayout';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {pageIndexDispatch, offsetDispatch, pageSizeDispatch} from '../../resources/redux/Actions';
import './CaughtList.css';

export default function CaughtList(){
    const dataList = useSelector(state => state.newArrPokemon);
    let pageIndex = useSelector(state => state.pageIndex);
    let pageSize = useSelector(state => state.pageSize)
    let offset = useSelector(state => state.offset);

    const history = useHistory();
    const dispatch = useDispatch();

    localStorage.removeItem('NEWNAMEPOKEMON');

    const listPage = () =>{
        dispatch(pageIndexDispatch(pageIndex=1), offsetDispatch(offset = 0), pageSizeDispatch(pageSize=10));
        history.push('/');
    }
    return(
        <div>
            <Button style={{margin: '8px 0'}} onClick={listPage}>Back to pokemon list page</Button>
            <List
            grid={{ gutter: 3, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 4 }}
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