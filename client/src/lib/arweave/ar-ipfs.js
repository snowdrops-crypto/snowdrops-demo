'use strict'

import axios from 'axios'
import * as IPFS from 'ipfs-core'

const base_uri = 'https://ipfsarweave.now.sh/permapin/'

const postItemToIPFS = async (data) => {
  const ipfs = await IPFS.create()
  const { cid } = await ipfs.add()
  console.log(cid)
  return cid
}

const getFromArweave = async (ipfs_hash) => {
  const response = await axios.get(`${base_uri}${ipfs_hash}`)
  return response.body
}

const postToArweave = async (ipfs_hash) => {
  const response = await axios.post(`${base_uri}${ipfs_hash}`)
  return response.body
}

const postToIPFSArweave = async (data) => {
  const cid = await postItemToIPFS(data)
  await postToArweave(cid)
}

export {
  postItemToIPFS,
  getFromArweave,
  postToArweave
}
