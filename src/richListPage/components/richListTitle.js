import React from 'react';

const RichListTitle = ({titleData}) => {
    if (!titleData) {
        return null;
    }


    const {pageTitleH1, pageTitleH2, referenceLink, description} = titleData;
    return <div className="title">
        <div>
            <h1>{pageTitleH1}</h1>
        </div>
        <div>
            <h2>{pageTitleH2}</h2>
        </div>
        <div>
            <span>{description}</span>
        </div>
        <div>
            <span>Reference: </span><a href={referenceLink}>{referenceLink}</a>
        </div>
    </div>
}

export default RichListTitle;