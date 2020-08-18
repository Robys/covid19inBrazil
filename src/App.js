import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Button,
  Divider,
  Box,
  MenuItem,
  Paper,
  Typography,
  InputLabel,
  Toolbar,
  AppBar,
  Select,
  FormControl } from '@material-ui/core';


import './style.css'


function App() {
  const [query,setQuery] = useState();
  const [allBrazil,setAllBrazil] = useState()
  const [results,setResults] = useState();

  const [states] = useState([
    {label:"Acre", value:"AC"},
    {label:"Alagoas", value:"AL"},
    {label:"Amapá", value:"AP"},
    {label:"Amazonas", value:"AM"},
    {label:"Bahia", value:"BA"},
    {label:"Ceará", value:"CE"},
    {label:"Distrito Federal", value:"DF"},
    {label:"Espirito Santo", value:"ES"},
    {label:"Goiás", value:"GO"},
    {label:"Maranhão", value:"MA"},
    {label:"Mato Grosso", value:"MT"},
    {label:"Mato Grosso do Sul", value:"MS"},
    {label:"Minas Gerais", value:"MG"},
    {label:"Pará", value:"PA"},
    {label:"Paraíba", value:"PB"},
    {label:"Paraná", value:"PR"},
    {label:"Pernambuco", value:"PE"},
    {label:"Piauí", value:"PI"},
    {label:"Rio de Janeiro", value:"RJ"},
    {label:"Rio Grande do Norte", value:"RN"},
    {label:"Rio Grande do Sul", value:"RS"},
    {label:"Rondônia", value:"RO"},
    {label:"Roraima", value:"RR"},
    {label:"Santa Catarina", value:"SC"},
    {label:"São Paulo", value:"SP"},
    {label:"Sergipe", value:"SE"},
    {label:"Tocantins", value:"TO"},


])

useEffect(()=>{
  async function GetBrazil(){
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil')
    .then(res=>
       {setAllBrazil(Object.values(res.data))})
  }

  GetBrazil()

},[])

  const SendQuery = async(query)=>{
    if(query!==undefined){
      const URL = `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${query.toLowerCase()}`
   await axios.get(URL).then(res=>
    {setResults(res.data)})
    }
  }

  return (
    <div className="App">
      <AppBar position='static'>
      <Toolbar variant="dense">
        <Typography >Covid19 no Brasil</Typography>
        </Toolbar>
      </AppBar>

      {allBrazil!==undefined?
      
      <Paper className="brazil-paper">
       <h1>Brasil</h1>
       <Divider variant="middle"/>
       <h3>Casos: </h3>
        <p>{allBrazil[0].cases}</p>
        <Divider variant="middle"/>
        <h3>Confirmados: </h3>
        <p>{allBrazil[0].confirmed}</p>
        <Divider  variant="middle"/>
        <h3>Mortes: </h3>
        <p>{allBrazil[0].deaths}</p>
        <Divider variant="middle" />
        <h3>Recuperados: </h3>
        <p>{allBrazil[0].recovered}</p>

        </Paper>: ""}

          <Paper className="region-paper">
          <h1>Pesquise sua região</h1>

          <div className="selection-area">
          <FormControl>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select onChange={e=>setQuery(e.target.value)}>
          {states.map(state => <MenuItem  key={state.label} value={state.value}>{state.label}</MenuItem>)}
          </Select>
          </FormControl>

          <Button variant="contained" 
          color="primary" onClick={e=>SendQuery(query)}>Procurar</Button>
          </div>

      {results===undefined?<p>nenhum resultado a mostrar...</p>:
      <div>
       <h1>{results.state} | {results.uf}</h1>
       <Divider variant="middle"/>
       <h3>Casos: </h3>
        <p>{results.cases}</p>
        <Divider variant="middle"/>
        <h3>Mortes: </h3>
        <p>{results.deaths}</p>
        <Divider variant="middle" />
        <h3>Suspeitos: </h3>
        <p>{results.suspects}</p>

        </div>

       }
    </Paper>


      <Box className="footer">
      <p>API : <a href="https://covid19-brazil-api.now.sh/"> </a> Covid19 Brazil API</p>
        <div className="obs">
       <p>*Por conta de diretrizes do Governo Brasileiro sobre divulgação das informações</p>
       <p>infelizmente os dados para consulta estão desatualizados :( </p>
        </div>
       <p>Feito por Robert Oliveira</p>
      </Box>

    </div>
  );
}

export default App;
