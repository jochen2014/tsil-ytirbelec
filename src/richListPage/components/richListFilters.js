import React, { Component } from 'react';
import { FilterItem } from '../../common';


class RichListFilters extends Component {

    constructor() {
        super();
        this.state = {
            ready: false,
            countryOptions: [],
            selectedCountry: undefined,

            currencyOptions: [],
            selectedCurrency: undefined,

            searchText: '',

            orderByOptions: [
                {
                    val: 'rank',
                    text: 'Rank'
                },
                {
                    val: 'name',
                    text: 'Name'
                },
                {
                    val: 'age',
                    text: 'Age'
                },
            ],
            selectedOrderBy: 'rank',
        }
    }

    loadFilters = () => {
        const { countryOptions: oldList } = this.state;
        const { filterData } = this.props;
        // build up state from props;
        if (filterData) {
            const { countryList, usDollarValue, euroValue, australianDollarValue } = filterData;
            const countryOptions = [{
                val: 'all',
                text: 'Show All'
            }].concat(countryList.map(c => ({
                val: c,
                text: c
            })));
            const currencyOptions = [
                {
                    val: 1,
                    text: 'US Dollar'
                },
                {
                    val: euroValue,
                    text: 'Euro'
                },
                {
                    val: australianDollarValue,
                    text: 'Australian Dollar'
                },
            ];
            this.setState({
                ready: true,
                countryOptions: countryOptions,
                selectedCountry: 'all',
                currencyOptions,
                selectedCurrency: 1,
            })
        }
    }

    componentWillMount() {
        this.loadFilters();
    }
    componentWillReceiveProps() {
        this.loadFilters();
    }
    onSelectionChanged = name => value => {
        const stateNew = { ...this.state }; // make sure you don't mutate state directly;
        stateNew[name] = value;
        this.setState(stateNew);
        const { onFilterChanged } = this.props;
        onFilterChanged({
            name,
            value,
        })
    }
    onSearchTextChanged = value => {
        this.setState({
            searchText: value,
        })
        const { onFilterChanged } = this.props;
        onFilterChanged({
            name:'searchText',
            value,
        })
    }
    render() {
        const { ready, countryOptions, selectedCountry,
            searchText,
            currencyOptions, selectedCurrency,
            orderByOptions, selectedOrderBy } = this.state;
        if (!ready) {
            return null;
        }
        return <div className="filters">
            <div className="filter-row">
                <FilterItem labelText="Birthplace"
                    className="filter-item"
                    selectedValue={selectedCountry}
                    options={countryOptions}
                    onSelectionChanged={this.onSelectionChanged('selectedCountry')} />
                <FilterItem labelText="Currency Converter"
                    className="filter-item"
                    selectedValue={selectedCurrency}
                    options={currencyOptions}
                    onSelectionChanged={this.onSelectionChanged('selectedCurrency')} />
            </div>
            <div className="filter-row">
                <FilterItem type="text" labelText="Search:" className="filter-item"
                    value={searchText}
                    onValueChanged={this.onSearchTextChanged} />
                <FilterItem labelText="Order By:"
                    className="filter-item"
                    selectedValue={selectedOrderBy}
                    options={orderByOptions}
                    onSelectionChanged={this.onSelectionChanged('selectedOrderBy')} />
            </div>

        </div>
    }
}


export default RichListFilters;