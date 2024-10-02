import Button from "../../Button/Button";
import * as S from "./LowestPrice.styled";
const LowestPrice = () => {
    const mock = {
        title: "<b>당근</b> 국내산 강원도 제주 구좌 흙 햇 미니 쥬스용 주스용 3kg",
        link: "https://smartstore.naver.com/main/products/8452697461",
        image: "https://shopping-phinf.pstatic.net/main_8599719/85997197784.7.jpg",
        lprice: "16900",
        hprice: "",
        mallName: "길숙이 농산",
        productId: "85997197784",
        productType: "2",
        brand: "",
        maker: "",
        category1: "식품",
        category2: "농산물",
        category3: "채소",
        category4: "당근",
    };

    const strippedTitle = mock.title.replace(/<\/?b>/gi, "");
    const formattedTitle =
        strippedTitle.length > 12
            ? strippedTitle.slice(0, 12) + "..."
            : strippedTitle;

    const handleClick = () => {
        window.open(mock.link);
    };
    return (
        <S.Wrapper>
            <S.Img src={mock.image} alt="lowest price" />
            <S.Title>{formattedTitle} </S.Title>
            <S.Price>{mock.lprice}원</S.Price>
            <Button
                text="구매"
                type="small"
                width="10%"
                height="2rem"
                onClick={() => handleClick()}
            />
        </S.Wrapper>
    );
};

export default LowestPrice;
