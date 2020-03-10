import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import BEMHelper from '../../../utils/bem';
import { arbeidsflateLenker, settArbeidsflate } from './arbeidsflate-lenker';
import './MobilarbeidsflateValg.less';
import { GACategory } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';
import Tekst from '../../../tekster/finn-tekst';

interface Props {
    tabindex: boolean;
}

const MobilarbeidsflateValg = ({ tabindex }: Props) => {
    const cls = BEMHelper('mobil-arbeidsflate-valg');
    const { arbeidsflate } = useSelector((state: AppState) => ({
        arbeidsflate: state.arbeidsflate.status,
    }));

    return (
        <ul className={cls.className}>
            {arbeidsflateLenker().map(lenke =>
                arbeidsflate === lenke.key ? null : (
                    <li
                        key={lenke.key}
                        className={cls.element('liste-element')}
                    >
                        <LenkeMedGA
                            href={lenke.url}
                            onClick={event => {
                                event.preventDefault();
                                settArbeidsflate(lenke);
                            }}
                            tabIndex={tabindex ? 0 : -1}
                            gaEventArgs={{
                                category: GACategory.Header,
                                action: 'arbeidsflate-valg',
                            }}
                        >
                            <HoyreChevron />
                            <Undertittel>
                                <span>For </span>
                                <span className={cls.element('lenke-tittel')}>
                                    <Tekst id={lenke.lenkeTekstId} />
                                </span>{' '}
                            </Undertittel>
                        </LenkeMedGA>
                    </li>
                )
            )}
        </ul>
    );
};

export default MobilarbeidsflateValg;
