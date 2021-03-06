import LenkeMedIkon from '../lenke-med-ikon/LenkeMedIkon';
import Tekst from 'tekster/finn-tekst';
import DelSkjerm from 'ikoner/del-skjerm/DelSkjerm';
import React, { useState } from 'react';
import DelSkjermModal from '../del-skjerm-modal/DelSkjermModal';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics';
import { Normaltekst } from 'nav-frontend-typografi';

export const DelSkjermLenke = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        analyticsEvent({
            category: AnalyticsCategory.Footer,
            action: `kontakt/del-skjerm-open`,
        });
        setIsOpen(true);
    };

    const closeModal = () => {
        analyticsEvent({
            category: AnalyticsCategory.Footer,
            action: `kontakt/del-skjerm-close`,
        });
        setIsOpen(false);
    };

    return (
        <>
            <li>
                <Normaltekst>
                    <LenkeMedIkon
                        onClick={openModal}
                        tekst={<Tekst id="footer-del-skjerm" />}
                        ikon={<DelSkjerm style={{ height: '24px', width: '24px' }} />}
                    />
                </Normaltekst>
            </li>
            {isOpen && <DelSkjermModal isOpen={isOpen} onClose={closeModal} />}
        </>
    );
};
