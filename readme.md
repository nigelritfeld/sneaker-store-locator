# Sneaker store locator

De sneaker store locator is mobile app, waarbij echte sneaker heads, de beste sneaker stores in rotterdam kunnen vinden.
Daarnaast zijn of haar favorite webshops bijhouden en updates kan krijgen over de laatste sneakers en sneaker-events


### Userstories
- [x] 1 **Een gebruiker van de app kan bij elke hotspot informatie opslaan op het device zodat deze
na een herstart nog steeds beschikbaar is, zelfs zonder internet.**
  - Er is een werkende sqlite database
  - Hotspot ID, naam, en coordinated zijn lokaal opgeslagen in sqlite database
  - Data blijft beschikbaar na restarten van de app
 
- [ ] 2 **Als gebruiker moet je kunnen kiezen voor light of dark modes**
  - Toggle button op de settings pagina.
  - De instellingen moeten opgeslagen zijn in asyncstore of sqlite.


- [ ] 3 **Als gebruiker moet je een lijst kunnen maken met websites favorite sneaker webshops**
  - Links van de website's moeten link preview data kunnen zien.


- [ ] 4 **Als gebruiker wil ik een lijst van op komende sneaker events, zodat ik altijd op de hoogte ben van de nieuwste collabs.**
  - Per event is er een checkbox om in te plannen of je het event gaat bijwonen
  - Lijst is beveiligd met face of touch id


- [ ] 5 **Als gebruiker wil ik de hotspots als lijst, maar ook op de kaart kunnen zien.**
  - De hotspots moeten zowel op de kaart als in een lijstweergave op te vragen zijn.

- [ ] 6 **Eigen toevoeging is dat de gebruiker kan aangeven of die een event gaat bijwonen en dat direct in agenda word opgeslagen.**

# Tentamen vragen

## Wat is destruction?
Een methode om objecten uit een array te halen en als variable te gebruiken. 
Je gebruikt het wanneer je bijvoorbeeld maar 2 items uit een object wilt halenb

```js
/**
 * Object destruction
 * @type {{name: string, lastname: string}}
 */
let object = {
    name: 'Je',
    lastname: 'Moeder',
}
const {voornaam, achternaam} = object
console.log(voornaam) // Eerste index
console.log(achternaam) // Tweede index

/**
 * Array destruction
 * @type {number[]}
 */
let array = [1, 2, 3]
const [een, ...rest] = array
console.log(een) // 1
console.log(rest) // [2,3]

```

## Waarom geeft een fetch een promise terug?

Fetch is een asynchronous function en dat betekent dat die nog wachten. 

```js
new Promise((resolve, reject)=>{
    try{
        //todo: Important stuff
      resolve(response)
    }catch (e) {
      reject(e.message)
    }
    
})
```

## Wat is de syntax van een useState( )?
```js
import useState from 'react';
const [count, setCount] = useState(0);
```

## Leg het principe uit van React Navigation?

React Navigation is een module die je kan gebruiken om een navigation te maken.
In een navigation container heb je een stack navigator. Binnen de stack navigator heb je een screen.
Een screen heeft een component die gerenderd word.

## Noem twee verschillen tussen en ScrollView en een Flat list

Een scroll view gebruik je wanneer je een scrollende container hebben.
Een flat list is wanneer je een lijst wilt hebben van elementen met dezelfde type.
Flat list rendered niet alles, pas wanneer je scrollt.
