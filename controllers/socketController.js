//todo:the client sends its infor{email} to the socket server
//todo:the socket server checks if its a valid user
//todo:
//todo:
//todo:
//todo:
//todo:
//todo:

const socketId = require('../Models/socketId');

//*importing socketIo from app.js
const io = require('../app').io;

exports.socketController = () => {
    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        socket.on("disconnect", (data) => {
            console.log(`Socket disconnected: ${socket.id} + ${data}`);
        })

            socket.on("handshake", async(hndshkdata) => {
                 try {
                     const socketUpdateed = await socketId.findOneAndUpdate({emailId: hndshkdata}, {socketId: socket.id}, {upsert: true, new: true}
                     );
                     console.log(socketUpdateed.socketId);
                 } catch (error) {
                    console.log(error);   
                 }
            })   


            socket.on("chatmsg", async(datafromclient)=>{
                try {
                    var Receiver = await socketId.findOne({
                        emailId: datafromclient.receiver
                    });
                    var socketIdOfReceiver = Receiver.socketId;
                    const dataToReciever = {
                        messsage : datafromclient.messsage,
                        sender : datafromclient.sender,
                        receiver : datafromclient.receiver,
                        time : datafromclient.time
                    };
                    socket.to(socketIdOfReceiver).emit("chatmsg",{data: dataToReciever});
                    console.log(`${dataToReciever.sender} (socketID: ${socket.id}) sent a message to ${dataToReciever.receiver}(socketId: ${socketIdOfReceiver})`);
                } catch (error) {
                    console.log(error);
                }
            })     

    })
}