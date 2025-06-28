package com.example.webcrawler.features.crawl.test

import io.ktor.server.testing.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import com.example.webcrawler.module
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonPrimitive

class CrawlRoutesTest {
    
    @Test
    fun `POST crawl should return 200 with valid URL`() = testApplication {
        application { module() }
        
        val response = client.post("/crawl") {
            contentType(ContentType.Application.Json)
            setBody("""{"url": "https://example.com"}""")
        }
        
        // Debug: Let's see what we actually get
        println("Response status: ${response.status}")
        println("Response body: ${response.bodyAsText()}")
        
        assertEquals(HttpStatusCode.OK, response.status)
        
        val responseBody = response.bodyAsText()
        val json = Json.parseToJsonElement(responseBody).jsonObject
        
        assertTrue(json.containsKey("success"))
        assertTrue(json.containsKey("pages"))
        assertTrue(json["pages"]?.jsonArray?.size!! >= 0)
    }
    
    @Test
    fun `POST crawl should return 400 with invalid JSON`() = testApplication {
        application { module() }
        
        val response = client.post("/crawl") {
            contentType(ContentType.Application.Json)
            setBody("""{"invalid": "json"}""")
        }
        
        assertEquals(HttpStatusCode.BadRequest, response.status)
    }
    
    @Test
    fun `POST crawl should return 400 with invalid URL`() = testApplication {
        application { module() }
        
        val response = client.post("/crawl") {
            contentType(ContentType.Application.Json)
            setBody("""{"url": "not-a-valid-url"}""")
        }
        
        assertEquals(HttpStatusCode.BadRequest, response.status)
    }
    
    @Test
    fun `POST crawl should return only same domain pages`() = testApplication {
        application { module() }
        
        val response = client.post("/crawl") {
            contentType(ContentType.Application.Json)
            setBody("""{"url": "https://sedna.com"}""")
        }
        
        assertEquals(HttpStatusCode.OK, response.status)
        
        val responseBody = response.bodyAsText()
        val json = Json.parseToJsonElement(responseBody).jsonObject
        val pages = json["pages"]?.jsonArray
        
        // All pages should be from sedna.com domain
        pages?.forEach { page ->
            val url = page.jsonObject["url"]?.jsonPrimitive?.content
            assertTrue(url?.contains("sedna.com") == true)
        }
    }
}
