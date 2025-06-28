package com.example.webcrawler.features.crawl.domain

// Sealed command for crawl operations
sealed class CrawlCommand {
    data class Request(val url: String) : CrawlCommand()
}
