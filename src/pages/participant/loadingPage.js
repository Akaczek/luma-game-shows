import styles from "../../styles/participant/waitingForAnswers.module.css";
import { PulseLoader } from "react-spinners";

const LoadingPage = () => {
    const allParticipants = 5;
    const answerCount = 3;
    return (
        <div className={styles.waitingForAnswersPageContainer}>
            <PulseLoader color="white" size={30} speedMultiplier={0.7} />
            <div
                className={[styles.answerLabel, styles.loadingLabel].join(" ")}
            >
                ŁADOWANIE
            </div>
        </div>
    );
};

export default LoadingPage;
