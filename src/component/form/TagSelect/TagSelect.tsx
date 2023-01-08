import { TagifySettings, BaseTagData } from "@yaireo/tagify";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { useState } from "react";

type Props = {
    mode?: 'multi' | 'select',
    whitelist?: string[] | (() => string[]),
    placeholder?: string,
}

export const TagSelect = ({ mode = 'multi', placeholder, whitelist }: Props) => {
    const tagifySettings = { 
        useInput: false,
        enforceWhitelist: true,
        mode: mode === 'multi' ? null : 'select',
        dropdown: {
            enabled: 0,
            closeOnSelect: false
        }
    } as TagifySettings<BaseTagData>;

    const [whitelistState, setWhitelist] = useState(whitelist);

    return (
        <Tags placeholder={placeholder} settings={tagifySettings} whitelist={whitelistState}/>
    )
}
