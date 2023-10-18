import io from 'socket.io-client';

const sockets = io('https://test-peer-backfv.onrender.com/', { autoConnect: true, forceNew: true });

export default sockets;
