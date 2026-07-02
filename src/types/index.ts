export type Gradient = {
    id: string;
    name: string;
    color: string;
}

export type Palette = {
    id: string;
    name: string;
    colors: string[];
    start: string;
    end: string;
    count: number;
}

export type Snackbar = {
    id: string;
    msg: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

export type GradientContextType = {
    gradient: Gradient[];
    palette: Palette[];
    snarkbars: Snackbar[];
    setSnarkbar: (msg: string, type?: Snackbar['type'], duration?: number) => void;
    removeSnackbar: (id: string) => void;
    loadpalettes: (amount: number) => void;
    loadGradients: (amount: number) => Promise<void>;
    clearGradient: () => void;
}