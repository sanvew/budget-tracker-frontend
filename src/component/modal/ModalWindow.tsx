import { ReactNode } from "react"

import './_modal.scss'

type Props = {
    show: boolean 
    children?: ReactNode
}

export const ModalWindow = ({show, children}: Props) => {

    return (
        <div
            className={`modal-container ${show ? 'modal-open' : ''}`}
            style={{display: show ? 'block' : 'none'}}
        >
            <div className="modal-content card-main">
                {children}
            </div>
        </div>
    )

}