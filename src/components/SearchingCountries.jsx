const SearchingCountries = (props) => {
    return (
        <>
            <dt>
                {props.nameCountry}
                <button onClick={props.selectCountry}>mostrar</button>
            </dt>

        </>
    )

}
export default SearchingCountries
