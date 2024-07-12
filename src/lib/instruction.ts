import {Token, TokenType} from "./parser";

export interface Instruction {
    operation: string,
    data_size: string,
    routine: string,
    first_operand: string,
    second_operand: string
}

export function parse_tokens(tokens: Token[]): Instruction[] {
    let instructions: Instruction[] = [];

    let ctx_routine: string | null = null;
    let ctx_operation: string | null = null;
    let ctx_data_size: string | null = null;
    let ctx_first_operand: string | null = null;
    let ctx_second_operand: string | null = null;

    function reset() {
        ctx_operation = null;
        ctx_data_size = null;
        ctx_first_operand = null;
        ctx_second_operand = null;
    }

    function everything(): boolean {
        let found_null = false;
        let ctx = [
            ctx_routine,
            ctx_operation,
            ctx_data_size,
            ctx_first_operand,
            ctx_second_operand
        ];

        ctx.forEach(ctx => ctx == null ? found_null = true : null);
        return !found_null;
    }

    tokens
        .forEach((token, index) => {
            let next_token: null | Token = tokens[index + 1];
            console.log(`ctx: routine=${ctx_routine} op=${ctx_operation} ds=${ctx_data_size} fo=${ctx_first_operand} so=${ctx_second_operand} token=${token.value.replace(/\n/g, "\\n")}`);

            if (token.type == TokenType.NewLine && ctx_operation) {
                instructions.push({
                    operation: ctx_operation,
                    data_size: ctx_data_size,
                    first_operand: ctx_first_operand,
                    routine: ctx_routine,
                    second_operand: ctx_second_operand
                } as Instruction);

                return reset();
            }

            // Trying to enter a routine.
            if (token.type == TokenType.Routine) {
                reset();
                return ctx_routine = token.value;
            }

            if (token.type == TokenType.Word && !ctx_operation) {
                return ctx_operation = token.value;
            }

            if (token.type == TokenType.Word && !ctx_data_size) {
                return ctx_data_size = token.value;
            }

            if (ctx_operation && ctx_data_size) {
                if (!ctx_first_operand) {
                    return ctx_first_operand = token.value;
                }

                if (!ctx_second_operand) {
                    return ctx_second_operand = token.value;
                }
            }
        });

    return instructions;
}