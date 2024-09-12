import * as S from "./Footer.styled";

const Footer = () => {
    return (
        <S.Section>
            <S.FooterLogo src="./logo/logo_dark_green.svg" />
            <S.Info>
                <div>SSAFY 11기 특화 프로젝트 빅데이터 분산 C206</div>
                <div>김민주 이지영 김정민 박기창 남보우 신재건</div>
            </S.Info>
            <img src="./icon/notion-logo.svg" />
        </S.Section>
    );
};

export default Footer;
