const CompleteCountry = (props)  => {
    return (
        <>
            <h1>{props.name}</h1>
            <p>capital: {props.capital}</p>
            <p>area: {props.area} km²</p>
            <strong>Lenguajes:</strong>
            <ul>
                {
                    props.languages.map((lang) => (
                        <li key={lang}>{lang}</li>
                    ))
                }
            </ul>
            <img src={props.flag} alt={`Flag image from ${props.name}`} />
        </>
    )
}

export default CompleteCountry