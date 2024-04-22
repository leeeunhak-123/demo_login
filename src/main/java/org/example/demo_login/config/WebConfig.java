package org.example.demo_login.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://ec2-3-139-91-37.us-east-2.compute.amazonaws.com",
                        "http://localhost:3000" //개발환경 테스트를 위해 유지.
                )
                .allowedMethods("GET","POST","PUT","DELETE");
    }

    //클라이언트에 이미지가 나오도록 CORS 정책설정과 이미지 파일 경로 설정.
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:///C:/Workspace/images/");
    }
}
