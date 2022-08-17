# Simple Text Editor

## Based on [prosemirror](https://prosemirror.net/)

## Options: 
- Hightlight text with **bold** and *italic* markup
- Autocomplete words by hitting the <kbd>Tab</kbd> key in the end of the word by the local dictionary
- Spellcheking of the input text every 5 seconds of idelness
- An ability to get the corrections for the errors by clicking the word with error holding the <kbd>Alt</kbd> key
- Plugin works with witn an english words (without hyphens) which are presented in lists: [autocomplete](https://github.com/littlemyx/ProseMirrorReactWrapper/blob/master/src/lib/plugins/autocomplete/dataProvider.ts), [spellchecker](https://github.com/littlemyx/ProseMirrorReactWrapper/blob/master/src/lib/plugins/spellchecker/dataProvider.ts)
## 📦 Getting Started

### To get started simply clone the repo and run

```
npm install
npm run start
```

OR 


```
cd demo
npx serve .
```

### To rebuild static version run 
```
npm run build:demo
```

## Tests

To run unit-tests hit in the projecs directory this commands
```
npm install
npm run test
```

For e2e tests you ned to have a [running local stage](getting-started) and run this

```
npx playwright test
```


## Known issues
- Having a word with dif**ferent** markup will prosseded incorrectly as two separate words
