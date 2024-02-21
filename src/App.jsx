import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CompleCountry from './components/CompleteCountry'
import SearchingCountries from './components/SearchingCountries'


const App = () => {
  const [countries, setCountries] = useState({})
  const [country, setCountry] = useState('')
  const [name, setName] = useState('')
  const [capital, setCapital] = useState('')
  const [area, setArea] = useState('')
  const [languages, setLanguages] = useState([])
  const [flag, setFlag] = useState('')
  const [showCountry, setShowCountry] = useState(false)

  useEffect(() => {
    console.log('Cargando lista de todos los paises...')

    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(Object.values(response.data.map(con => con.name).map(con => con.common)))
      })
  }, [])

  useEffect(() => {
    console.log('corriendo effect, la búsqueda del pais es:', country)
    //setCompleteCountry('fetching data...')
    if (Object.keys(someCountries).length === 1) {
      console.log('fetching datos completos del país...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${Object.values(someCountries)[0]}`)
        .then(response => {
          setShowCountry(true)
          setName(response.data.name.common)
          setCapital(response.data.capital)
          setArea(response.data.area)
          setLanguages(Object.values(response.data.languages))
          setFlag(response.data.flags.png)
        })
    } else {
      setShowCountry(false)
    }
  }, [country])



  const handleChange = (event) => {
    event.preventDefault()

    setCountry(event.target.value)

  }

  const someCountries = (country !== '')
    ? countries.filter(coun => coun.toLowerCase().includes(country.toLocaleLowerCase()))
    : {}

  const filterCountries = (country === '')
    ? ["Por favor, buscar un país"]
    : (Object.keys(someCountries).length > 10)
      ? ["Muchos resultados..."]
      : someCountries



  return (
    <div>
      <h1>Buscador de Datos de País</h1>
      <form>
        Encontrar países (inglés): <input value={country} onChange={handleChange} />
      </form>
      <pre>
        {
          !showCountry &&
          <dl>
            {filterCountries.map(coun => <SearchingCountries key={coun} nameCountry={coun}/>)}
          </dl>
        }
        {
          showCountry &&
          <CompleCountry
            name={name}
            capital={capital}
            area={area}
            languages={languages}
            flag={flag}
          />
        }

      </pre>
    </div>
  )
}

export default App