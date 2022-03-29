// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {ErrorBoundary} from "react-error-boundary";

function PokemonInfo({pokemonName}) {
    const [state, setState] = React.useState({status: 'idle', pokemon: null, error: null})
    const {status, pokemon, error} = state
    React.useEffect(() => {
        if (!pokemonName) return
        setState({status: 'pending'})
        fetchPokemon(pokemonName).then(
            pokemon => {
                setState({status: 'resolved', pokemon})
            }
        ).catch(error => {
                setState({status: 'rejected', error})
            }
        )

    }, [pokemonName])

    // idle: no request made yet
    // pending: request started
    // resolved: request successful
    // rejected: request failed
    if (status === 'idle') return "Submit a pokemon"
    else if (status === 'pending') return <PokemonInfoFallback name={pokemonName}/>
    else if (status === 'rejected') throw error
    else return <PokemonDataView pokemon={pokemon}/>
}

function App() {
    const [pokemonName, setPokemonName] = React.useState('')

    function handleSubmit(newPokemonName) {
        setPokemonName(newPokemonName)
    }

    return (
        <div className="pokemon-info-app">
            <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit}/>
            <hr/>
            <div className="pokemon-info">
                <ErrorBoundary key={pokemonName}>
                    <PokemonInfo pokemonName={pokemonName}/>
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default App
