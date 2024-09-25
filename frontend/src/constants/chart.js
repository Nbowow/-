export const monthLabels = () =>
    Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

export const barLabels = () => {
    return ["매우 만족", "만족", "보통", "별로", "매우별로"];
};
