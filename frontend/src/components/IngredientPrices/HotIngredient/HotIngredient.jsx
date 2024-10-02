import PropTypes from "prop-types";
import InteractionToggle from "../../Toggle/InteractionToggle/InteractionToggle";
import * as S from "./HotIngredient.styled";
const mock = [
    {
        name: "양파",
        img: "https://media.istockphoto.com/id/1452233695/ko/%EC%82%AC%EC%A7%84/%EB%A7%88%EB%8A%98-%EC%96%91%ED%8C%8C-%EC%8A%A4%ED%8E%98%EC%9D%B8-%EB%B6%89%EC%9D%80-%EC%96%91%ED%8C%8C%EB%A5%BC-%EB%82%98%EB%AC%B4-%EC%A0%91%EC%8B%9C%EC%97%90-%EB%8B%B4%EB%8B%A4.jpg?s=2048x2048&w=is&k=20&c=lZVm0p-8u2UgnvJyFOCihdr0o-sZ0qTtMM-bfLCb90c=",
        price: 1000,
        like: 100,
    },
];

const HotIngredient = ({ ingredient }) => {
    return (
        <S.Wrapper>
            <S.Img src={mock[0].img} />
            <S.Info>
                <S.InfoTop>
                    <S.InfoLeft>
                        <S.Rank>1위</S.Rank>
                        <S.Name>{mock[0].name}</S.Name>
                    </S.InfoLeft>
                    <InteractionToggle type="heart" size="1rem" />
                </S.InfoTop>
                <S.Price>{mock[0].price}원</S.Price>
                <S.Like>{mock[0].like}명이 좋아요를 눌렀어요!</S.Like>
            </S.Info>
        </S.Wrapper>
    );
};

HotIngredient.propTypes = {
    ingredient: PropTypes.object.isRequired,
};
export default HotIngredient;
