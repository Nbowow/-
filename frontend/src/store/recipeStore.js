import create from "zustand";

const useRecipeStore = create((set) => ({
    selectedType: "전체",
    selectedSituation: "전체",
    selectedIngredients: "전체",
    selectedMethod: "전체",
    sortOrder: "최신순",
    currentPage: 0,
    setSelectedType: (type) => set({ selectedType: type, currentPage: 0 }),
    setSelectedSituation: (situation) =>
        set({ selectedSituation: situation, currentPage: 0 }),
    setSelectedIngredients: (ingredients) =>
        set({ selectedIngredients: ingredients, currentPage: 0 }),
    setSelectedMethod: (method) =>
        set({ selectedMethod: method, currentPage: 0 }),
    setSortOrder: (order) => set({ sortOrder: order, currentPage: 0 }),
    setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useRecipeStore;
