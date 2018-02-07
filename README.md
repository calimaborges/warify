# warify

Create war for single page applications for Java EE 6 compliant servers.

## Installation

### yarn

```
yarn add warify --dev
```

### npm

```
npm install warify --save-dev
```

## Usage

### JavaScript

```javascript
const warify = require("warify");
warify(inputPath, outputPath, size => {
  const warPath = path;
});
// example: const warPath = warify("./", "./my-war.war, (size) => {
//    console.log(size + " bytes file");
// });

console.log(warPath);
```

### CLI

```shell
warify <inputPath> <generated-war-name>
# outputs: war path
```

## Building

### Requirements

* Node.js
* Docker

### Build

```bash
yarn
yarn dockerbuild

yarn build # to use maven instead of docker
```
