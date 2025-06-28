package com.example.webcrawler.features.crawl.api

import com.example.webcrawler.features.crawl.application.CrawlHandler
import com.example.webcrawler.features.crawl.domain.CrawlCommand
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class CrawlRequest(val url: String)

@Serializable
data class PageResponse(val url: String, val title: String)

@Serializable
data class CrawlResponse(val success: Boolean, val pages: List<PageResponse>)

fun Route.crawlRoutes() {
    val handler = CrawlHandler()
    
    post("/crawl") {
        try {
            val request = call.receive<CrawlRequest>()
            
            // Validate URL format
            if (request.url.isBlank() || !isValidUrl(request.url)) {
                call.respond(HttpStatusCode.BadRequest, "Invalid URL")
                return@post
            }
            
            val result = handler.handle(CrawlCommand.Request(request.url))
            
            val response = CrawlResponse(
                success = result.success,
                pages = result.pages.map { page ->
                    PageResponse(url = page.url, title = page.title)
                }
            )
            
            call.respond(HttpStatusCode.OK, response)
        } catch (e: Exception) {
            call.respond(HttpStatusCode.BadRequest, "Invalid request format")
        }
    }
}

private fun isValidUrl(url: String): Boolean {
    return try {
        java.net.URL(url)
        url.startsWith("http://") || url.startsWith("https://")
    } catch (e: Exception) {
        false
    }
}
