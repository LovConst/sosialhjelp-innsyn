import React, {PropsWithChildren} from "react";
import {Link} from "@navikt/ds-react";

import styles from "./LinkButton.module.css";

interface Props {
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    className?: string;
    id?: string;
}

const LinkButton = ({onClick, className, children, id}: PropsWithChildren<Props>): JSX.Element => {
    return (
        <Link className={styles.linkButton + ` ${className}`} as="button" onClick={onClick} id={id}>
            {children}
        </Link>
    );
};

export default LinkButton;
