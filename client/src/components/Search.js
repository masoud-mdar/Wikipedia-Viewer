import React from "react"

const Search = (props) => {

    return (
        <div className="search-part">

            <div className="random-wrapper">
                <a href={`https://${props.data.lang}.wikipedia.org/wiki/Special:Random`} target="_blank" rel="noreferrer">Click here for a random article</a>
            </div>

            <div className="search-wrapper">
                
                <div className="input-wrapper">

                    <input name="search" 
                    onChange={props.data.handleChange} onClick={props.data.handleClick} 
                    value={props.data.searchInput} placeholder=""
                    style={props.data.isSearchActive ? props.data.activeSearchStyle : {}}
                    ></input>

                    <div className="line" style={{display: props.data.displayLine}}></div>
                    <button name="close" onClick={props.data.handleClick} className="close-btn" style={props.data.isSearchActive ? {display: "block"}: {display: "none"}}>X</button>
                </div>

                <p style={{display: props.data.displayParag}}>Click icon to search</p>
            </div>
        </div>
    )
}

export default Search