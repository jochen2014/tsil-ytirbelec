import React from 'react';

const RichListFilters = ({pageData}) => {
    if (!pageData) {
        return null;
    }


    const {pageTitleH1, pageTitleH2, referenceLink, description} = pageData;
    return <div className="filters">
        <h1>{pageTitleH1}</h1>
        <h2>{pageTitleH2}</h2>
        <span>{description}</span>
        <a href={referenceLink}>Reference:{referenceLink}</a>
    </div>
}

export default RichListFilters;