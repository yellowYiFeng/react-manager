import React from 'react'
import {HashRouter , Route } from 'react-router-dom'
import Main from './main'
import About from '../router1/about'
import Topic from '../router1/Topics'

import Home from './home'
export default class IRouter extends React.Component{

    render(){
        return (
            <HashRouter>
                <Main>
                    <Route path="/main" render={()=>
                        <Home>
                            <Route path="/main/a" component={About}></Route>
                        </Home>
                    }>
                    </Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topics" component={Topic}></Route>
                </Main>
            </HashRouter>
        );
    }
}