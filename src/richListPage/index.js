import React, {Component} from 'react';
import RichListFilters from './components/richListFilters';
import RichList from './components/richList';

import {fetch, normalize} from '../common';
class RichListPage extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            pageData: undefined,
            richList: [],
        }
    }
    componentDidMount() {
        this.setState({
            loading: true,
        });
        fetch('/richList')
            .then(res => {
                console.log(res)
                const {pageData, richList} = normalize(res);
                this.setState({
                    loading: false,
                    pageData,
                    richList,
                })
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    pageData: {
                        title1: 'error',
                        title2: 'todo'
                    }
                })
                console.error('todo:error handling')
            })
    }

    render() {
        const {loading, pageData, richList} = this.state;
        return <div>
            {
                loading ? <h1>loading data... please wait</h1>
                    : <div>
                        <RichListFilters />
                        <RichList />
                    </div>
            }
        </div>
    }

}
export default RichListPage;