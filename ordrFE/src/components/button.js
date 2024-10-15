export const Button = ({...props}) => {
    return (
        <button
            className={`${props.className} stllr-btn ${props.disabled ? 'disabled' : ''}`}
            onClick={props.onClick}
            disabled={props.disabled}
            type={props.type}
            style={props.style}
        >
            {props.text}
        </button>
    )
}