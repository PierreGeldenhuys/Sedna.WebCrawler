package com.example.webcrawler.features.ping.application

import com.example.webcrawler.features.ping.domain.PingCommand

import org.slf4j.LoggerFactory

class PingHandler {
    private val logger = LoggerFactory.getLogger(PingHandler::class.java)

    fun handle(command: PingCommand): Int = when (command) {
        is PingCommand.Request -> {
            logger.info("Ping received")
            200
        }
    }
}
