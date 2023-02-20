import react, { useState } from 'react'
import './FormInput.scss'
const FormInput = (props) =>{
    const [focused,setFocused] = useState(false);
    const {errorMessage,onChange,id , ...inputProps} = props;

    const handleFocus = (e)=>{
        setFocused(true);
    }
    return(
        <div className='formInput'>
            <form>
                <input 
                {...inputProps}
                onChange={onChange}
                onFocus={()=>inputProps.name === "confirmPassword" && setFocused(true)}
                onBlur={handleFocus} 
                focused = {focused.toString()}
            />
                <span className='errorMessage'>{errorMessage}</span>
            </form>
        </div>
    )
}
export default FormInput;