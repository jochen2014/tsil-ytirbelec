import React, {Component} from 'react';
import RichListTitle from './components/richListTitle';
import RichListFilters from './components/richListFilters';
import RichList from './components/richList';

import {fetch, normalize} from '../common';
class RichListPage extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            titleData: undefined,
            filterData: undefined,
            richList: [],
        }
    }
    componentDidMount() {
        this.setState({
            loading: true,
        });
        fetch('/richList')
            .then(res => {
                const {titleData, filterData, richList} = normalize(res);
                this.setState({
                    loading: false,
                    titleData,
                    filterData,
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
        const {loading, titleData, filterData, richList} = this.state;
        return <div>
            {
                loading ? <h1>loading data... please wait</h1>
                    : <div className="main">
                        <RichListTitle titleData={titleData} />
                        <div className="content">
                            <RichListFilters filterData={filterData} />
                            <RichList richList={richList} />
                        </div>

                    </div>
            }
        </div>
    }

}
export default RichListPage;