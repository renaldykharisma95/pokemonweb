import Services from "../services"
import React, {useState, useEffect} from 'react';
import { failResponse } from "../../resources/constants/Constant";
import { List, Card, Select, Pagination, Button } from 'antd';
import CardLayout from "./CardLayout";
import {pageSizeDispatch, pageIndexDispatch, offsetDispatch} from "../../resources/redux/Actions";
import { useDispatch, useSelector } from 'react-redux';
import CaughtList from "../pokemon-list-detail/CaughtList";
import { useHistory } from "react-router-dom";
import "./PokemonList.css";

const { Option } = Select;
export default function PokemonList(){

    const pages = [10, 50, 100];

    const [dataList, setDataList] = useState([]);
    const [dataCount, setDataCount] = useState(0);

    let pageIndex = useSelector(state => state.pageIndex);
    let pageSize = useSelector(state => state.pageSize)
    let offset = useSelector(state => state.offset);
    const dataCaughtList = useSelector(state => state.newArrPokemon);

    const dispatch = useDispatch();
    const history = useHistory();

    const serviceConnection = () =>{
        const conn = new Services();
        return conn;
    }

    const getAllData = async(page, offset) =>{
        const {data, status} = await serviceConnection().GetPokemonList(page, offset);
        if(status !== 200){
            alert(failResponse.failGetData);
        }
        const {count, results} = data;
        setDataList(dataList => dataList = results);
        setDataCount(dataCount => dataCount = count);
    }

    useEffect(() => {
        localStorage.clear('URL_DETAIL');
        localStorage.clear('COLLECTION_LIST');
        async function fetchData() {
            await getAllData(10, offset);
        }
        fetchData();
    }, [CaughtList]);

    const pageChange = async(value) =>{
        dispatch(pageSizeDispatch(pageSize = value));
        await getAllData(pageSize, offset);
    }

    const onPageChange = async(value) =>{
        dispatch(pageIndexDispatch(pageIndex=value), offsetDispatch(offset = value !== 1 ? (pageIndex - 1) * pageSize : 0));
        await getAllData(pageSize, offset);
    }

    const CaughtPage = () =>{
        localStorage.setItem('COLLECTION_LIST', 'CAUGHT');
        history.push('/caught-list');
    }
        
    return(
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span>Show:</span>
                <Select defaultValue={10} style={{ width: 120, margin: 8 }} onChange={pageChange}>
                    {
                        pages.map((item, i) => (
                            <Option key={i} value={item}>
                                {item}
                            </Option>
                        ))
                    }
                </Select>
                <Button onClick={CaughtPage}>See your {dataCaughtList.length} pokemon</Button>
            </div>
            <List
            grid={{ gutter: 1, xs: 1, sm: 2, md: 4, lg: 2, xl: 4, xxl: 3 }}
            dataSource = {dataList}
            renderItem = {
                item =>(
                    <List.Item>
                        <Card className="card" title={item.name} >
                            {
                                <CardLayout urlPokemon={item.url}></CardLayout>
                            }
                        </Card>
                    </List.Item>
                )
            }>
            </List>
            <br/>
            <Pagination style={{textAlign: 'center'}} defaultCurrent={pageIndex} total={dataCount} onChange={onPageChange} showSizeChanger={false}  />
        </div>
    )
}