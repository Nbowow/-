package com.recipe.yorijori.service;


import com.recipe.yorijori.data.domain.Allergys;
import com.recipe.yorijori.data.dto.allergy.request.AllergyRequestDto;
import com.recipe.yorijori.data.dto.allergy.response.AllergyResponseDto;
import com.recipe.yorijori.repository.AllergyRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AllergyService {

    private final AllergyRespository allergyRepository;


    // 유저 ID에 해당하는 알러지 정보 조회
    public List<AllergyResponseDto> getAllergiesByUserId(Long userId) {
        List<Allergys> allergies = allergyRepository.findAllByUserId(userId);
        return allergies.stream()
                .map(allergy -> new AllergyResponseDto(
                        allergy.getAllergyId(),
                        allergy.isStatus(),
                        allergy.getCommonCodeNum(),
                        allergy.getUserId()))
                .collect(Collectors.toList());
    }


    // 알러지 추가
    public Allergys addAllergy(Long userId, AllergyRequestDto requestDto) {
        Allergys newAllergy = Allergys.builder()
                .userId(userId)
                .commonCodeNum(requestDto.getCommonCodeNum())
                .build();
        return allergyRepository.save(newAllergy);
    }

    // 알러지 삭제
    public void deleteAllergy(Long allergyId, Long userId) {
        Allergys allergy = allergyRepository.findById(allergyId)
                .orElseThrow(() -> new IllegalArgumentException("해당 알러지를 찾을 수 없습니다."));

        if (!allergy.getUserId().equals(userId)) {
            throw new IllegalArgumentException("본인의 알러지만 삭제할 수 있습니다.");
        }

        allergyRepository.delete(allergy);
    }
}