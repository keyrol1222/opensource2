export const states = [
    {
        value: 0,
        text: 'seleccionar estado',
    },
    {
        value: 1,
        text: 'activo'
    },
    {
        value: 2,
        text: 'desactivado'
    }
]
export const statesCar = [
    {
        value: 0,
        text: 'seleccionar estado',
    },
    {
        value: 1,
        text: 'Disponible'
    },
    {
        value: 2,
        text: 'desactivado'
    },
    {
        value: 3,
        text: 'Alquilado'
    
    }
]
export const statesRent = [
    {
        value: 3,
        text: 'Completado',
    },
    {
        value: 4,
        text: 'Retornado'
    }
]
export const getState = (value: number) => {
    const state = states.find((state) => state.value === value);
    let classname = ''
   if(state){
    switch (state.value) {
        case 1:
            classname = 'inline-block whitespace-nowrap rounded-full bg-success-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-success-700'
            break;
        case 2:
            classname = 'inline-block whitespace-nowrap rounded-full bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700'
            break;
        default:
            classname = 'inline-block whitespace-nowrap rounded-full bg-warning-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-warning-800'
            break;
    }
    }
    return state ? (
        <span
        className={classname}>
        {state.text}
    </span>
    ) : '';
}
export const getStatesCar = (value: number) => {
    const state = statesCar.find((state) => state.value === value);
    let classname = ''
   if(state){
    switch (state.value) {
        case 1:
            classname = 'inline-block whitespace-nowrap rounded-full bg-success-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-success-700'
            break;
        case 2:
            classname = 'inline-block whitespace-nowrap rounded-full bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700'
            break;
        case 3:
            classname = 'inline-block whitespace-nowrap rounded-full bg-warning-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-warning-800'
            break;
            case 4:
                classname = 'inline-block whitespace-nowrap rounded-full bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700'
                break;
        default:
            classname = 'inline-block whitespace-nowrap rounded-full bg-warning-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-warning-800'
            break;
    }
    }
    return state ? (
        <span
        className={classname}>
        {state.text}
    </span>
    ) : '';
}
export const getStateRent = (value: number) => {
    const state = statesRent.find((state) => state.value === value);
    let classname = ''
   if(state){
    switch (state.value) {
        case 3:
            classname = 'inline-block whitespace-nowrap rounded-full bg-success-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-success-700'
            break;
        default:
            classname = 'inline-block whitespace-nowrap rounded-full bg-warning-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-warning-800'
            break;
    }
    }
    return state ? (
        <span
        className={classname}>
        {state.text}
    </span>
    ) : '';
}



export default { getState, states, getStatesCar, getStateRent}