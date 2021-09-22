# CJSON
Generate c++ code from json file.

## Setup
- Clone this repo (not a npm package yet).
- Run `npm i`.

## Usage
- Assuming all your `json` files are in `~/json`.
- Run `node build "~/json/*.json"`.
- Outputs are now in `~/json`.

## Developmen
- Run `npm run re:watch` to watch change to Rescript code.
- Run `npm run cjson:run` anytime you want to run the tool with `test` folder.
- Run `npm re:build` to build to `build/index.js`