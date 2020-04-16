import React from 'react';
import BEMHelper from 'utils/bem';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenyLenkeSeksjon } from '../../meny-lenker/MenyLenkeSeksjon';
import KbNav, { NodeGroup } from 'utils/keyboard-navigation/kb-navigation';
import { LenkeMedGA } from 'komponenter/LenkeMedGA';
import { GACategory } from 'utils/google-analytics';
import Tekst from 'tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { useKbNavigationDropdown } from '../../../../../../../utils/keyboard-navigation/useKbNavigationDropdown';

type Props = {
    classname: string;
    isOpen: boolean;
    menyLenker: MenyNode | undefined;
    dittNavUrl: string;
};

const nodeGroup = NodeGroup.MinsideMeny;

export const MinsideVisning = (props: Props) => {
    const { classname, isOpen, menyLenker, dittNavUrl } = props;

    useKbNavigationDropdown(configForNodeGroup[nodeGroup], isOpen);

    if (!menyLenker) {
        return null;
    }

    const cls = BEMHelper(classname);

    return (
        <>
            <div className={cls.element('topp-seksjon')}>
                <LenkeMedGA
                    href={dittNavUrl}
                    id={KbNav.getKbId(nodeGroup, {
                        col: 0,
                        row: 0,
                        sub: 0,
                    })}
                    gaEventArgs={{
                        category: GACategory.Header,
                        action: 'dittnav',
                        label: dittNavUrl,
                    }}
                >
                    <Tekst id={'til-forside'} />
                </LenkeMedGA>
                <Systemtittel className={cls.element('topp-seksjon-tittel')}>
                    <Tekst id={'min-side'} />
                </Systemtittel>
            </div>
            <div className={cls.element('lenke-seksjoner')}>
                {menyLenker &&
                    menyLenker.children.map((menygruppe, index) => (
                        <MenyLenkeSeksjon
                            menygruppe={menygruppe}
                            isOpen={isOpen}
                            colIndex={index}
                            rowIndex={1}
                            kbNodeGroup={nodeGroup}
                            key={menygruppe.displayName}
                        />
                    ))}
            </div>
        </>
    );
};

export default MinsideVisning;
