import { TagifySettings, BaseTagData } from "@yaireo/tagify";
import Tags from "@yaireo/tagify/dist/react.tagify";
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

    const handleAdd = (e:CustomEvent<Tagify.AddEventData<BaseTagData>>) => {
        if (mode === 'select' && e.detail.tagify.value.length > 1) {
            e.detail.tagify.value = [...e.detail.tagify.value.slice(-1)]
        }
    }

    return (
        <Tags
            readOnly={disabled} value={value} placeholder={placeholder} settings={defaultTagifySettings}
            whitelist={whitelist} onChange={handleChange} onAdd={handleAdd}
        />
    )
}