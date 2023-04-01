import style from './style.module.scss'
export default function LoadingAnimation() {
  return (
    <div className={style.loading}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}
