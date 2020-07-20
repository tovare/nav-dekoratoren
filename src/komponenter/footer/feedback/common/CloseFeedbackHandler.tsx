import React, { useContext } from 'react';
import { CloseFeedbackContext } from './CloseFeedbackContext';
import { verifyWindowObj } from 'utils/Environment';
const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;
import Lukknapp from 'nav-frontend-lukknapp';
import { AmplitudeEvents } from 'utils/amplitude';

interface Props {
    context: string;
}

const CloseFeedbackHandler: React.FC<Props> = ({ context }) => {
    const closeFeedbackContext = () => useContext(CloseFeedbackContext)!;

    const { setCloseFeedback } = closeFeedbackContext();

    const userClosedFeedback = () => {

        if (context === 'elaborated') {
            logAmplitudeEvent(AmplitudeEvents.tilbakemeldingRapporterKnapp, { svar: 'Avbrutt' })
        } else if (context === 'partialno') {
            logAmplitudeEvent(AmplitudeEvents.tilbakemeldingNeiKnapp, { svar: 'Avbrutt' })

        }

        setCloseFeedback(true);
    };

    return (
        <div>
            <Lukknapp onClick={userClosedFeedback}>Lukk</Lukknapp>
        </div>
    );
};

export default CloseFeedbackHandler;