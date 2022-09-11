export const cleanseAssertionOperators = (parsedName: string): string => {
    return parsedName.replace(/[?!]/g, "");
}

export const nameof = <T extends Object>(nameFunction: new () => T): string => {
    const fnStr = nameFunction.toString();

    if (fnStr.startsWith("function ")) {
        return cleanseAssertionOperators(
            fnStr.substring(
                "function ".length,
                fnStr.indexOf("(")
            )
        );
    }

    throw new Error("Invalid function");
}
