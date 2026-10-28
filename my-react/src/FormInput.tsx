// type Option = { value: string; label: string };

type RadioOptionValues = {
    id: string;
    name: string;
    value: string;
    label: string;
    checked: boolean;
    onCheck: (value: string) =>void;
}

export function RadioOption(rov:RadioOptionValues){
    return (
        <>
            <input {...{type: 'radio', id: rov.id, name: rov.name, value: rov.value, checked: rov.checked, onChange: ()=> rov.onCheck(rov.value)}} />
            <label htmlFor={rov.id}>{rov.label}</label><br/>
        </>
    )
}