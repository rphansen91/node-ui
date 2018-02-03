const { Component } = require('../')
const fetch = require('isomorphic-fetch')
const Table = require('cli-table')
const chalk = require('chalk')

const peopleProperties = {
  name: 'Name',
  mass: 'Mass',
  height: 'Height',
  hair_color: 'Hair Color',
  skin_color: 'Skin Color',
  eye_color: 'Eye Color',
  birth_year: 'Birth Year',
  gender: 'Gender'
}

const peopleProps = Object.keys(peopleProperties)
const peopleHead = peopleProps.map(v => peopleProperties[v])

module.exports = class Time extends Component {
  constructor (props) {
    super(props)
    this.state = {
      people: []
    }
  }

  componentDidMount () {
    fetch('https://swapi.co/api/people')
    .then(res => res.json())
    .then(({ results: people }) => this.setState({ people }))
  }

  render () {
    const { people } = this.state
    const table = new Table({ head: peopleHead })
    people.map(p => peopleProps.map(h => p[h]))
    .forEach(p => table.push(p))

    return chalk`
{green Star Wars}
${table.toString()}`
  }
}
