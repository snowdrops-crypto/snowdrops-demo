const Arweave = require('arweave')

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
})

(async () => {
  let transaction = await arweave.createTransaction({ data: data }, keys)
  transaction.addTag('Content-Type', 'png')
  await arweave.transactions.sign(transaction, keys)

  let uploader = await arweave.transactions.getUploader(transaction)
  console.log(uploader)

  while (!uploader.isComplete) {
    await uploader.uploadChuck()
    console.log(`chunkUploaded: ${uploader.uploadedChunks}/${uploader.totalChunks} %${uploader.pctComplete}`)
    console.log(` lastResponseStats: ${uploader.lastResponseStatus}`)
  }
})