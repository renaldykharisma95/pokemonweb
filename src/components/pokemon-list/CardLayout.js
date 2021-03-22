import React, {useState, useEffect} from 'react';
import Services from "../services"
import { Image, Space, Tag, Button, Grid } from 'antd';
import { useHistory } from "react-router-dom";
import './CardLayout.css';

const { useBreakpoint } = Grid;

export default function CardLayout({urlPokemon, namePokemon}){

    const isCollect = localStorage.getItem('COLLECTION_LIST');
    const screens = useBreakpoint();

    const [pokemonImage, setPokemonImage] = useState('');
    const [pokemonWeight, setPokemonWeight] = useState('');
    const [pokemonHeight, setPokemonHeight] = useState('');
    const [pokemonAbilities, setPokemonAbilities] = useState([]);
    const history = useHistory();

    const serviceConnection = () =>{
        const conn = new Services();
        return conn;
    }

    const getCriteriaData = async(url) =>{
        const {data} = await serviceConnection().GetPokemonCriteria(url);
        const {sprites, weight, abilities, height} = data;
        setPokemonImage(pokemonImage => pokemonImage = sprites);
        setPokemonWeight(pokemonWeight => pokemonWeight = weight);
        setPokemonAbilities(pokemonAbilities => pokemonAbilities = abilities);
        setPokemonHeight(pokemonHeight => pokemonHeight = height);
    }

    useEffect(() => {
        async function fetchData() {
            await getCriteriaData(urlPokemon);
        }
        fetchData();
    }, [urlPokemon]);

    const viewDetail = (val) =>{
        localStorage.setItem('URL_DETAIL', val);
        if(isCollect === 'CAUGHT'){
            localStorage.setItem('NEWNAMEPOKEMON', namePokemon);
        }
        history.push('/detail');
    }

    return(
        <div breakpoint="xs">
            <div className="content1">
                <Image src={pokemonImage.front_default} width={90} height={80}></Image><br />
                {screens.xs ?
                <div id="tag">
                    <Space>    
                        {pokemonAbilities.map((item, i) => (
                            <Tag key={i} color="success">{item.ability.name}</Tag>
                        ))}
                    </Space>
                </div> 
                 : <></>
                } 
                <div>
                    <table>
                        <tbody>
                            {
                                screens.xs ? <></> :
                                <tr>
                                    <td>Abilities</td>
                                    <td style={{padding: '0 15px'}}>:</td>
                                    <td>
                                        <Space>
                                            {pokemonAbilities.map((item, i) => (
                                                <Tag key={i} color="success">{item.ability.name}</Tag>
                                            ))}
                                        </Space>
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td>Weight</td>
                                <td style={{padding: '0 15px'}}>:</td>
                                <td>{pokemonWeight}</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td style={{padding: '0 15px'}}>:</td>
                                <td>{pokemonHeight}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Button onClick={viewDetail.bind(this, urlPokemon, )} style={{marginTop: '6px'}}>View Detail</Button>
                </div>
            </div>
        </div>
    )
}