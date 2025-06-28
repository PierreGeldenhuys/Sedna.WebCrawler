package com.example.webcrawler.features.crawl.application

import com.example.webcrawler.features.crawl.domain.CrawlCommand
import com.example.webcrawler.features.crawl.domain.CrawlResult
import com.example.webcrawler.features.crawl.domain.Page
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import java.net.URL
import java.util.concurrent.ConcurrentHashMap

class CrawlHandler {
    fun handle(command: CrawlCommand): CrawlResult = when (command) {
        is CrawlCommand.Request -> crawlUrl(command.url)
    }
    
    private fun crawlUrl(url: String): CrawlResult {
        return try {
            // Validate URL format
            val baseUrl = URL(url)
            val baseDomain = baseUrl.host
            
            // Use concurrent collections for thread safety
            val visitedUrls = ConcurrentHashMap.newKeySet<String>()
            val foundPages = mutableListOf<Page>()
            val urlsToVisit = mutableListOf<String>()
            
            // Start with the initial URL
            urlsToVisit.add(url)
            
            // Crawl up to 50 pages to avoid infinite loops
            var pageCount = 0
            val maxPages = 50
            
            while (urlsToVisit.isNotEmpty() && pageCount < maxPages) {
                val currentUrl = urlsToVisit.removeAt(0)
                
                // Skip if already visited
                if (visitedUrls.contains(currentUrl)) {
                    continue
                }
                
                try {
                    // Mark as visited
                    visitedUrls.add(currentUrl)
                    pageCount++
                    
                    // Fetch the page
                    val doc: Document = Jsoup.connect(currentUrl)
                        .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                        .timeout(5000)
                        .get()
                    
                    // Extract page info
                    val title = doc.title()
                    foundPages.add(Page(url = currentUrl, title = title))
                    
                    // Find all links on this page
                    val links = doc.select("a[href]")
                    for (link in links) {
                        val href = link.attr("abs:href") // Get absolute URL
                        
                        if (href.isNotBlank() && isValidInternalUrl(href, baseDomain)) {
                            val normalizedUrl = normalizeUrl(href)
                            if (!visitedUrls.contains(normalizedUrl) && !urlsToVisit.contains(normalizedUrl)) {
                                urlsToVisit.add(normalizedUrl)
                            }
                        }
                    }
                    
                } catch (e: Exception) {
                    // Skip pages that can't be fetched, but continue with others
                    println("Failed to fetch $currentUrl: ${e.message}")
                }
            }
            
            CrawlResult(
                pages = foundPages.sortedBy { it.url },
                success = true
            )
        } catch (e: Exception) {
            // Invalid URL or other major error
            CrawlResult(
                pages = emptyList(),
                success = false
            )
        }
    }
    
    private fun isValidInternalUrl(href: String, baseDomain: String): Boolean {
        return try {
            val url = URL(href)
            // Only include URLs from the same domain and HTTP/HTTPS protocol
            url.host == baseDomain && (url.protocol == "http" || url.protocol == "https")
        } catch (e: Exception) {
            false
        }
    }
    
    private fun normalizeUrl(url: String): String {
        return try {
            val urlObj = URL(url)
            // Remove fragment (#) and normalize
            val normalizedUrl = "${urlObj.protocol}://${urlObj.host}${urlObj.port.let { if (it != -1 && it != 80 && it != 443) ":$it" else "" }}${urlObj.path}"
            // Remove trailing slash for consistency (except for root)
            if (normalizedUrl.endsWith("/") && urlObj.path != "/") {
                normalizedUrl.substring(0, normalizedUrl.length - 1)
            } else {
                normalizedUrl
            }
        } catch (e: Exception) {
            url
        }
    }
}
