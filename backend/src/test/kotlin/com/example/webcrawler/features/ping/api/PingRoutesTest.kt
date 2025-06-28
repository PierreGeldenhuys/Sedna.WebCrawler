package com.example.webcrawler.features.ping.test

import io.ktor.server.testing.*
import io.ktor.client.request.*
import io.ktor.http.*
import kotlin.test.Test
import kotlin.test.assertEquals
import com.example.webcrawler.module

class PingRoutesTest {
    @Test
    fun `GET ping should return 200`() = testApplication {
        application { module() }
        val response = client.get("/ping")
        assertEquals(HttpStatusCode.OK, response.status)
    }
}
