export default function FieldErrors({ field, errors }) {
    return (
        <div className="errors">
            {errors.map((err, i) => <p key={`${field}-${i}`} className={`signup error ${field}`}>{err}</p>)}
        </div>
    );
}