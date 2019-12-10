const proxyUrl = 'https://salty-refuge-50932.herokuapp.com/'
const url = 'https://air-dnd-api.herokuapp.com'

const fetchTables = () => {
  return fetch(proxyUrl + `${url}/tables/`)
    .then((response) => response.json())
}

const fetchPlayers = () => {
  return fetch(proxyUrl + `${url}/players/`)
    .then((response) => {
      if(response.ok){
        return response.json()}
      else{
        return []
      }})
}

const fetchTableByID = (TableId) => {
  return fetch(proxyUrl + `${url}${TableId}`)
  .then(res => res.json())
  .then(data => data)
  .catch(err => {
    return err
  })
}

const fetchPlayerByID = (PlayerId) => {
  return fetch(proxyUrl + `${url}/players/${PlayerId}/`)
  .then(res => res.json())
  .then(data => data)
  .catch(err => {
    return err
  })
}

const updatePlayer = (PlayerID, data) => {
  return fetch(proxyUrl + `${url}/players/${PlayerID}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res;
}).catch(err => err);
}

const updateTable = (tableID, data) => {
  return fetch(proxyUrl + `${url}/tables/${tableID}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res;
}).catch(err => err);
}

const addTable = (tableObject) => {
  console.group(tableObject)
    return fetch(proxyUrl + `${url}/tables/`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(tableObject)
    })
  }

const addPlayer = (playerObject) => {
    return fetch(proxyUrl + `${url}/players/`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(playerObject)
    })   
  }

const deleteTable = (table) => {
  return fetch(proxyUrl + `${url}/tables/${table}/`, {
    method: 'delete'
  })
}


export default {
  fetchTables,
  fetchPlayers,
  fetchTableByID,
  fetchPlayerByID,
  addTable,
  addPlayer,
  deleteTable,
  updatePlayer,
  updateTable,
}