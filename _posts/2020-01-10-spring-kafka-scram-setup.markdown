---
layout: post
title:  "Spring Kafka with SSL and SCRAM"
date:   2020-01-10 18:30:00
categories: Spring Kafka SSL SCRAM
---

I needed to implement a Spring Kafka listener using SCRAM. I couldn't find an example configuration and had to piece it together, here is a short post about what I came up with.

This post contains a brief overview of the technologies to ground the code which follows.

### Brief Overview

Kafka is an [distributed streaming platform][kafka], which handles and persists queued messages. To authenticate with Kafka [SASL(Simple Authentication and Security Layer)][sasl] is used as the authentication protocol.

A few different mechanisms are available for authentication including GSSAPI(default), PLAIN and SCRAM.
* GSSAPI is used primarly by Keberos (for example Active Directory).
* PLAIN is just a clear text password mechanism.
* SCRAM is a password based challenge response mechanism.

In Java this is managed by the [JAAS(Java Authentication and Authorization Service)][jaas] which manages the authentication on your behalf. This is often a configuration file such as `jaas.config` however in the example it is specified within the `application.yml` on line 10. This can be replaced with a directory where the `jaas.config` is located. This also contains the classpath of the class handling Logging in, if this is not specified it will default to the Kerberos login module.

In the example config sets the JAAS config within the `application.yml`. If you want to use a file for this remove lines 9 and 10 and specify `-Djava.security.auth.login.config=<location>`.

By default Kafka communicates in plain text this can be changed by specifying SSL (lines 14-19) configuration, this allows the Kafka streams to be encrypted between Kafka and the clients. The `file:` option is optional if the file does not exist on the class path, as by default it is assumed to be `classpath:`.

For the reference of options search kafka in the [spring reference][springref].

### The Code

Spring-kafka can be imported via Gradle or Maven (the following examples use: 2.1.6).

The `application.yml` is the most important step as it defines the configuration to spring, such as were to connect. The rest is the boilerplate code that listens to the events.

#### application.yml

{% highlight java linenos=table %}
spring:
  kafka:
    bootstrap-servers: <your brokers>
    consumer:
      group-id: <your group-ids>
      auto-offset-reset: earliest
    properties:
      sasl:
        jaas:
          config: org.apache.kafka.common.security.scram.ScramLoginModule required username=<scram user> password=<scram password>;
        mechanism: SCRAM-SHA-512
      security:
        protocol: SASL_SSL
    ssl:
      truststore-location: [file:]<truststore location>
      truststore-password: [file:]<truststore password>
      keystore-location: <keystore location>
      keystore-password: <keystore password>
      key-password: <key password>
{% endhighlight %}

#### Root project

{% highlight java linenos=table %}
@EnableKafka
public class MyApplication {
  public static void main(String[] args) {
    SpringApplication.run(MyApplication.class, args);
  }
}
{% endhighlight %}

#### Listener

{% highlight java linenos=table %}
@Service
@ConditionalOnProperty(value = "feature-flags.kafka", havingValue = "true")
public class MyEventListener {
  @KafkaListener(topics = "my.event")
  @SendTo
  public void listenToTopic(ConsumerRecord<?, ?> cr) {
    log.info("Server Recieved: " + cr.toString());
  }
}
{% endhighlight %}


[kafka]: https://kafka.apache.org/
[sasl]: https://en.wikipedia.org/wiki/Simple_Authentication_and_Security_Layer
[jaas]: https://en.wikipedia.org/wiki/Java_Authentication_and_Authorization_Service
[springref]: https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html
