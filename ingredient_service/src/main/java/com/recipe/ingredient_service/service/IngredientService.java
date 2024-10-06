package com.recipe.ingredient_service.service;

import com.recipe.ingredient_service.data.domain.DayPrice;
import com.recipe.ingredient_service.data.domain.Ingredient;
import com.recipe.ingredient_service.data.domain.UserLikeMaterials;
import com.recipe.ingredient_service.data.dto.ingredient.DayDto;
import com.recipe.ingredient_service.data.dto.ingredient.response.*;
import com.recipe.ingredient_service.repository.DayPriceRepository;
import com.recipe.ingredient_service.repository.IngredientRepository;
import com.recipe.ingredient_service.repository.UserLikeMaterialsRepository;
import info.debatty.java.stringsimilarity.JaroWinkler;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoField;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class IngredientService {

    private final UserLikeMaterialsRepository userLikeMaterialsRepository;
    private final IngredientRepository ingredientRepository;
    private final DayPriceRepository dayPriceRepository;
    private JaroWinkler jaroWinkler = new JaroWinkler();

    // 알러지 매핑 데이터
    private Map<String, List<String>> allergyMapping = new HashMap<>();
    private Map<String, String> allergyCodeMapping = new HashMap<>();

    // 초기화 블록에서 매핑 데이터 설정
    {
        allergyMapping.put("알류", List.of("달걀", "계란", "메추리알", "오리알", "난백", "흰자", "노른자"));
        allergyMapping.put("우유", List.of("우유", "연유", "크림", "치즈", "버터", "요거트", "사워 크림", "카제인", "유청 단백질", "우유 분말"));
        allergyMapping.put("메밀", List.of("메밀가루", "메밀면 (소바)", "메밀빵", "메밀 크래커", "메밀 팬케이크", "메밀"));
        allergyMapping.put("땅콩", List.of("땅콩", "땅콩버터", "땅콩 오일", "땅콩 가루", "땅콩 소스", "땅콩 스낵"));
        allergyMapping.put("대두 (콩)", List.of("대두", "콩", "두부", "된장", "간장", "콩기름", "콩 단백질", "템페", "낫토", "두유", "에다마메"));
        allergyMapping.put("밀", List.of("밀가루", "통밀", "빵", "파스타", "크래커", "시리얼", "쿠키", "케이크", "밀가루 베이스 믹스", "밀글루텐"));
        allergyMapping.put("잣", List.of("잣", "잣 오일", "잣 가루", "잣 페스토"));
        allergyMapping.put("호두", List.of("호두", "호두 오일", "호두 가루", "호두 스낵"));
        allergyMapping.put("게", List.of("게", "게살", "크랩 스틱", "게 소스"));
        allergyMapping.put("새우", List.of("새우", "건새우", "새우 페이스트", "새우칩"));
        allergyMapping.put("오징어", List.of("오징어", "마른 오징어", "오징어볼", "오징어젓갈"));
        allergyMapping.put("고등어", List.of("고등어", "고등어 통조림", "훈제 고등어"));
        allergyMapping.put("조개류", List.of("조개", "바지락", "홍합", "가리비", "굴", "전복", "모시조개", "대합"));
        allergyMapping.put("복숭아", List.of("복숭아", "복숭아 잼", "복숭아 통조림", "복숭아 주스"));
        allergyMapping.put("토마토", List.of("토마토", "토마토 페이스트", "토마토 소스", "토마토 퓨레", "케첩"));
        allergyMapping.put("닭고기", List.of("닭고기", "닭가슴살", "닭날개", "닭다리", "치킨 스톡", "닭고기 소시지"));
        allergyMapping.put("돼지고기", List.of("돼지고기", "삼겹살", "베이컨", "햄", "소시지", "돼지갈비"));
        allergyMapping.put("쇠고기", List.of("쇠고기", "소고기", "스테이크", "쇠고기 소시지", "쇠고기 스톡", "쇠고기 다짐육"));
        allergyMapping.put("아황산류 (황산화물)", List.of("건조 과일", "와인"));

        allergyCodeMapping.put("알류", "A_0001");
        allergyCodeMapping.put("우유", "A_0002");
        allergyCodeMapping.put("메밀", "A_0003");
        allergyCodeMapping.put("땅콩", "A_0004");
        allergyCodeMapping.put("대두 (콩)", "A_0005");
        allergyCodeMapping.put("밀", "A_0006");
        allergyCodeMapping.put("잣", "A_0007");
        allergyCodeMapping.put("호두", "A_0008");
        allergyCodeMapping.put("게", "A_0009");
        allergyCodeMapping.put("새우", "A_0010");
        allergyCodeMapping.put("오징어", "A_0011");
        allergyCodeMapping.put("고등어", "A_0012");
        allergyCodeMapping.put("조개류", "A_0013");
        allergyCodeMapping.put("복숭아", "A_0014");
        allergyCodeMapping.put("토마토", "A_0015");
        allergyCodeMapping.put("닭고기", "A_0016");
        allergyCodeMapping.put("돼지고기", "A_0017");
        allergyCodeMapping.put("쇠고기", "A_0018");
        allergyCodeMapping.put("아황산류 (황산화물)", "A_0019");
    }

    public Ingredient findMatchingIngredient(String ingredientName) {

        Optional<Ingredient> foundIngredient = ingredientRepository.findByNameIgnoreCase(ingredientName);

        if (foundIngredient.isPresent()) {
            return foundIngredient.get();
        }

        List<Ingredient> ingredients = ingredientRepository.findAll();
        Ingredient bestMatch = null;
        double highestSimilarity = 0.0;


        for (Ingredient item : ingredients) {
            double similarity = jaroWinkler.similarity(ingredientName, item.getName());

            if (similarity > highestSimilarity && similarity >= 0.9) {
                highestSimilarity = similarity;
                bestMatch = item;
            }
        }

        if (bestMatch != null) {
            return bestMatch;
        }
        return null;
    }

    private String findMatchingAllergyCode(String ingredientName) {
        String bestMatchCategory = null;
        double highestSimilarity = 0.0;

        for (Map.Entry<String, List<String>> entry : allergyMapping.entrySet()) {
            String allergyCategory = entry.getKey();
            List<String> items = entry.getValue();

            for (String item : items) {
                double similarity = jaroWinkler.similarity(ingredientName, item);
                if (similarity > highestSimilarity && similarity >= 0.9) {
                    highestSimilarity = similarity;
                    bestMatchCategory = allergyCategory;
                }
            }
        }

        if (bestMatchCategory != null)
            return allergyCodeMapping.get(bestMatchCategory);

        return null;
    }

    public IngredientIdResponseDto findSimilarName(String name) {
        Ingredient findIngredient = findMatchingIngredient(name);

        if (findIngredient == null) {
            String allergyCode = findMatchingAllergyCode(name);
            Ingredient newIngredient = Ingredient.builder()
                    .name(name)
                    .priceStatus(false)
                    .allergyName(allergyCode)
                    .build();

            Ingredient saveIngredient = ingredientRepository.save(newIngredient);

            return IngredientIdResponseDto.builder()
                    .id(saveIngredient.getId())
                    .build();
        }

        return IngredientIdResponseDto.builder()
                .id(findIngredient.getId())
                .build();
    }

    public IngredientsSearchResponseDto findIngredientData(String name) {
        Ingredient findIngredient = findMatchingIngredient(name);

        return IngredientsSearchResponseDto.builder()
                .id(findIngredient.getId())
                .name(findIngredient.getName())
                .ingredientImage(findIngredient.getImg())
                .build();
    }

    public List<IngredientPriceChangeResponseDto> findAllIngredientPriceData() {

        List<Long> priceIngredientList = ingredientRepository.findMaterialIdsWithPriceStatusTrue();

        List<Object[]> priceChanges = dayPriceRepository.findIngredientPriceChanges(priceIngredientList);

        List<IngredientPriceChangeResponseDto> responseDtoList = new ArrayList<>();

        for (int i = 0; i < priceChanges.size(); i += 2) {
            Long ingredientId = (Long) priceChanges.get(i)[0];
            Integer currentPrice = (Integer) priceChanges.get(i)[1];
            Integer yesterdayPrice = (Integer) priceChanges.get(i + 1)[1];

            String ingredientName = ingredientRepository.findById(ingredientId)
                    .map(Ingredient::getName)
                    .orElse("Unknown Ingredient");

            if (!ingredientName.equals("Unknown Ingredient")) {
                IngredientPriceChangeResponseDto dto = IngredientPriceChangeResponseDto.builder()
                        .name(ingredientName)
                        .currentPrice(currentPrice.toString())
                        .yesterdayPrice(yesterdayPrice.toString())
                        .build();

                responseDtoList.add(dto);
            }
        }

        return responseDtoList;
    }

    public IngredientPriceDetailsResponseDto findAllDayIngredientPriceData(Long ingredientId) {
        IngredientPriceDetailsResponseDto newIngredient = new IngredientPriceDetailsResponseDto();

        // 일간
        Pageable pageable = PageRequest.of(0, 12);
        LocalDateTime today = LocalDateTime.now();
        List<DayPrice> findTopDayIngredientPrice = dayPriceRepository.findRecentDays(ingredientId, today, pageable);

        List<DayDto> dayPriceList = new ArrayList<>();
        LocalDateTime currentDate = today;

        DayPrice closestDayPrice = findTopDayIngredientPrice.isEmpty() ? null : findTopDayIngredientPrice.get(0);

        for (int i = 0; i < 12; i++) {
            LocalDateTime finalCurrentDate = currentDate;

            DayPrice currentDayPrice = findTopDayIngredientPrice.stream()
                    .filter(dp -> dp.getDay().toLocalDate().equals(finalCurrentDate.toLocalDate()))
                    .findFirst()
                    .orElse(null);

            if (currentDayPrice != null && currentDayPrice.getPrice() != 0) {
                closestDayPrice = currentDayPrice;
            }

            if (closestDayPrice != null) {
                int daysAgo = i + 1;
                dayPriceList.add(new DayDto(daysAgo, closestDayPrice.getPrice()));
            }

            currentDate = currentDate.minusDays(1);
        }

        newIngredient.setDayPriceData(dayPriceList);

        // 주간
        LocalDateTime endDate = LocalDateTime.now();

        List<Object[]> weeklyAverages = dayPriceRepository.findWeeklyAveragePriceInPast(ingredientId, endDate);

        List<DayDto> weeklyAveragePriceList = weeklyAverages.stream()
                .map(result -> {
                    int weekNum = (int) result[0];
                    double avgPrice = (double) result[1];

                    int currentWeekNum = endDate.get(ChronoField.ALIGNED_WEEK_OF_YEAR);
                    int weeksAgo = currentWeekNum - weekNum;

                    return new DayDto(weeksAgo, (int) avgPrice);
                })
                .limit(12)
                .collect(Collectors.toList());

        newIngredient.setWeekPriceData(weeklyAveragePriceList);

        // 월간
        List<Object[]> monthlyAverages = dayPriceRepository.findMonthlyAveragePriceInPast(ingredientId, endDate);

        List<DayDto> monthlyAveragePriceList = monthlyAverages.stream()
                .map(result -> {
                    int monthNum = (int) result[0];
                    double avgPrice = (double) result[1];

                    int currentMonthNum = endDate.getMonthValue();
                    int monthsAgo = currentMonthNum - monthNum;

                    if (monthsAgo < 0) {
                        monthsAgo += 12;
                    }

                    return new DayDto(monthsAgo, (int) avgPrice);
                })
                .limit(12)
                .collect(Collectors.toList());

        newIngredient.setMonthPriceData(monthlyAveragePriceList);

        return newIngredient;
    }

    public List<IngredientPopularResponseDto> findPopularIngredients(int day) {

        LocalDateTime startDate = LocalDateTime.now().minusDays(day);
        Pageable pageable = PageRequest.of(0, 3);

        List<Object[]> topLikedIngredients = userLikeMaterialsRepository.findTop3LikedIngredients(startDate, pageable);

        return topLikedIngredients.stream().map(result -> {
            Long ingredientId = (Long) result[0];
            Long likeCount = (Long) result[1];

            Ingredient ingredient = ingredientRepository.findById(ingredientId)
                    .orElseThrow(() -> new NoSuchElementException("재료를 찾을 수 없습니다. ID: " + ingredientId));

            Pageable pricePageable = PageRequest.of(0, 1);
            int price = dayPriceRepository.findRecentDays(ingredientId, LocalDateTime.now(), pricePageable)
                    .stream()
                    .findFirst()
                    .map(DayPrice::getPrice)
                    .orElse(0);

            return new IngredientPopularResponseDto(
                    ingredientId,
                    ingredient.getName(),
                    ingredient.getImg(),
                    price,
                    likeCount
            );
        }).collect(Collectors.toList());
    }

    public void addUserIngredientLike(Long userId, Long ingredientId) {
        UserLikeMaterials newLike = UserLikeMaterials.builder()
                .userId(userId)
                .ingredientId(ingredientId)
                .date(LocalDateTime.now())
                .build();

        userLikeMaterialsRepository.save(newLike);
    }

    @Transactional
    public void removeUserIngredientLike(Long userId, Long ingredientId) {
        userLikeMaterialsRepository.deleteByUserIdAndIngredientId(userId, ingredientId);
    }

    public List<Ingredient> findUserLikeIngredients(Long userId) {
        List<Long> ingredientList = userLikeMaterialsRepository.findIngredientIdsByUserId(userId);
        return ingredientRepository.findByIds(ingredientList);
    }
}
