import { LitElement, customElement } from 'lit-element/lit-element'
import { person, sayHello } from './lib'

async function getPosts(){
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const data = await response.json()
  return data
}

// getPosts().then(posts => console.log(posts))

class BlahView extends LitElement {
  
}

customElement.define('blah-view', BlahView)