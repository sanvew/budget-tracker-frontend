import { ReactNode } from "react"

type Props = {
    children?: ReactNode
}

export const ModalHeader = ({children}: Props) => {

    return (
        <div className="modal-heading">
            {children}
        </div>
    )
}
