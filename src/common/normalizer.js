import _ from 'lodash';

export default function ParseResponse(response) {
    const {celebrityList: richList, ...pageData} = response;
    const countryList = _.uniq(richList.map(r=>r.country)); // build country list on the fly;
    const {pageTitleH1, pageTitleH2, description, referenceLink, ...filterOptionsData} = pageData;
    return {
        titleData: {
            pageTitleH1,
            pageTitleH2,
            description,
            referenceLink
        },
        filterOptionsData:{...filterOptionsData, countryList},
        richList,
    }
}