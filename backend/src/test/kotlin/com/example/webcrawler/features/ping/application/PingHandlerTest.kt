package com.example.webcrawler.features.ping.test

import kotlin.test.Test
import kotlin.test.assertEquals
import com.example.webcrawler.features.ping.application.PingHandler
import com.example.webcrawler.features.ping.domain.PingCommand

class PingHandlerTest {
    @Test
    fun `should return 200 OK`() {
        val handler = PingHandler()
        val result = handler.handle(PingCommand.Request)
        assertEquals(200, result)
    }
}
