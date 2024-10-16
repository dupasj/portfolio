const shuffle = <T>(array: T[]): T[] => {
    let currentIndex = array.length;
    const copy = [... array];

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]];
    }

    return copy;
}

export default shuffle;