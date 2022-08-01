import style from "../layout/load.module.css"
import loading from "../../img/loading.svg"

function Load() {
    return (
        <div className={style.loader_container}>

            <img className={style.loader} src={loading}
                alt="Loading" />
        </div>
    )
}
export default Load