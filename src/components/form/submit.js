import style from '../form/submit.module.css'

function Submit({ text}){
    return (
        <div >
            <button className={style.btn}>{text}</button>
        </div>
    )
}

export default Submit