var q = 'tasks';
 
var open = require('amqplib').connect('amqp://localhost');
 
// // Publisher
// open.then(function(conn) {
//   return conn.createChannel();
// }).then(function(ch) {
//   return ch.assertQueue(q).then(function(ok) {
//     return ch.sendToQueue(q, Buffer.from('something to do'));
//   });
// }).catch(console.warn);

// Publisher - my ver 1
// open
// .then(function(conn) {
//     return conn.createChannel();
// })
// .then(function(ch){
//     const aq = ch.assertQueue(q);
//     return ch;
// })
// .then(function(ch){
//     return ch.sendToQueue(q, Buffer.from('something to do'));
// })
// .catch(console.warn);

// // Publisher - my ver 2
// const res = open
// .then(function(conn) {

//     setTimeout(function() {
//         conn.close();
//         process.exit(0);
//     }, 500);

//     return conn.createChannel();
// })
// .then(function(ch){
//     return ch.assertQueue(q).then(function(ok){
//        return ch.sendToQueue(q, Buffer.from('something to do...'));
//     });
// })
// .catch(console.warn);

// res.then(result=>{
//     console.log(result);
// });

// Publisher - my ver 3
const res = open
.then(function(conn) {

    // setTimeout(function() {
    //     conn.close();
    //     process.exit(0);
    // }, 500);

    return conn.createChannel()
        .then(ch=>{
            return ch.assertQueue(q).then(function(ok){

                setTimeout(function() {
                    conn.close();
                    process.exit(0);
                }, 500);

                const res = ch.sendToQueue(q, Buffer.from('something to do...'));
                // conn.close();//will fail the sendToQueue
                return res;
             });
        });
})
.catch(console.warn);

res.then(result=>{
    console.log(result);
});
