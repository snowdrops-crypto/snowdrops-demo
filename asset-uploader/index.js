/* npx arlocal */

const fs = require('fs')
const path = require('path')
const Arweave = require('arweave')

// const arweave = Arweave.init({
//   host: 'arweave.net',
//   port: 443,
//   protocol: 'https'
// })

const arweave = Arweave.init({
  host: '127.0.0.1',
  port: 1984,
  protocol: 'http'
})

const run = async () => {
  const key = await arweave.wallets.generate().then(key => {
    return key
  })

  const img = await fs.readFileSync(path.join(__dirname, '../assets/snowdrops-logo-1.png'))
  console.log(img)
  let transaction = await arweave.createTransaction({ data: img }, key)
  transaction.addTag('Content-Type', 'png')
  await arweave.transactions.sign(transaction, key)

  let uploader = await arweave.transactions.getUploader(transaction)

  while (!uploader.isComplete) {
    await uploader.uploadChunk()
    console.log(`chunkUploaded: ${uploader.uploadedChunks}/${uploader.totalChunks} %${uploader.pctComplete}`)
    console.log(`lastResponseStats: ${uploader.lastResponseStatus}`)
  }

  console.log(uploader.transaction.id)

  const img_get = arweave.transactions.get(uploader.transaction.id).then(tnx => {
    console.log(tnx)
  })
}

run()