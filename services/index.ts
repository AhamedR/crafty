import Craft from "@/models/Craft"
import axios from "axios"

interface ICredentials {
  email: string
  password: string
}

interface ILoginResponse {
  id: string
  token: string
  name: string
  email: string
}

class Services {
  http = axios.create({
    baseURL: process.env.apiUrl
  })

  async getCrafts() {
    try {
      const response = await this.http.get<Craft[]>('/api/craft')

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async login(credentials: ICredentials) {
    try {
      const response = await this.http.post<ILoginResponse>('/login', credentials)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}

const service = new Services()
export default service
