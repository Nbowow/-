import * as S from "./ActionToggleGroup.sytled";
import ActionToggleCounter from "../ActionToggleCounter/ActionToggleCounter";
import InteractionToggle from "../InteractionToggle/InteractionToggle";
import { useState } from "react";

const ActionToggleGroup = () => {
    // TODO : Justand로 상태 관리 - unmount 될 때 서버에 동기화하기
    const [isLike, setIsLike] = useState(false);
    const [isScrap, setIsScrap] = useState(true);

    const LikeToggle = () => {
        return (
            <InteractionToggle
                type={"heart"}
                isActive={isLike}
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
                onClick={() => {
                    setIsScrap(!isScrap);
                }}
            />
        );
    };

    const CommentIcon = () => {
        return <InteractionToggle type={"comment"} />;
    };

    return (
        <S.ActionToggleGroup>
            <ActionToggleCounter Toggle={LikeToggle} count={1000} />
            <ActionToggleCounter Toggle={ScrapToggle} count={1000} />
            <ActionToggleCounter Toggle={CommentIcon} count={1000} />
        </S.ActionToggleGroup>
    );
};

export default ActionToggleGroup;
