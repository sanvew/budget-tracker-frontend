import { TagifySettings, BaseTagData } from "@yaireo/tagify";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { BaseInputProps } from "types";

type Props = BaseInputProps<string[]> & {
    mode?: 'multi' | 'select',
    whitelist?: string[],
    enforceWhitelist?: boolean,
    placeholder?: string,
}

export const TagSelect = ({ value, onChange, mode = 'multi', placeholder, whitelist, enforceWhitelist = true }: Props) => {
    const tagifySettings = { 
        useInput: false,
        enforceWhitelist: enforceWhitelist,
        mode: mode === 'multi' ? null : 'select',
        dropdown: {
            enabled: 0,
            closeOnSelect: true
        }
    } as TagifySettings<BaseTagData>;

    const handleChange = (e: CustomEvent<Tagify.ChangeEventData<BaseTagData>>) => {
        onChange(
            e.detail.tagify.value.reduce((acc, val) => {
                acc.push(val.value)
                return acc
            }, new Array<string>())
        )
    }

    return (
        <Tags value={value} placeholder={placeholder} settings={tagifySettings} whitelist={whitelist} onChange={handleChange}/>
    )
}