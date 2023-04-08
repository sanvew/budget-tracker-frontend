import { TagifySettings, BaseTagData } from "@yaireo/tagify";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { useRef } from "react";

type Props = {
    name?: string,
    mode?: 'multi' | 'select',
    whitelist?: string[],
    enforceWhitelist?: boolean,
    placeholder?: string,
    onChange?: (e: CustomEvent<Tagify.ChangeEventData<BaseTagData>>) => void
}

export const TagSelect = ({ name, mode = 'multi', placeholder, whitelist, enforceWhitelist = true, onChange }: Props) => {
    const tagifySettings = { 
        useInput: false,
        enforceWhitelist: enforceWhitelist,
        mode: mode === 'multi' ? null : 'select',
        dropdown: {
            enabled: 0,
            closeOnSelect: false
        }
    } as TagifySettings<BaseTagData>;

    const tag = useRef<Tagify>()

    return (
        <Tags tagifyRef={tag} name={name} placeholder={placeholder} settings={tagifySettings} whitelist={whitelist} onChange={onChange}/>
    )
}