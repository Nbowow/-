import PropTypes from "prop-types";

import * as S from "./ActionToggleGroup.sytled";
import ActionToggleCounter from "../ActionToggleCounter/ActionToggleCounter";
import InteractionToggle from "../InteractionToggle/InteractionToggle";
import { useEffect, useState } from "react";

import { useUserStore } from "../../../store/userStore";
import {
    useUpdateLike,
    useUpdateScrap,
    useUpdateUnLike,
    useUpdateUnScrap,
    useUserLikes,
    useUserScraps,
} from "../../../hooks/useUser";

const ActionToggleGroup = ({ recipe }) => {
    const [isLike, setIsLike] = useState(false);
    const [isScrap, setIsScrap] = useState(false);

    const [likeCount, setLikeCount] = useState(0);
    const [scrapCount, setScrapCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    const user = useUserStore((state) => state.user);
    const { isLoading: isUserLoading, data: likes } = useUserLikes();
    const { isLoading: isRecipeLoading, data: scraps } = useUserScraps();

    useEffect(() => {
        if (user && !isUserLoading && !isRecipeLoading) {
            setIsLike(likes.some((i) => i.id === recipe.id));
            setIsScrap(scraps.some((i) => i.id === recipe.id));
        }
    }, [user, isUserLoading, isRecipeLoading, likes, recipe.id, scraps]);

    useEffect(() => {
        setLikeCount(recipe.likeCount ?? 0);
        setScrapCount(recipe.scrapCount ?? 0);
        setCommentCount(recipe.commentCount ?? 0);
    }, [recipe]);

    const { mutate: updateLike } = useUpdateLike();
    const { mutate: updateUnLike } = useUpdateUnLike();
    const { mutate: updateScrap } = useUpdateScrap();
    const { mutate: updateUnScrap } = useUpdateUnScrap();

    const handleLike = async () => {
        if (!user) return;
        if (isLike) {
            updateUnLike(recipe.id);
            setLikeCount((prevCount) => prevCount - 1);
        } else {
            updateLike(recipe.id);
            setLikeCount((prevCount) => prevCount + 1);
        }
        setIsLike(!isLike);
    };

    const handleScrap = async () => {
        if (!user) return;
        if (isScrap) {
            updateUnScrap(recipe.id);
            setScrapCount((prevCount) => prevCount - 1);
        } else {
            updateScrap(recipe.id);
            setScrapCount((prevCount) => prevCount + 1);
        }
        setIsScrap(!isScrap);
    };

    const LikeToggle = () => {
        return (
            <InteractionToggle
                type={"heart"}
                isActive={isLike}
                size="22px"
                onClick={() => handleLike()}
            />
        );
    };

    const ScrapToggle = () => {
        return (
            <InteractionToggle
                type={"bookmark"}
                isActive={isScrap}
                size="22px"
                onClick={() => handleScrap()}
            />
        );
    };

    const CommentIcon = () => {
        return <InteractionToggle size="22px" type={"comment"} />;
    };

    return (
        <S.ActionToggleGroup>
            <ActionToggleCounter Toggle={LikeToggle} count={likeCount} />
            <ActionToggleCounter Toggle={ScrapToggle} count={scrapCount} />
            <ActionToggleCounter Toggle={CommentIcon} count={commentCount} />
        </S.ActionToggleGroup>
    );
};

ActionToggleGroup.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        likeCount: PropTypes.number.isRequired,
        scrapCount: PropTypes.number.isRequired,
        commentCount: PropTypes.number.isRequired,
    }).isRequired,
};

export default ActionToggleGroup;
