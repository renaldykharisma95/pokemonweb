const GlobalState = {
    pageSize: 10,
    pageIndex: 1,
    offset: 0,
    catchedPokemon: {},
    newArrPokemon: []
}

export const Reducer = (state = GlobalState, action) =>{
    const {type, payload} = action;
    switch(type){
        case 'PAGE_SIZE':{
            state.pageSize = payload;
            return{
                ...state,
                pageSize: state.pageSize
            }
        }
        case 'PAGE_INDEX':{
            state.pageIndex = payload;
            return{
                ...state,
                pageIndex: state.pageIndex
            }
        }
        case 'OFFSET':{
            state.offset = payload;
            return{
                ...state,
                offset: state.offset
            }
        }
        case 'CATCHED_POKEMON':{
            state.catchedPokemon = payload;
            state.newArrPokemon = [...state.newArrPokemon, state.catchedPokemon];
            return{
                state,
                newArrPokemon: state.newArrPokemon
            }
        }
        case 'IDTODELETE':{
            state.newArrPokemon = [];
            state.newArrPokemon = payload;
            return{
                ...state,
                newArrPokemon: state.newArrPokemon
            }
        }
        default:
            return state;
    }
}

export default Reducer;