import io from 'socket.io-client';
import EventEmitter from 'eventemitter3';

function socket () {
  const history = []
  const api = new EventEmitter()
  const socket = io('https://blockexplorer.com')
  socket.on('connect', () => {
    socket.emit('subscribe', 'inv')
  })
  socket.on('tx', data => {
    const tx = { time: Date.now(), value: data.valueOut, id: data.txid };
    api.emit('tx', tx)
    history.push(tx)
  })

  api.destroy = function () {
    socket.close()
    socket.destroy()
  }

  api.data = function () {
    return history.map(d => d);
  }

  return api;
}

export default socket()
