import MessageHub from '@evecalm/message-hub'

const frameWin = (document.getElementById('frame') as HTMLFrameElement).contentWindow

const messageHub = MessageHub.createDedicatedMessageHub(frameWin)
const $ = (id: string) => {
  return document.getElementById(id.replace(/^\#/, ''))
}

MessageHub.on(frameWin, 'page-title', (arg) => {
  return document.title + ( arg ? ', echo  --- ' + arg : '')
})
// listen message from frameWin
messageHub.on({
  testError (...args) {
    console.log('arguments from testError', args)
    throw new TypeError('testError not implemented')
  },
  'tik-tok': msg => {
    $('tik-tok').innerHTML = msg
  }
})


$('#button-1').addEventListener('click', () => {
  messageHub.emit('hi', $('#input-1').value).then((res) => {
    console.log('response from hi', res)
  })
})

$('#button-2').addEventListener('click', () => {
  messageHub.emit('getHead',).then((res) => {
    $('#result-2').innerText = res
  })
})

$('#button-3').addEventListener('click', () => {
  messageHub.emit('not-existing-method',).then((res) => {
    $('#result-3').innerHTML = 'success: ' + res
  }).catch(err => {
    $('#result-3').innerHTML = 'failed: ' + String(err)
  })
})

