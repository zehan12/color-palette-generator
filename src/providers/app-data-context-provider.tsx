"use client";

import React, { useState, useCallback, ReactNode, FC, createContext, useContext } from 'react';
import { generateGradient, guidGenerator, generatepalette } from '../utils';
import { words } from "@/utils/words.utls";
import { Gradient, GradientContextType, Palette, Snackbar } from '@/types';


export const GradientContext = createContext<GradientContextType>({
    gradient: [],
    palette: [],
    snarkbars: [],
    setSnarkbar: () => { },
    removeSnackbar: () => { },
    loadpalettes: () => { },
    loadGradients: async () => { },
    clearGradient: () => { },
});

export const useGradient = () => useContext(GradientContext);

export const AppDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [gradient, setGradient] = useState<Gradient[]>([]);
    const [palette, setPalette] = useState<Palette[]>([]);
    const [snarkbars, setSnarkbars] = useState<Snackbar[]>([]);

    const loadGradients = useCallback(async (amount: number) => {
        const newGradients: Gradient[] = Array.from({ length: amount }, () => ({
            id: guidGenerator(),
            name: words({ exactly: 2, join: ' ' }),
            color: generateGradient(),
        })) as Gradient[];
        setGradient(prev => [...prev, ...newGradients]);
    }, []);

    const clearGradient = useCallback(() => {
        setGradient([]);
        setPalette([]);
    }, []);

    const loadpalettes = useCallback((amount: number) => {
        const newPalettes: Palette[] = Array.from({ length: amount }, () => generatepalette()) as Palette[];
        setPalette(prev => [...prev, ...newPalettes]);
    }, []);

    const setSnarkbar = useCallback((
        msg: string,
        type: Snackbar['type'] = 'success',
        duration: number = 5000
    ) => {
        const id = guidGenerator();
        setSnarkbars(prev => [
            ...prev,
            { id, msg, type },
        ]);

        const timer = setTimeout(() => {
            removeSnackbar(id);
        }, duration);

        return () => clearTimeout(timer);
    }, []);

    const removeSnackbar = useCallback((id: string) => {
        setSnarkbars(prev => prev.filter(alert => alert.id !== id));
    }, []);

    return (
        <GradientContext.Provider
            value={{
                gradient,
                palette,
                snarkbars,
                setSnarkbar,
                removeSnackbar,
                loadpalettes,
                loadGradients,
                clearGradient,
            }}
        >
            {children}
        </GradientContext.Provider>
    );
};