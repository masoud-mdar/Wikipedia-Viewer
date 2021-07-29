import React, {useState, useEffect} from "react"
import axios from "axios"

import BASE_URL from "../constants"


const App = () => {

    const [lang, setLang] = useState("en")
    const [searchInput, setSearchInput] = useState("")


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

            let sendingData = {
                action: "opensearch",
                search: searchInput,
                limit: "5",
                namespace: "0",
                format: "json"
            }


            axios.post(`${BASE_URL}/api/list`, sendingData).then(response => {
                const {data} = response

                console.log(data)
            })
        }
    }

    console.log(lang)

    return (
        <div>

            <div className="lang-list">
                <ul>
                    {
                        langsArr.map(item => {
                            return <li key={item}><button name="lang-select" onClick={handleClick}>{item}</button></li>
                        })
                    }
                </ul>
            </div>

            <div className="random-wrapper">
                {/*<button name="random-btn" onClick={handleClick}>click here for a random article</button>*/}
                <a href={`https://${lang}.wikipedia.org/wiki/Special:Random`} target="_blank" rel="noreferrer">click here for a random article</a>
            </div>

            <div className="search-wrapper">
                <input name="search" onChange={handleChange} value={searchInput} placeholder=""></input>
                <button name="go" onClick={handleClick}>click here</button>
                <p>click icon to search</p>
            </div>
        </div>
    )
}

export default App