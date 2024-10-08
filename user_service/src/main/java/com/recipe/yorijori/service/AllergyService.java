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


    // 알러지 추가 후 추가된 알러지 정보 반환
    public AllergyResponseDto addAllergy(Long userId, AllergyRequestDto requestDto) {
        // 이미 해당 회원이 같은 알러지를 가지고 있는지 확인
        boolean exists = allergyRepository.existsByCommonCodeNumAndUserId(requestDto.getCommonCodeNum(), userId);

        if (exists) {
            throw new IllegalArgumentException("이미 해당 회원이 해당 알러지를 가지고 있습니다.");
        }

        // 새로운 알러지 추가
        Allergys newAllergy = Allergys.builder()
                .userId(userId)
                .commonCodeNum(requestDto.getCommonCodeNum())
                .build();
        Allergys savedAllergy = allergyRepository.save(newAllergy);

        return new AllergyResponseDto(
                savedAllergy.getAllergyId(),
                savedAllergy.isStatus(),
                savedAllergy.getCommonCodeNum(),
                savedAllergy.getUserId()
        );
    }

    public void deleteAllergyByCommonCodeNum(String commonCodeNum, Long userId) {
        Allergys allergy = allergyRepository.findByCommonCodeNumAndUserId(commonCodeNum, userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 알러지를 찾을 수 없습니다."));

        allergyRepository.delete(allergy);
    }
}