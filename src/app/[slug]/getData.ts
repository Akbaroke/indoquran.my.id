import axios from 'axios'

export default async function getData(param: string) {
  const { data } = await axios.get(`${process.env.API_URL}/surat/${param}`)
  return data.data
}
