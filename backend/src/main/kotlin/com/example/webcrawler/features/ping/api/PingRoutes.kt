package com.example.webcrawler.features.ping.api

import com.example.webcrawler.features.ping.application.PingHandler
import com.example.webcrawler.features.ping.domain.PingCommand
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.pingRoutes() {
    val handler = PingHandler()
    get("/ping") {
        val status = handler.handle(PingCommand.Request)
        if (status == 200) {
            call.respond(HttpStatusCode.OK)
        } else {
            call.respond(HttpStatusCode.InternalServerError)
        }
    }
}
