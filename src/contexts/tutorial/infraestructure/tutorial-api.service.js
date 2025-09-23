import axios from 'axios'

export class TutorialApiService {
  async GetAll() {
    const response = await axios.get('http://localhost:3000/tutorials')

    return response //array
  }
  async GetById(id) {
    const response = await axios.get('http://localhost:3000/tutorials/' + id)

    return response
  } //objeto
}

//PascalCase
//camelCase
//keebab-case

//async func1() 30 min
//func2()
