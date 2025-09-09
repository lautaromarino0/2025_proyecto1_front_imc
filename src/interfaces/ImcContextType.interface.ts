import { ImcResult } from "./ImcResult.interface";

export interface ImcContextType {
    resultado: ImcResult | null;
    setResultado: (resultado: ImcResult | null) => void;
    error: string;
    setError: (error: string) => void;
}