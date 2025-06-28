package com.example.webcrawler.features.ping.domain

// Sealed command for ping
sealed class PingCommand {
    object Request : PingCommand()
}
