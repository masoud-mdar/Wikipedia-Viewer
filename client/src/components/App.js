import React, {useState, useEffect} from "react"
import axios from "axios"

import BASE_URL from "../constants"
import Result from "./Results"
import Search from "./Search"
import Lang from "./Lang"

const App = () => {

    const [lang, setLang] = useState("en")
    const [searchInput, setSearchInput] = useState("")
    const [results, setResults] = useState([])
    
    const [isSearchActive, setIsSearchActive] = useState(false)

    const [displayResult, setDisplayResult] = useState("none")
    const [displayLine, setDisplayLine] = useState("block")
    const [displayParag, setDisplayParag] = useState("block")


    const langsArr = ["en", "fr", "oc", "fa", "es", "de", "ar"]

    const activeSearchStyle = {width: "17vw", height: "5vh", borderRadius: "25px"}
    const marginStyle = {marginTop: 30+"vh"}
    const langColor = {color: "#ffffff"}

    useEffect(()=> {
        document.addEventListener("keydown", handleKeyPress)

        return () => {document.removeEventListener("keydown", handleKeyPress)}

    })

    const handleKeyPress = (Event) => {

        if (isSearchActive && searchInput && Event.keyCode === 13) {

            setDisplayResult("block")
            setDisplayParag("none")
            setResults([])

            let sendingData = [
                lang,
                {
                    action: "query",
                    list: "search",
                    srsearch: searchInput,
                    srwhat: "text",
                    srlimit: "15",
                    srprop: "snippet",
                    format: "json"
                }
            ]

            axios.post(`${BASE_URL}/api/list`, sendingData).then(response => {
                const {data} = response

                setResults(data.query.search)
            })
        }
    }

    const handleChange = (Event) => {
        const {name, value} = Event.target

        if (name === "search") {
            setSearchInput(value)
        }
    }

    const handleClick = (Event) => {
        let {name, innerHTML} = Event.target

        if (name === "lang-select") {
            setLang(innerHTML)
        } else if (name === "search") {
            setIsSearchActive(true)
            setDisplayLine("none")
        } else if (name === "close") {
            setIsSearchActive(false)
            setDisplayLine("block")
            setSearchInput("")
            setResults([])
            setDisplayResult("none")
            setDisplayParag("block")
        }
    }

    return (

        <div className="container">

            <div className="main-part" style={displayResult==="block" ? marginStyle : {}}>

                <Lang
                    data={{
                        langsArr: langsArr,
                        lang: lang,
                        langColor: langColor,
                        handleClick: handleClick
                    }}
                />

                <Search
                    data={{
                        lang: lang,
                        searchInput: searchInput,
                        isSearchActive: isSearchActive,
                        activeSearchStyle: activeSearchStyle,
                        displayLine: displayLine,
                        displayParag: displayParag,
                        handleChange: handleChange,
                        handleClick: handleClick,

                    }}
                />

                <Result
                    data={{
                        displayResult: displayResult,
                        results: results,
                        lang: lang
                    }}
                />

            </div>

        </div>
    )
}

export default App