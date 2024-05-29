
export function RenderRichText(document){
    const nodes = document.content
    console.log('This document has ' + nodes.length + ' elements !')
    console.log(nodes)
    return `
    <div v-for="${node} in ${nodes}">{{node}}</div>
    `
}

function RenderHeading(nodeType){

}