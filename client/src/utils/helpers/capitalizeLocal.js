const capitalizeLocal = ([first, ...rest], locale = navigator.language) => {
    return (
        first === undefined
            ? ''
            : first.toLocaleUpperCase(locale) + rest.join('')
    )
}
export default capitalizeLocal