import React, {useState, useEffect} from 'react';
import Services from "../services";
import { Row, Col, Image, List, Button, Progress, Space, Tag, Modal, Input, Spin, Grid } from 'antd';
import './PokemonDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {catchPokemonDispatch, deletePokemonDispatch, pageIndexDispatch, offsetDispatch, pageSizeDispatch} from '../../resources/redux/Actions';
import { failResponse, successResponse } from '../../resources/constants/Constant';

const { useBreakpoint } = Grid;
export default function PokemonDetail(){

    const history = useHistory();
    const dispatch = useDispatch();
    const screens = useBreakpoint();

    let pageIndex = useSelector(state => state.pageIndex);
    let pageSize = useSelector(state => state.pageSize)
    let offset = useSelector(state => state.offset);

    const url = localStorage.getItem('URL_DETAIL');
    const isCollect = localStorage.getItem('COLLECTION_LIST');
    const newNick = localStorage.getItem('NEWNAMEPOKEMON');

    const [idPokemon, setPokemonId] = useState('');
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonImage, setPokemonImage] = useState('');
    const [pokemonWeight, setPokemonWeight] = useState('');
    const [pokemonHeight, setPokemonHeight] = useState('');
    const [pokemonAbilities, setPokemonAbilities] = useState([]);
    const [imageName] = useState('');
    const [baseExperience, setBaseExperience] = useState(0);
    const [pokemonMoves, setPokemonMoves] = useState([]);
    const [pokemonStat, setPokemonStat] = useState([]);
    const [pokemonSpecies, setPokemonSpecies] = useState({});
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [isSuccessCaught, setSuccessCaught] = useState(false);
    const [newName, setNewName] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const catchedPokemon = useSelector(state => state.newArrPokemon);

    const serviceConnection = () =>{
        const conn = new Services();
        return conn;
    }

    const getCriteriaData = async(url) =>{
        const {data} = await serviceConnection().GetPokemonCriteria(url);
        const {id, name, sprites, types, species, base_experience, weight, abilities, height, moves, stats} = data;
        setPokemonId(idPokemon => idPokemon = id);
        setPokemonName(pokemonName => pokemonName = name);
        setPokemonImage(pokemonImage => pokemonImage = sprites.front_default);
        setPokemonWeight(pokemonWeight => pokemonWeight = weight);
        setPokemonAbilities(pokemonAbilities => pokemonAbilities = abilities);
        setPokemonHeight(pokemonHeight => pokemonHeight = height);
        setPokemonMoves(pokemonMoves => pokemonMoves = moves);
        setPokemonStat(pokemonStat => pokemonStat = stats);
        setBaseExperience(baseExperience => baseExperience = base_experience);
        setPokemonSpecies(pokemonSpecies => pokemonSpecies = species);
        setPokemonTypes(pokemonTypes => pokemonTypes = types);
    }

    const back = () =>{
        localStorage.removeItem('URL_DETAIL');
        dispatch(pageIndexDispatch(pageIndex=1), offsetDispatch(offset = 0), pageSizeDispatch(pageSize=10));
        isCollect === 'CAUGHT' ? history.push('/caught-list') : history.push('/');
    }

    const newNameChange = (e) => {
        setNewName(newName => newName = e.target.value);
    }

    const catchPokemon = () => {
        setIsLoad((isLoad = true) => {
            setTimeout(() =>{
                if(Math.random() < 0.5){
                    setSuccessCaught(isSuccessCaught => isSuccessCaught = true);
                }
                else{
                    Modal.error({content: failResponse.failGetPokemon});
                }
                setIsLoad(false);
            }, 400);
        });
    }

    const handleOk = () => {
        setNewName(newName => {
            let arrValid = catchedPokemon.filter(x=>x.name === newName || x.id === idPokemon);
            if(arrValid.length > 0){
                Modal.error({content: 'Please check again... maybe the name or collection is already exist'});
                return;
            }
            if(newName === ''|| newName === undefined){
                Modal.error({content: 'name field is empty'});
                return;
            }
            const newArr = {
                id: idPokemon,
                name: newName,
                url: url
            }
            dispatch(catchPokemonDispatch(newArr));
            Modal.success({content: successResponse.successGetPokemon})
            setSuccessCaught(isSuccessCaught => isSuccessCaught = false);
        });
    }

    const handleCancel = () =>{
        setSuccessCaught(isSuccessCaught => isSuccessCaught = false);
        setIsDelete(isDelete => isDelete = false);
    }

    const deletePokemon = () =>{
        setIsDelete(isDelete => isDelete = true);
    }

    const submitDelete = () => {
        let deleted = catchedPokemon.filter(x=>x.id !== idPokemon);
        dispatch(deletePokemonDispatch(deleted));
        localStorage.removeItem('URL_DETAIL');
        isCollect === 'CAUGHT' ? history.push('/caught-list') : history.push('/');
    }

    useEffect(()=>{ 
        getCriteriaData(url);
    }, [catchedPokemon]);

    return(
        <div>
            <Modal title="" visible={isSuccessCaught} closable={false} onOk={handleOk} onCancel={handleCancel}>
                <div style={{textAlign: 'center'}}>
                    <Image src={pokemonImage} width={100} height={100}></Image>
                    <h1 style={{textTransform:'capitalize'}}>{pokemonName}</h1>
                    <h4>Congratulations, You have successfully caught the pokemon</h4>
                    <Space>
                    <span>Pokemon New Name:</span>
                    <Input placeholder="Fill new Pokemon Name" onChange={newNameChange} />
                </Space>
                </div>
            </Modal>
            <Modal title="" visible={isDelete} closable={false} onOk={submitDelete} onCancel={handleCancel}>
                <div style={{textAlign: 'center'}}>
                    <Image src={pokemonImage} width={100} height={100}></Image>
                    <h1 style={{textTransform:'capitalize'}}>{newNick}</h1>
                    <h4>Delete this pokemon?</h4>
                </div>
            </Modal>
            <Spin size="large" spinning={isLoad}>
            <Row>
                <Col xs={24} xl={10}>
                    <div className="image-field">
                        <h1 style={{textTransform:'capitalize'}} className="title">{isCollect === 'CAUGHT' ?  newNick : pokemonName}</h1>
                        <Image className="img" src={pokemonImage} width={280} height={280}></Image>
                        {
                            screens.xs ? 
                            <Space style={{margin: '10px 0'}}>
                            {pokemonAbilities.map((item, i) => (
                                <Tag key={i} color="green">{item.ability.name}</Tag>
                            ))}
                            </Space> : <> </>
                        }
                        {
                            isCollect === 'CAUGHT' ?
                            <div>
                                <Button type="danger" onClick={deletePokemon} className="button-action">Delete this pokemon</Button>
                            </div> : <div><Button type="primary" onClick={catchPokemon} className="button-action">Catch the Pokemon!</Button></div>
                        }
                        <Button type="default" onClick={back} className="button-action">Back</Button>
                    </div>
                    
                </Col>
                <Col xs={24} xl={14}>
                    <h2 className="title">Stats</h2>
                    {
                        pokemonStat.map((val, i) => (
                            <div key={i} className="stat-field">
                                <span style={{width:'200px'}}>{val.stat.name}</span>
                                <Progress
                                    strokeColor={{
                                        from: '#108ee9',
                                        to: '#87d068',
                                    }}
                                    percent={val.base_stat}
                                    status="active"
                                />
                            </div>
                        ))
                    }
                    <br />
                    <h2 className="title">Detail</h2>
                    <table>
                        <tbody>
                            <tr style={{height: '30px'}}>
                            <td className="table-text">Types</td>
                                <td style={{padding: '0 15px'}}>:</td>
                                <td>
                                    <Space>
                                        {pokemonTypes.map((item, i) => (
                                            <Tag color="green" key={i} color="success">{item.type.name}</Tag>
                                        ))}
                                    </Space>
                                </td>
                            </tr>
                            <tr style={{height: '30px'}}>
                                <td className="table-text">Species</td>
                                <td style={{padding: '0 15px'}}>:</td>
                                <td className="table-text">
                                    {pokemonSpecies.name}
                                </td>
                            </tr>
                            <tr style={{height: '30px'}}>
                                <td className="table-text">Experience</td>
                                <td style={{padding: '0 15px'}}>:</td>
                                <td className="table-text">
                                    {baseExperience}
                                </td>
                            </tr>
                            {
                                !screens.xs ? 
                                <tr style={{height: '30px'}}>
                                    <td className="table-text">Abilities</td>
                                    <td style={{padding: '0 15px'}}>:</td>
                                    <td>
                                        <Space>
                                            {pokemonAbilities.map((item, i) => (
                                                <Tag key={i} color="green">{item.ability.name}</Tag>
                                            ))}
                                        </Space>
                                    </td>
                                </tr> : <></>
                            }
                            <tr style={{height: '30px'}}>
                                <td className="table-text">Weight</td>
                                <td style={{padding: '0 15px'}}>:</td>
                                <td className="table-text">
                                    {pokemonWeight}
                                </td>
                            </tr>
                            <tr style={{height: '30px'}}>
                                <td className="table-text">Height</td>
                                <td style={{padding: '0 15px'}}>:</td>
                                <td className="table-text">
                                    {pokemonHeight}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <h2 className="title">Moves List</h2>
                        <div className="list-move">
                            <List
                                itemLayout="horizontal"
                                bordered
                                style={{backgroundColor: 'white'}}
                                dataSource={pokemonMoves}
                                renderItem={item => (
                                <List.Item >
                                    <List.Item.Meta
                                    title={item.move.name}
                                    />
                                </List.Item>
                                )}
                            />
                        </div>
                </Col>
            </Row>
            </Spin>
        </div>
    )
}