
import { passwordStrength, defaultOptions } from "check-password-strength";
import type { Options, Result } from "check-password-strength";

const options: Options<string> = [
    {
        minDiversity: 0,
        minLength: 0
    },
    {
        minDiversity: 2,
        minLength: 6
    },
    {
        minDiversity: 3,
        minLength: 8
    },
    {
        minDiversity: 4,
        minLength: 10
    }
].map((option, idx) => ({ ...defaultOptions[idx], ...option })) as Options<string>;

export type PasswordStrength = Result<string>;
export function getPasswordStrength(password: string): PasswordStrength {
    return passwordStrength(password, options);
}
