import React from 'react';
import renderer from 'react-test-renderer';
import RichList from './richList';

describe('RichList Test', ()=>{
    it('should render correctly' ,()=>{
        const data = [
            {
                rank:1,
                name:'bo chen',
                country:'Australia',
                netWorth:210000000
            },
            {
                rank:1,
                name:'test',
                country:'United State',
                netWorth:200000000
            }
        ];
        const tree = renderer.create(<RichList richList={data} currencyCode='usd' />);
        expect(tree.toJSON()).toMatchSnapshot();
    })
})