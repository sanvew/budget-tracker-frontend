import { TagifySettings, BaseTagData } from "@yaireo/tagify";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { useEffect, useRef } from "react";
import { BaseInputProps } from "types";

type Props = BaseInputProps<string[]> & {
    mode?: 'multi' | 'select',
    whitelist?: string[],
    enforceWhitelist?: boolean,
    placeholder?: string,
}

export const TagSelect = (
    { value, onChange, disabled = false, mode = 'multi', placeholder, whitelist, enforceWhitelist = true }: Props
) => {
    const defaultTagifySettings: TagifySettings<BaseTagData> = { 
        enforceWhitelist: enforceWhitelist,
        mode: mode === 'multi' ? null : 'select',
        dropdown: {
            enabled: 0,
            closeOnSelect: true
        }
    }
    
    const handleChange = (e: CustomEvent<Tagify.ChangeEventData<BaseTagData>>) => {
        onChange(
            e.detail.tagify.value.reduce((acc, val) => {
                acc.push(val.value)
                return acc
            }, new Array<string>())
        )
    }

    return (
        <Tags
            readOnly={disabled} value={value} placeholder={placeholder} settings={defaultTagifySettings} whitelist={whitelist}
            onChange={handleChange} 
        />
    )
}