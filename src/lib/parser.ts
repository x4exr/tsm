export enum TokenType {
    Word,
    Literal,
    NewLine
}

export interface Token {
    type: TokenType,
    value: string
}

export function parse(input: string): Token[] {
    let tokens: Token[] = [];
    let characters = input
        .replace(/[\r\n]+/g, " \n ")
        .split(" ");

    characters.forEach((character, index) => {
        let type: TokenType;
        if (character.startsWith("0x") || character.startsWith("0b") || character.startsWith("#")) {
            type = TokenType.Literal;
        } else if (character == "\n") {
            type = TokenType.NewLine
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