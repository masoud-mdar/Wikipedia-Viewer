import React from "react"

const Result = (props) => {

    return (
        <div className="results-wrapper" style={{display: props.data.displayResult}}>
            <ul className="results-list">
                {
                    props.data.results.map(item => {
                        return (
                            <li key={item.pageid} className="list-item">

                                <a href={`https://${props.data.lang}.wikipedia.org/?curid=${item.pageid}`} target="_blank" rel="noreferrer">
                                    <div className="result-wrapper">
                                        <div className="result-title">
                                            <h3>{item.title}</h3>
                                        </div>
                                        <div className="result-text" dangerouslySetInnerHTML={{__html: item.snippet}}>
                                        </div>
                                    </div>
                                </a>

                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Result