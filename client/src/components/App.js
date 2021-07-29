import React, {useState, useEffect} from "react"
import axios from "axios"

import BASE_URL from "../constants"


const App = () => {

    const [lang, setLang] = useState("en")
    const [searchInput, setSearchInput] = useState("")
    const [results, setResults] = useState([])
    const [displayResult, setDisplayResult] = useState("none")
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [displayLine, setDisplayLine] = useState("block")


    const langsArr = ["en", "fr", "de", "fa", "es", "oc", "ar"]

    const handleChange = (Event) => {
        const {name, value} = Event.target

        if (name === "search") {
            setSearchInput(value)
        }

    }

    const handleClick = (Event) => {
        const {name, innerHTML} = Event.target

        if (name === "lang-select") {
            setLang(innerHTML)

        } else if (name === "go") {

            //const url = `https://${lang}.wikipedia.org/w/api.php`
            setDisplayResult("block")

            let sendingData = [
                lang,
                {
                    action: "query",
                    list: "search",
                    srsearch: searchInput,
                    srwhat: "text",
                    srlimit: "10",
                    srprop: "snippet",
                    format: "json"
                }
            ]


            axios.post(`${BASE_URL}/api/list`, sendingData).then(response => {
                const {data} = response

                console.log(data)
                //console.log(data.query.search)

                setResults(data.query.search)

            })
        } else if (name === "search") {
            setIsSearchActive(true)
            setDisplayLine("none")
        }
    }

    //console.log(lang)
    //console.log(results)

    return (
        <div className="container">

            <div className="main-part">
                <div className="lang-list">
                    <ul>
                        {
                            langsArr.map(item => {
                                return <li key={item}><button name="lang-select" onClick={handleClick}>{item}</button></li>
                            })
                        }
                    </ul>
                </div>
                <div className="search-part">
                    <div className="random-wrapper">
                        {/*<button name="random-btn" onClick={handleClick}>click here for a random article</button>*/}
                        <a href={`https://${lang}.wikipedia.org/wiki/Special:Random`} target="_blank" rel="noreferrer">Click here for a random article</a>
                    </div>

                    <div className="search-wrapper">
                        <div className="input-wrapper">
                            <input name="search" onChange={handleChange} onClick={handleClick} value={searchInput} placeholder=""></input>
                            <div className="line" style={{display: displayLine}}></div>
                            <button name="go" onClick={handleClick}>click here</button>
                        </div>
                        <p>Click icon to search</p>
                    </div>
                </div>

            


                <div className="results-wrapper" style={{display: displayResult}}>
                    <ul className="results-list">
                        {
                            results.map(item => {
                                return (
                                    <li key={item.pageid} className="list-item">

                                        <a href={`https://${lang}.wikipedia.org/?curid=${item.pageid}`} target="_blank" rel="noreferrer">
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
            </div>
        </div>
    )
}

export default App