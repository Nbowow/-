import PropTypes from "prop-types";

import * as S from "./ActionToggleGroup.sytled";
import ActionToggleCounter from "../ActionToggleCounter/ActionToggleCounter";
import InteractionToggle from "../InteractionToggle/InteractionToggle";
import { useEffect, useState } from "react";
import {
    patchRecipeUnLike,
    patchRecipeUnScrap,
    postRecipeLike,
    postRecipeScrap,
} from "../../../api/recipe";
import { useUserStore } from "../../../store/userStore";
import { useUserLikes, useUserScraps } from "../../../hooks/useUser";

const ActionToggleGroup = ({ recipe }) => {
    const [isLike, setIsLike] = useState(false);
    const [isScrap, setIsScrap] = useState(false);

    const [likeCount, setLikeCount] = useState(0);
    const [scrapCount, setScrapCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    const { isLoading: isUserLoading, data: likes } = useUserLikes();
    const { isLoading: isRecipeLoading, data: scraps } = useUserScraps();

    useEffect(() => {
        if (isLoggedIn && !isUserLoading && !isRecipeLoading) {
            setIsLike(likes.some((i) => i.id === recipe.id));
            setIsScrap(scraps.some((i) => i.id === recipe.id));
            setLikeCount(recipe.likeCount ?? 0);
            setScrapCount(recipe.scrapCount ?? 0);
            setCommentCount(recipe.commentCount ?? 0);
        }
    }, [isLoggedIn, likes, scraps, recipe, isUserLoading, isRecipeLoading]);

    const handleLike = async () => {
        if (isLike) {
            await patchRecipeUnLike(recipe.id);
            setLikeCount((prevCount) => prevCount - 1);
        } else {
            await postRecipeLike(recipe.id);
            setLikeCount((prevCount) => prevCount + 1);
        }
        setIsLike(!isLike);
    };

    const handleScrap = async () => {
        if (isScrap) {
            await patchRecipeUnScrap(recipe.id);
            setScrapCount((prevCount) => prevCount - 1);
        } else {
            await postRecipeScrap(recipe.id);
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
