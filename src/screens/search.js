import { useState, useEffect } from 'react'
import { API } from '../../config'
import axios from 'axios'
import ProdCardB from '../components/productCardB'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'

const Search = ({ route }) => {

  const [result, setResult] = useState(null)
  const [message, setMessage] = useState(null)
  const product = route.params.search

  useEffect(() => {
    searchProds(product)
  }, [product])

  const searchProds = (product) => {
    setResult(null)
    setMessage(null)
    axios
      .get(`${API}/search/${product}`)
      .then(res => {
        // console.log(res.data)
        if (res.data.length > 0) {
          setResult(res.data)
          // console.log(res.data)
        } else {
          setResult(null)
          setMessage("No products found")
        }
      })
      .catch(error => {
        setResult(null)
        // console.log(error)
      })
  }

  return (
    <ScrollView>
      {
        result ?
          result.map(prod => {
            return (
              <View style={{
                padding: 4,
              }} key={prod._id}>
                <ProdCardB
                  id={prod._id}
                  name={prod.name}
                  currency={prod.currency}
                  price={prod.price}
                />
              </View>
            )
          })
          :
          message ?
            <Text style={{
              fontSize:28,
              color:"#ea0000",
              fontWeight:600,
              textAlign:"center",
            }}>{message}</Text>
            :
            <ActivityIndicator size="large" />
      }
    </ScrollView>
  )
}

export default Search;