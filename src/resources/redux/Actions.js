export const PAGE_INDEX = 'PAGE_INDEX';
export const PAGE_SIZE = 'PAGE_SIZE';
export const OFFSET = 'OFFSET';
export const CATCHED_POKEMON = 'CATCHED_POKEMON';
export const IDTODELETE = 'IDTODELETE';

export const pageIndexDispatch = data =>{
    return{
        type: PAGE_INDEX,
        payload: data
    }
}

export const pageSizeDispatch = data =>{
    return{
        type: PAGE_SIZE,
        payload: data
    }
}

export const offsetDispatch = data =>{
    return{
        type: OFFSET,
        payload: data
    }
}

export const catchPokemonDispatch = data => {
    return{
        type: CATCHED_POKEMON,
        payload: data
    }
}

export const deletePokemonDispatch = data => {
    return{
        type: IDTODELETE,
        payload: data
    }
}