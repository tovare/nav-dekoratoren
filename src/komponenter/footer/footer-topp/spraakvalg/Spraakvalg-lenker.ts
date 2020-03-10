import { Language } from '../../../../reducer/language-duck';
import { genererUrl } from '../../../../utils/Environment';

export interface Spraaklenke {
    lenketekst: string;
    url: string;
    testurl: string;
    lang: Language;
}

export const spraaklenker: Spraaklenke[] = [
    {
        lenketekst: 'Norske sider',
        url: '/no/person',
        testurl: '/dekoratoren/no/person',
        lang: Language.NORSK,
    },
    {
        lenketekst: 'English pages',
        url: '/en/home',
        testurl: '/dekoratoren/en/home',
        lang: Language.ENGELSK,
    },
    {
        lenketekst: 'Sámegiel skovit',
        url: '/se/samegiella',
        testurl: '/dekoratoren/se/samegiella',
        lang: Language.SAMISK,
    },
];

export const getSpraaklenker = (language: Language): Spraaklenke[] => {
    const lenker = spraaklenker.map(lenke => {
        lenke.url = genererUrl(lenke.url);
        return lenke;
    });

    switch (language) {
        case Language.NORSK:
            return lenker.filter(
                lenke =>
                    lenke.lang === Language.ENGELSK ||
                    lenke.lang === Language.SAMISK
            );
        case Language.ENGELSK:
            return lenker.filter(
                lenke =>
                    lenke.lang === Language.NORSK ||
                    lenke.lang === Language.SAMISK
            );
        // tslint:disable-next-line:no-switch-case-fall-through
        case Language.SAMISK:
            return lenker.filter(
                lenke =>
                    lenke.lang === Language.NORSK ||
                    lenke.lang === Language.ENGELSK
            );
        // tslint:disable-next-line:no-switch-case-fall-through
        default:
            return lenker.filter(
                lenke =>
                    lenke.lang === Language.ENGELSK ||
                    lenke.lang === Language.SAMISK
            );
    }
};
