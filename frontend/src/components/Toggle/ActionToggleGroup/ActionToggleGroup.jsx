import PropTypes from "prop-types";

import * as S from "./ActionToggleGroup.sytled";
import ActionToggleCounter from "../ActionToggleCounter/ActionToggleCounter";
import InteractionToggle from "../InteractionToggle/InteractionToggle";
import { useEffect, useState } from "react";
import { getUserLike } from "../../../api/userApi";
import {
    patchRecipeUnLike,
    patchRecipeUnScrap,
    postRecipeLike,
    postRecipeScrap,
} from "../../../api/recipe";
import { useUserStore } from "../../../store/userStore";

const ActionToggleGroup = ({ post }) => {
    const [isLike, setIsLike] = useState(false);
    const [isScrap, setIsScrap] = useState(false);

    const [likeCount, setLikeCount] = useState(0);
    const [scrapCount, setScrapCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    useEffect(() => {
        if (!isLoggedIn) return;
        const fetchLike = async () => {
            const data = await getUserLike(post.id);
            if (data.some((i) => i.id === post.id)) setIsLike(true);
            else setIsLike(false);
        };
        const fetchScrap = async () => {
            const data = await getUserLike(post.id);
            if (data.some((i) => i.id === post.id)) setIsScrap(true);
            else setIsScrap(false);
        };
        fetchLike();
        fetchScrap();
        setLikeCount(post.likeCount);
        setScrapCount(post.scrapCount);
        setCommentCount(post.commentCount);
    }, [post, isLoggedIn]);

    const handleLike = async () => {
        if (isLike) {
            await patchRecipeUnLike(post.id);
            setLikeCount((prevCount) => prevCount - 1);
        } else {
            await postRecipeLike(post.id);
            setLikeCount((prevCount) => prevCount + 1);
        }
        setIsLike(!isLike);
    };

    const handleScrap = async () => {
        if (isScrap) {
            await patchRecipeUnScrap(post.id);
            setScrapCount((prevCount) => prevCount - 1);
        } else {
            await postRecipeScrap(post.id);
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
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        likeCount: PropTypes.number.isRequired,
        scrapCount: PropTypes.number.isRequired,
        commentCount: PropTypes.number.isRequired,
    }).isRequired,
};

export default ActionToggleGroup;
