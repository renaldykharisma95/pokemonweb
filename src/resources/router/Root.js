import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BaseLayout from "../../components/base-layout/BaseLayout";
import PokemonDetail from "../../components/pokemon-detail/PokemonDetail";
import PokemonList from "../../components/pokemon-list/PokemonList";
import CaughtedList from "../../components/pokemon-list-detail/CaughtList";

export default function Root(){
    return(
        <div>
            <Router>
                <Switch>
                    <BaseLayout>
                        <Route path="/" exact component={PokemonList}></Route>
                        <Route path="/detail" component={PokemonDetail}></Route>
                        <Route path="/caught-list" component={CaughtedList}></Route>
                    </BaseLayout>
                </Switch>
            </Router>
        </div>
    )
}