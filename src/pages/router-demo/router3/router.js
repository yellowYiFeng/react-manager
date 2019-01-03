import React from 'react'
import {HashRouter , Route ,Switch} from 'react-router-dom'
import Main from './main'
import About from '../router1/about'
import Topic from '../router1/Topics'
import Info from './info'
import Home from './home'
import NotMatch from './notMatch'
export default class IRouter extends React.Component{

    render(){
        return (
            <HashRouter>
                <Main>
                    <Switch>
                        <Route path="/main" render={()=>
                            <Home>
                                <Route path="/main/:pageid" component={Info}></Route>
                            </Home>
                        }>
                        </Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/topics" component={Topic}></Route>
                        <Route component={NotMatch}></Route>
                    </Switch>
                </Main>
            </HashRouter>
        );
    }
}