#!/usr/bin/env node

const files = {
    './wwwroot/data/model-list.json': 'https://raw.githubusercontent.com/Comfy-Org/ComfyUI-Manager/refs/heads/main/model-list.json'
}

import path from 'path'
import fs from 'fs'
// import {pipeline} from 'stream'
// import {promisify} from 'util'
// import {execSync} from 'child_process'
// const pipe = promisify(pipeline)

async function fetchDownload(url, toFile, retries) {
    const toDir = path.dirname(toFile)
    fs.mkdirSync(toDir, {recursive: true})
    for (let i = retries; i >= 0; --i) {
        try {
            let r = await fetch(url)
            if (!r.ok) {
                throw new Error(`${r.status} ${r.statusText}`);
            }
            let txt = await r.text()
            console.log(`writing ${url} to ${toFile}`)
            await fs.writeFileSync(toFile, txt)
            return
        } catch (e) {
            console.log(`get ${url} failed: ${e}${i > 0 ? `, ${i} retries remaining...` : ''}`)
        }
    }
}

const requests = []
Object.keys(files).forEach(path => {
    let url = files[path]
    requests.push(fetchDownload(url, path, 5))
})

await Promise.all(requests)

const modelListJson = fs.readFileSync('./wwwroot/data/model-list.json', 'utf8')
const modelList = JSON.parse(modelListJson)
const models = modelList.models
const uniqueModels = []

// Check and report duplicate URLs:

const urls = new Set()
const duplicates = new Set()
models.forEach(model => {
    if (urls.has(model.url)) {
        duplicates.add(model.url)
    } else {
        urls.add(model.url)
        uniqueModels.push(model)
    }
})
if (duplicates.size > 0) {
    console.log('Duplicate URLs found:')
    console.log(Array.from(duplicates))
}

const json = JSON.stringify(uniqueModels, null, 2)
await fs.writeFileSync('./wwwroot/data/assets.json', json)
