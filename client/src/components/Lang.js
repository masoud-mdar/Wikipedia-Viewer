import React from "react"

const Lang = (props) => {

    return (
        <div className="lang-list">
            <ul>
                {
                    props.data.langsArr.map(item => {
                        return <li key={item}><button name="lang-select" onClick={props.data.handleClick} className="lang-btn" style={item===props.data.lang ? props.data.langColor : {}}>{item}</button></li>
                    })
                }
            </ul>
        </div>
    )
}

export default Lang