import React, { Component } from 'react';
import RichListTitle from './components/richListTitle';
import RichListFilters from './components/richListFilters';
import RichList from './components/richList';

import { fetch, normalize } from '../common';
class RichListPage extends Component {
    constructor() {
        super();
        this.state = {
            titleData: {
                pageTitleH1: 'Loading...'
            },
            filterOptionsData: undefined,
            richList: [],
            selectedFilters: {
                selectedCountry: 'all',
                selectedCurrency: 'usd-1',
                searchText: '',
                selectedOrderBy: 'rank',
            }
        }
    }
    componentDidMount() {
        this.setState({
            loading: true,
        });
        fetch('/richList')
            .then(res => {
                const { titleData, filterOptionsData, richList } = normalize(res);
                this.setState({
                    titleData,
                    filterOptionsData,
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

    onFilterChanged = filterData => {
        const { name, value } = filterData;
        const { selectedFilters } = this.state;
        const newFilters = { ...selectedFilters };
        newFilters[name] = value;
        this.setState({
            selectedFilters: newFilters
        })
    }

    applyFilters = () => {
        const { richList, selectedFilters: { selectedCountry, selectedCurrency, searchText, selectedOrderBy } } = this.state;
        const [code, conversionRate] = selectedCurrency.split('-'); //usd-1, euro-0.92, aud-0.78
        const filteredResult = richList.filter(r => {
            let filterResult = true;
            if (selectedCountry !== 'all') {
                filterResult = r.country === selectedCountry;
            }
            if (searchText !== '') {
                const fullText = Object.values(r).map(v => v.toString()).join('').toLowerCase();
                filterResult = filterResult & fullText.lastIndexOf(searchText.toLowerCase()) !== -1;
            }
            return filterResult;
        }).sort((r1, r2) => {
            return r1[selectedOrderBy] - r2[selectedOrderBy];
        }).map(r => ({
            ...r,
            netWorth: r.netWorth / conversionRate,
        }));

        return filteredResult;
    }
    render() {
        const { titleData, filterOptionsData, selectedFilters, richList } = this.state;
        const selectedCurrencyCode = selectedFilters.selectedCurrency.split('-')[0];
        
        const filteredResult = this.applyFilters(richList);
        return <div className="main">
            <RichListTitle titleData={titleData} />
            <div className="content">
                <RichListFilters filterOptionsData={filterOptionsData}
                    selectedFilters={selectedFilters}
                    onFilterChanged={this.onFilterChanged} />
                <RichList richList={filteredResult} currencyCode={selectedCurrencyCode} />
            </div>
        </div>

    }

}
export default RichListPage;