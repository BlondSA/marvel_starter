const letterCut = (text, letterLimit) => {
    const descriptionMod = text
        ? text
        : "There is no description for this character.";
    let slicedDescription = descriptionMod.slice(0, letterLimit);
    if (slicedDescription.length < descriptionMod.length) {
        return (slicedDescription = `${slicedDescription}...`);
    } else {
        return slicedDescription;
    }
};

export { letterCut };
