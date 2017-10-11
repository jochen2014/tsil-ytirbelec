import React, { Component } from 'react';
import { FilterItem } from '../../common';


class RichListFilters extends Component {


    constructor() {
        super();
        this.state = {
            optionsLoaded: false,
            countryOptions: [],
            currencyOptions: [],
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
        }
    }

    loadFilterOptionsData = newOptionsData => {
        const { countryList, usDollarValue, euroValue, australianDollarValue } = newOptionsData;
        const countryOptions = [{
            val: 'all',
            text: 'Show All'
        }].concat(countryList.map(c => ({
            val: c,
            text: c
        })));
        const currencyOptions = [
            {
                val: 'usd-1',
                text: 'US Dollar',
                name: 'usd',
            },
            {
                val: 'euro-' + euroValue, //euro rate could be the same as aud rate, theoretically;
                text: 'Euro',
            },
            {
                val: 'aud-' + australianDollarValue,
                text: 'Australian Dollar',
            },
        ];
        this.setState({
            optionsLoaded: true,
            countryOptions: countryOptions,
            currencyOptions,
        })

    }

    componentWillReceiveProps(nextProps) {
        const { filterOptionsData: oldOptionsData } = this.props;
        const { filterOptionsData: newOptionsData } = nextProps;
        if (oldOptionsData !== newOptionsData) {
            this.loadFilterOptionsData(newOptionsData);
        }
    }
    onSelectionChanged = name => value => {
        const { onFilterChanged } = this.props;
        onFilterChanged({
            name,
            value,
        })
    }
    onSearchTextChanged = value => {
        const { onFilterChanged } = this.props;
        onFilterChanged({
            name: 'searchText',
            value,
        })
    }
    render() {
        const { optionsLoaded, countryOptions, currencyOptions, orderByOptions } = this.state;
        const { selectedCountry, selectedCurrency,
            searchText, selectedOrderBy } = this.props;
        if (!optionsLoaded) {
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