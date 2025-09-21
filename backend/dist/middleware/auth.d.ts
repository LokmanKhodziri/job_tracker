import { Request, Response, NextFunction } from "express";
export interface JwtPayload {
    id: number;
    role: string;
}
export declare const protect: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map