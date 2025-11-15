import passwordIcon from "/images/password-icon.png";

export default function PasswordIcon({setShowPassword, showPassword}) {
    function handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <button type="button" className={`password-icon ${showPassword ? "" : "hide"}`} onClick={handleClick}>
            <img src={passwordIcon} alt="Password icon" />
        </button>
    );
}