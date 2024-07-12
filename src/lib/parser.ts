export enum TokenType {
    Word,
    Literal,
    NewLine,
    Routine
}

export interface Token {
    type: TokenType,
    value: string
}

export function parse(input: string): Token[] {
    let tokens: Token[] = [];
    let characters = input
        .replace(/[\r\n]+/g, " \n ")
        .replace(/\t/g, "")
        .replace(/\*/g, " * ")
        .split(" ");

    characters.forEach((character, index) => {
        if (character == "") return;

        let type: TokenType;
        if (character.startsWith("0x") || character.startsWith("0b") || character.startsWith("#")) {
            type = TokenType.Literal;
        } else if (character == "\n") {
            type = TokenType.NewLine;
        } else if (character.endsWith(":")) {
            type = TokenType.Routine;
        } else {
            type = TokenType.Word;
        }

        tokens.push({
            type,
            value: character
        } as Token)
    });

    return tokens;
}