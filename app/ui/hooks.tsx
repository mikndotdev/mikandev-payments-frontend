import { useEffect, useState } from "react";
import { useMedia } from "react-use";

export const useIsWide = () => {
    const [isWide, setIsWide] = useState(false);

    const _isWide = useMedia("(min-width: 780px)", false);

    useEffect(() => {
        setIsWide(_isWide);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_isWide]);

    return isWide;
};
