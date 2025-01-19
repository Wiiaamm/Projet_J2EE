package com.example.MS_Employes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableConfigurationProperties
@EnableDiscoveryClient
@RefreshScope
@EnableFeignClients
public class MsEmployesApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsEmployesApplication.class, args);
	}

}
