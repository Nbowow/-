import * as S from "./ActionToggleGroup.sytled";
import ActionToggleCounter from "../ActionToggleCounter/ActionToggleCounter";
import InteractionToggle from "../InteractionToggle/InteractionToggle";
import { useState } from "react";

const scrap = [1900, 21, 1];

const ActionToggleGroup = () => {
    // TODO : Justand로 상태 관리 - unmount 될 때 서버에 동기화하기
    const [isLike, setIsLike] = useState(false);
    const [isScrap, setIsScrap] = useState(true);

    const LikeToggle = () => {
        return (
            <InteractionToggle
                type={"heart"}
                isActive={isLike}
                size="22px"
                onClick={() => {
                    setIsLike(!isLike);
                }}
            />
        );
    };

    const ScrapToggle = () => {
        return (
            <InteractionToggle
                type={"bookmark"}
                isActive={isScrap}
                size="22px"
                onClick={() => {
                    setIsScrap(!isScrap);
                }}
            />
        );
    };

    const CommentIcon = () => {
        return <InteractionToggle size="22px" type={"comment"} />;
    };

    return (
        <S.ActionToggleGroup>
            <ActionToggleCounter Toggle={LikeToggle} count={scrap[0]} />
            <ActionToggleCounter Toggle={ScrapToggle} count={scrap[1]} />
            <ActionToggleCounter Toggle={CommentIcon} count={scrap[2]} />
        </S.ActionToggleGroup>
    );
};

export default ActionToggleGroup;
