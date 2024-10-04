package com.recipe.ingredient_service.service;

import com.recipe.ingredient_service.data.domain.Ingredient;
import com.recipe.ingredient_service.data.dto.ingredient.response.IngredientIdResponseDto;
import com.recipe.ingredient_service.repository.IngredientRepository;
import info.debatty.java.stringsimilarity.JaroWinkler;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;
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

    public Long findMatchingIngredient(String ingredientName) {

        Optional<Ingredient> foundIngredient = ingredientRepository.findByNameIgnoreCase(ingredientName);

        if (foundIngredient.isPresent()) {
            return foundIngredient.get().getId();
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
            return bestMatch.getId();
        }
        return 0L;
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
        long result = findMatchingIngredient(name);

        if (result == 0L) {

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
                .id(result)
                .build();
    }
}
