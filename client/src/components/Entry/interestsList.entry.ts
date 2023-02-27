export enum INTERESTS {
    Life = 'Life',
    Happiness = 'Happiness',
    Religion = 'Religion',
    Technology = 'Technology',
    AI = 'AI',
    Alone = 'Alone',
    Anger = 'Anger',
    Birthday = 'Birthday',
    Computers = 'Computers',
    Dreams = 'Dreams',
    Health = 'Health',
    Romantic = 'Romantic',
    Politics = 'Politics',
    Forgiveness = 'Forgiveness',
    Success = 'Success',
    Motivational = 'Motivational',
    Wisdom = 'Wisdom'
}

export const interestsList: string[] = []
for (let i in INTERESTS) {
    interestsList.push(i.toString());
}