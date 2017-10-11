import moment from 'moment';

export default function ParseResponse(response) {
    const {celebrityList: richList, ...pageData} = response;
    const {pageTitleH1, pageTitleH2, description, referenceLink, ...filterData} = pageData;
    return {
        titleData: {
            pageTitleH1,
            pageTitleH2,
            description,
            referenceLink
        },
        filterData,
        richList,
    }
}