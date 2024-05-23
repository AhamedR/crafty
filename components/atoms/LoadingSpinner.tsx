import Spinner from 'react-bootstrap/Spinner'
import styles from '@/styles/Spinner.module.scss'

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default LoadingSpinner
