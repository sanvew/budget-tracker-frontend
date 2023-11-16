import { ReactNode } from "react"

type Props = {
    children?: ReactNode
}

export const ModalBody = ({children}: Props) => {

    return (
        <div className="modal-body">
            {children}
        </div>
    )
}