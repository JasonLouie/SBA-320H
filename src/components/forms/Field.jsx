import { useState } from "react";
import PasswordIcon from "../PasswordIcon";
import FieldErrors from "./FieldErrors";

export default function Field({ fieldName, name, handleChange, formData, formErrors, type }) {

    function passwordField() {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <>
                <input className="field" type={showPassword ? "text" : "password"} name="password" id="password" value={formData.password} onChange={handleChange} />
                <PasswordIcon showPassword={showPassword} setShowPassword={setShowPassword}/>
            </>
        );
    }

    return (
        <>
            <label htmlFor={name} className={name}>
                {fieldName}
                {name === "password" ? passwordField() : <input className="field" type={type} name={name} id={name} value={formData[name]} onChange={handleChange} />}
            </label>
            {formErrors[name]?.length > 0 && <FieldErrors field={name} errors={formErrors[name]} />}
        </>
    );
}