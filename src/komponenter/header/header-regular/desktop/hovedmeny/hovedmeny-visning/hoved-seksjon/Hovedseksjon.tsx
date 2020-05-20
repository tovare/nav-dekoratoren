import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenyLenkeSeksjon } from 'komponenter/header/header-regular/common/meny-lenker/MenyLenkeSeksjon';
import BEMHelper from 'utils/bem';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import './Hovedseksjon.less';

interface Props {
    menyLenker: MenyNode;
    classname: string;
    isOpen: boolean;
}

const maxCols = 4;

export const Hovedseksjon = ({ menyLenker, classname, isOpen }: Props) => {
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('hoved-seksjon')}>
            {menyLenker &&
                menyLenker.children.map((menygruppe, index) => (
                    <MenyLenkeSeksjon
                        menygruppe={menygruppe}
                        isOpen={isOpen}
                        colIndex={index}
                        rowIndex={1}
                        kbNodeGroup={KbNavGroup.Hovedmeny}
                        key={menygruppe.displayName}
                    />
                ))}
            {[...Array(maxCols)].map(() => (
                <div className={'col-breaker'} />
            ))}
        </div>
    );
};
