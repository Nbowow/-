import * as S from "./LinkBanner.styled";

const LinkBanner = () => {
    return (
        <S.LinkBanner>
            <div className="title">레시피를 고르지 못했다면?</div>
            <div className="text">전체 레시피 보러가기 {">"}</div>
        </S.LinkBanner>
    );
};

export default LinkBanner;
