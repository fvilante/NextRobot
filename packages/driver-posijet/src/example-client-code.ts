import { DataLinkUtility } from './api'


// =====================
//  Example of Api use
// =====================

// todo: put bellow and aboce code in documentation

// converte pra bytes
const bytes = DataLinkUtility.MakeCmppStream({direction:'SOLICITACAO', command: 10, channel: 2, data: 12})
const bytes_comErro = [1,2,3,3,27,4,3,27,1342]

// le de bytes
const interpretado = DataLinkUtility.ReadCmppStream(bytes)
const interpretado_comErro = DataLinkUtility.ReadCmppStream(bytes_comErro)


// output

console.log(bytes)
console.table(interpretado)
console.table(interpretado_comErro)
