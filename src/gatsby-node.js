const mammoth = require("mammoth")
const getDocumentProperties = require('office-document-properties');


const convertToHtml = (path, options) => new Promise((res, rej) => {
  mammoth.convertToHtml({ path: path }, options)
    .then(result => res(result.value))
    .done()
})

const convertToMetadata = path => new Promise((res, rej) => {
  getDocumentProperties.fromFilePath(path, function (err, data) {
    res(data)
    if (err) {
      rej(err)
    }
  })
})

async function onCreateNode({
  node,
  actions,
  createNodeId,
  createContentDigest,
},
  pluginOptions) {
  const { createNode, createParentChildLink } = actions

  if (node.extension !== `docx`) {
    return
  }

  let parsedContent = await convertToHtml(node.absolutePath, pluginOptions ? pluginOptions : {})
  let parsedMetadata = await convertToMetadata(node.absolutePath)

  const docxNode = {
    id: createNodeId(`${node.id} >>> ${node.extension}`),
    children: [],
    parent: node.id,
    name: node.name,
    internal: {
      type: `docx`,
    },
  }

  docxNode.content = parsedContent
  docxNode.metadata = parsedMetadata
  docxNode.internal.contentDigest = createContentDigest(docxNode)

  createNode(docxNode)
  createParentChildLink({ parent: node, child: docxNode })
}

exports.onCreateNode = onCreateNode