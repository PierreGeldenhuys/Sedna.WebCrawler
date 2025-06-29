package com.example.webcrawler.features.crawl.application

import com.example.webcrawler.features.crawl.domain.CrawlCommand
import com.example.webcrawler.features.crawl.domain.CrawlResult
import com.example.webcrawler.features.crawl.domain.Page
import kotlinx.coroutines.*
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import java.net.URL
import java.util.concurrent.ConcurrentHashMap
import org.slf4j.LoggerFactory

class CrawlHandler {
    companion object {
        private val logger = LoggerFactory.getLogger(CrawlHandler::class.java)
    }
    fun handle(command: CrawlCommand): CrawlResult = when (command) {
        is CrawlCommand.Request -> crawlUrl(command.url)
    }
    
    private fun crawlUrl(url: String): CrawlResult {
        val startTime = System.currentTimeMillis()
        return try {
            val baseUrl = URL(url)
            val baseDomain = baseUrl.host

            val visitedUrls = ConcurrentHashMap.newKeySet<String>()
            val foundPages = mutableListOf<Page>()
            val urlsToVisit = ArrayDeque<String>()
            val urlsToVisitSet = mutableSetOf<String>()

            urlsToVisit.add(url)
            urlsToVisitSet.add(url)

            val maxPages = 200
            val concurrency = 5

            runBlocking {
                var pageCount = 0
                while (urlsToVisit.isNotEmpty() && pageCount < maxPages) {
                    val batch = getNextBatch(urlsToVisit, urlsToVisitSet, visitedUrls, concurrency, maxPages, pageCount)
                    val jobs = batch.map { currentUrl ->
                        async(Dispatchers.IO) {
                            processPage(
                                currentUrl,
                                baseDomain,
                                visitedUrls,
                                foundPages,
                                urlsToVisit,
                                urlsToVisitSet
                            )
                        }
                    }
                    jobs.forEach { it.await() }
                    pageCount += batch.size
                }
            }

            logCrawlTime(startTime, foundPages)

            CrawlResult(
                pages = foundPages.sortedBy { it.url },
                success = true
            )
        } catch (e: Exception) {
            CrawlResult(
                pages = emptyList(),
                success = false
            )
        }
    }

    private fun getNextBatch(
        urlsToVisit: ArrayDeque<String>,
        urlsToVisitSet: MutableSet<String>,
        visitedUrls: Set<String>,
        concurrency: Int,
        maxPages: Int,
        pageCount: Int
    ): List<String> {
        val batch = mutableListOf<String>()
        while (urlsToVisit.isNotEmpty() && batch.size < concurrency && pageCount + batch.size < maxPages) {
            val nextUrl = urlsToVisit.removeFirst()
            urlsToVisitSet.remove(nextUrl)
            if (!visitedUrls.contains(nextUrl)) {
                batch.add(nextUrl)
            }
        }
        return batch
    }

    private fun processPage(
        currentUrl: String,
        baseDomain: String,
        visitedUrls: MutableSet<String>,
        foundPages: MutableList<Page>,
        urlsToVisit: ArrayDeque<String>,
        urlsToVisitSet: MutableSet<String>
    ) {
        try {
            visitedUrls.add(currentUrl)
            val connection = Jsoup.connect(currentUrl)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                .timeout(5000)
            val response = connection.execute()
            val contentType = response.contentType()?.lowercase() ?: ""
            if (contentType.startsWith("text/") || contentType.contains("xml") || contentType.contains("+xml")) {
                val doc = response.parse()
                val title = doc.title()
                synchronized(foundPages) {
                    foundPages.add(Page(url = currentUrl, title = title))
                }
                addNewLinks(doc, baseDomain, visitedUrls, urlsToVisit, urlsToVisitSet)
            }
            // else: skip logging for unsupported content types
        } catch (e: Exception) {
            // Only log network or parsing errors, not content type skips
            if (e.message?.contains("Unhandled content type") != true) {
                logger.error("Failed to fetch $currentUrl: ${e.message}", e)
            }
        }
    }

    private fun addNewLinks(
        doc: Document,
        baseDomain: String,
        visitedUrls: Set<String>,
        urlsToVisit: ArrayDeque<String>,
        urlsToVisitSet: MutableSet<String>
    ) {
        val links = doc.select("a[href]")
        for (link in links) {
            val href = link.attr("abs:href")
            if (
                href.isNotBlank() &&
                isValidInternalUrl(href, baseDomain) &&
                hasAllowedExtension(href)
            ) {
                val normalizedUrl = normalizeUrl(href)
                if (!visitedUrls.contains(normalizedUrl) && !urlsToVisitSet.contains(normalizedUrl)) {
                    synchronized(urlsToVisit) {
                        urlsToVisit.add(normalizedUrl)
                        urlsToVisitSet.add(normalizedUrl)
                    }
                }
            }
        }
    }

    /**
     * Only allow URLs with extensions typically associated with HTML/XML, or no extension.
     * Disallow common binary/document types (pdf, docx, jpg, png, etc).
     */
    private fun hasAllowedExtension(url: String): Boolean {
        val disallowed = setOf(
            ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".zip", ".rar", ".7z", ".tar", ".gz",
            ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp", ".mp3", ".mp4", ".avi", ".mov", ".wmv", ".flv",
            ".exe", ".bin", ".dmg", ".iso", ".apk", ".msi", ".csv", ".json"
        )
        val lower = url.lowercase()
        val idx = lower.indexOf('?').let { if (it == -1) lower.length else it }
        val path = lower.substring(0, idx)
        val extIdx = path.lastIndexOf('.')
        if (extIdx == -1 || path.substring(extIdx) == ".html" || path.substring(extIdx) == ".htm" || path.substring(extIdx) == ".php" || path.substring(extIdx) == ".asp" || path.substring(extIdx) == ".aspx" || path.substring(extIdx) == ".jsp" || path.substring(extIdx) == ".jspx" || path.substring(extIdx) == ".xml") {
            return true
        }
        return path.substring(extIdx) !in disallowed
    }

    private fun logCrawlTime(startTime: Long, foundPages: List<Page>) {
        val endTime = System.currentTimeMillis()
        val elapsedMs = endTime - startTime
        val pagesCrawled = foundPages.size
        val speed = if (elapsedMs > 0) pagesCrawled / (elapsedMs / 1000.0) else 0.0
        val logMsg = "Crawl took ${elapsedMs} ms | Pages: $pagesCrawled | Speed: %.2f pages/sec".format(speed)
        logger.info(logMsg)
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
