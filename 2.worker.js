#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'task_queue';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(
            queue, 
            function(msg) {
                const secs = msg.content.toString().split('.').length - 1;
                
                console.log(" [x] Received %s", msg.content.toString());
                setTimeout(function() {
                    console.log(" [x] Done");
                    channel.ack(msg); //WRONG Point in tutorial => will make the worker fail.
                }, secs * 1000);
            }, 
            {
                noAck: false
            }
        );
    });
});