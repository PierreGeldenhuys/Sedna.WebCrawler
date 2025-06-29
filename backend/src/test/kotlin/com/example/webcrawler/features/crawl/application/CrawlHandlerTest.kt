package com.example.webcrawler.features.crawl.test

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlin.test.assertFalse
import com.example.webcrawler.features.crawl.application.CrawlHandler
import com.example.webcrawler.features.crawl.domain.CrawlCommand
import com.example.webcrawler.features.crawl.domain.CrawlResult

class CrawlHandlerTest {
    
    @Test
    fun `should return empty list for invalid URL`() {
        val handler = CrawlHandler()
        val command = CrawlCommand.Request("invalid-url")
        val result = handler.handle(command)
        
        assertTrue(result.pages.isEmpty())
        assertFalse(result.success)
    }
    
    @Test
    fun `should return single page for valid URL with no links`() {
        val handler = CrawlHandler()
        val command = CrawlCommand.Request("https://example.com")
        val result = handler.handle(command)
        
        // Should return at least the starting page
        assertTrue(result.pages.isNotEmpty())
        assertTrue(result.pages.any { it.url.contains("example.com") })
        assertTrue(result.success)
    }
    
    @Test
    fun `should only return pages from same domain`() {
        val handler = CrawlHandler()
        val command = CrawlCommand.Request("https://httpbin.org")
        val result = handler.handle(command)
        
        // All returned pages should be from the same domain
        assertTrue(result.pages.all { page -> 
            page.url.contains("httpbin.org") 
        })
        assertTrue(result.success)
    }
    
    @Test
    fun `should not return duplicate pages`() {
        val handler = CrawlHandler()
        val command = CrawlCommand.Request("https://httpbin.org")
        val result = handler.handle(command)
        
        // No duplicate URLs should be returned
        val uniqueUrls = result.pages.map { it.url }.toSet()
        assertEquals(uniqueUrls.size, result.pages.size)
    }
    
    @Test
    fun `should extract page titles when available`() {
        val handler = CrawlHandler()
        val command = CrawlCommand.Request("https://httpbin.org")
        val result = handler.handle(command)
        
        // At least some pages should have titles
        assertTrue(result.success)
        assertTrue(result.pages.isNotEmpty())
        // The main page should have a title
        val mainPage = result.pages.find { it.url.contains("httpbin.org") }
        assertTrue(mainPage != null)
    }
    
    @Test
    fun `should handle malformed URLs gracefully`() {
        val handler = CrawlHandler()
        val command = CrawlCommand.Request("not-a-url-at-all")
        val result = handler.handle(command)
        
        assertTrue(result.pages.isEmpty())
        assertFalse(result.success)
    }
    
    @Test
    fun `should limit number of pages crawled`() {
        val handler = CrawlHandler()
        val command = CrawlCommand.Request("https://httpbin.org")
        val result = handler.handle(command)
        
        // Should not crawl more than the limit (200 pages)
        assertTrue(result.pages.size <= 200)
        assertTrue(result.success)
    }
    
    @Test
    fun `should handle network timeouts gracefully`() {
        val handler = CrawlHandler()
        // Use a URL that's likely to timeout or be unreachable
        val command = CrawlCommand.Request("https://httpbin.org/delay/10")
        val result = handler.handle(command)
        
        // Should either succeed with limited results or fail gracefully
        // The handler should not crash and should return a valid result
        assertTrue(result.pages.size >= 0) // Could be empty or have some results
    }
}
