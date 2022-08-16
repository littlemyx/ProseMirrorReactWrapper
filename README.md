# Simple Text Editor

## Based on [prosemirror](https://prosemirror.net/)

## Options: 
- Hightlight text with **bold** and *italic* markup
- Autocomplete words by hitting the <kbd>Tab</kbd> key in the end of the word by the local dictionary (List of the words you can find [here](https://github.com/littlemyx/ProseMirrorReactWrapper/blob/master/src/lib/plugins/autocomplete/dataProvider.ts))
- Spellcheking of the input text every 5 seconds of idelness
- An ability to get the corrections for the errors by clicking the word with error holding the <kbd>Alt</kbd> key
## 📦 Getting Started

To get started simply clone the repo and run

```
npm install
npm run start
```

OR 


```
cd demo
npx serve .
```

## Known issues
- Having a word with dif**ferent** mark up will prosseded incorrectly as two separate words
