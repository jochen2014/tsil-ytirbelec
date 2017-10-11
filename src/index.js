import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './styles/index.less'

import RichListPage from './richListPage';
class App extends Component {
    render() {
        return <RichListPage />
    }
}

ReactDom.render(<App/>,document.querySelector('#root'));