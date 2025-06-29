import org.gradle.jvm.tasks.Jar
import org.gradle.api.file.DuplicatesStrategy

plugins {
    kotlin("jvm") version "2.2.0"
    kotlin("plugin.serialization") version "2.2.0"
    id("io.ktor.plugin") version "3.2.0"
    id("org.graalvm.buildtools.native") version "0.9.28"
    application
}

group = "com.example.webcrawler"
version = "0.0.1"

application {
    mainClass.set("com.example.webcrawler.ApplicationKt")
}

dependencies {
    implementation("io.ktor:ktor-server-netty:3.2.0")
    implementation("io.ktor:ktor-server-core:3.2.0")
    implementation("io.ktor:ktor-server-content-negotiation:3.2.0")
    implementation("io.ktor:ktor-serialization-kotlinx-json:3.2.0")
    implementation("io.ktor:ktor-server-cors:3.2.0")
    implementation("org.jsoup:jsoup:1.18.3")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.1")
    implementation("ch.qos.logback:logback-classic:1.4.14")
    testImplementation("io.ktor:ktor-server-test-host:3.2.0")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5:2.2.0")
    testImplementation("io.mockk:mockk:1.13.5")
}

repositories {
    mavenCentral()
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_21)
        freeCompilerArgs.addAll(listOf(
            "-opt-in=kotlin.RequiresOptIn",
            "-Xjsr305=strict"
        ))
    }
}

// Optimize test execution
tasks.test {
    useJUnitPlatform()
    maxParallelForks = Runtime.getRuntime().availableProcessors()
    
    // Enable test result caching
    outputs.upToDateWhen { false }
}

// Enable build cache for custom tasks
tasks.withType<JavaCompile> {
    options.isIncremental = true
}

tasks.named<Jar>("jar") {
    manifest {
        attributes["Main-Class"] = "com.example.webcrawler.ApplicationKt"
    }
    from({
        configurations.runtimeClasspath.get().filter { it.name.endsWith("jar") }.map { zipTree(it) }
    })
    archiveFileName.set("app.jar")
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}

tasks.register("printSourceSet") {
    doLast {
        println("Main source set: " + project.extensions.getByName("sourceSets").let { it as org.gradle.api.tasks.SourceSetContainer }["main"].allSource.srcDirs)
        println("Main Kotlin: " + project.extensions.getByName("sourceSets").let { it as org.gradle.api.tasks.SourceSetContainer }["main"].kotlin.srcDirs)
    }
}

graalvmNative {
    binaries {
        named("main") {
            imageName.set("webcrawler")
            mainClass.set("com.example.webcrawler.ApplicationKt")
            debug.set(false)
        }
    }
}
