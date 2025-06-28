package com.example.webcrawler.features.crawl.domain

// Value object representing a crawled page
data class Page(
    val url: String,
    val title: String = ""
)

// Result of a crawl operation
data class CrawlResult(
    val pages: List<Page>,
    val success: Boolean
)
