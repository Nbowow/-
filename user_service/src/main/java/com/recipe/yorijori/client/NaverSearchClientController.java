package com.egginhealth.controller;


import com.egginhealth.config.NaverSearchClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "NaverSearchClient", url = "https://openapi.naver.com/v1/search/shop.json", configuration = NaverSearchClientConfig.class)
public interface NaverSearchClientController {
    @GetMapping()
    String getLowestPriceResult(@RequestParam(value = "query") String query,
                                @RequestParam(value = "display") String display,
                                @RequestParam(value = "start") String start,
                                @RequestParam(value = "sort") String sort
    );
}
