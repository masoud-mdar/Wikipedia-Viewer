import React, {useState, useEffect} from "react"
import axios from "axios"


const App = () => {
    const [lang, setLang] = useState("en")

    const langsArr = ["en", "fr", "de", "fa", "es", "oc", "ar"]

    const handleClick = (Event) => {
        const {name, innerHTML} = Event.target

        if (name === "lang-select") {
            setLang(innerHTML)
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
        </div>
    )
}

export default App