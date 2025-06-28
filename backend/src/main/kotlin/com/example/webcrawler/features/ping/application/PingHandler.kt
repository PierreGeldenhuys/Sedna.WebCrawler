package com.example.webcrawler.features.ping.application

import com.example.webcrawler.features.ping.domain.PingCommand

class PingHandler {
    fun handle(command: PingCommand): Int = when (command) {
        is PingCommand.Request -> 200
    }
}
