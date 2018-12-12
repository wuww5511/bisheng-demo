const util = require('util')
const glob = util.promisify(require('glob'))
const path = require('path')
const write = require('write')
const fs = require('fs')
const babel = require('babel-core')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const rimraf = require('rimraf')

const readFile = util.promisify(fs.readFile)

const translators = [
    {
        test: /\.jsx?/,
        async translate (content) {
            return babel.transform(content, {
                plugins: [
                    "transform-runtime"
                ],
                presets: [
                    ["env", {"modules": false}],
                    "stage-2", 
                    "react"
                ]
            }).code
        }
    },
    {
        test: /\.css/,
        async translate (content) {
            return postcss([
                autoprefixer
            ]).process(content, {from: undefined}).then(result => {
                result.warnings().forEach(function (warn) {
                    console.warn(warn.toString());
                })

                return result.css
            })
            
        }
    }
]

async function main (src, dist) {
    rimraf.sync(dist)
    let files = await glob('**', { cwd: src })
    files.forEach(async file => {
        let srcPath = path.resolve(src, file)
        let distPath = path.resolve(dist, file)

        if (!fs.statSync(srcPath).isFile()) {
            return
        }

        let content = await readFile(srcPath)
                
        for (let translator of translators) {
            if (translator.test.test(srcPath)) {
                content = await translator.translate(
                    content
                )
            }
        }
        await write.promise(distPath, content)

    })
}


main(
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, '../lib')
)